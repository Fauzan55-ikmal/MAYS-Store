'use strict';

/**
 * MAY'S cart page interactions.
 * Scope: background audio, checkout summary, and lightweight form feedback.
 * This file does not submit orders or process payment.
 */

const audioElement = document.querySelector('#background-audio');
const audioButtons = [...document.querySelectorAll('[data-audio-toggle]')];
const audioStatus = document.querySelector('#audio-status');
const checkoutForm = document.querySelector('#checkout-form');
const checkoutFeedback = document.querySelector('#checkout-feedback');
const orderItems = [...document.querySelectorAll('.order-item')];
const shippingInputs = [...document.querySelectorAll('input[name="shippingMethod"]')];

const moneyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

function formatRupiah(value) {
  return moneyFormatter.format(value).replace(/\u00a0/g, ' ');
}

function announceAudio(message) {
  if (audioStatus) audioStatus.textContent = message;
}

function updateAudioButtons(isPlaying) {
  audioButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(isPlaying));

    const label = button.querySelector('.audio-toggle__label');
    const state = button.querySelector('.audio-toggle__state');

    if (label) label.textContent = isPlaying ? 'Matikan musik' : 'Putar musik';
    if (state) state.textContent = isPlaying ? 'ON' : 'OFF';
  });
}

async function toggleBackgroundAudio() {
  if (!audioElement) return;

  if (!audioElement.paused) {
    audioElement.pause();
    updateAudioButtons(false);
    announceAudio('Musik dimatikan.');
    return;
  }

  try {
    await audioElement.play();
    updateAudioButtons(true);
    announceAudio('Musik sedang diputar. Tekan tombol musik untuk mematikannya.');
  } catch (error) {
    updateAudioButtons(false);
    announceAudio('Musik belum dapat diputar. Pastikan file assets/audio/mays-ambient.mp3 tersedia dan formatnya didukung browser.');
    console.warn('MAY\'S audio could not be played:', error);
  }
}

audioButtons.forEach((button) => {
  button.addEventListener('click', toggleBackgroundAudio);
});

if (audioElement) {
  audioElement.addEventListener('play', () => updateAudioButtons(true));
  audioElement.addEventListener('pause', () => updateAudioButtons(false));
  audioElement.addEventListener('error', () => {
    updateAudioButtons(false);
    announceAudio('File musik tidak ditemukan atau tidak dapat dibaca. Periksa folder assets/audio.');
  });
}

// Campaign video berada di sidebar dan berjalan muted. Hormati preferensi reduced motion.
const sidebarVideo = document.querySelector('[data-campaign-video]');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function applyMotionPreference() {
  if (!sidebarVideo) return;

  if (reducedMotionQuery.matches) {
    sidebarVideo.pause();
  } else {
    const playAttempt = sidebarVideo.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(() => {
        // Poster tetap menjadi fallback ketika autoplay video tidak tersedia.
      });
    }
  }
}

applyMotionPreference();
reducedMotionQuery.addEventListener?.('change', applyMotionPreference);

// Calculate line totals, subtotal, shipping, and final total from displayed demo items.
function getSubtotal() {
  return orderItems.reduce((subtotal, item) => {
    const unitPrice = Number(item.dataset.unitPrice) || 0;
    const quantityInput = item.querySelector('.quantity-input');
    const quantity = Math.max(1, Math.min(10, Number(quantityInput?.value) || 1));

    if (quantityInput) quantityInput.value = String(quantity);

    const lineTotal = unitPrice * quantity;
    const lineTotalElement = item.querySelector('.order-item__line-total');
    if (lineTotalElement) lineTotalElement.textContent = formatRupiah(lineTotal);

    return subtotal + lineTotal;
  }, 0);
}

function getShippingFee(subtotal) {
  const selectedShipping = shippingInputs.find((input) => input.checked);
  const baseFee = Number(selectedShipping?.dataset.shippingFee) || 0;
  const isRegular = selectedShipping?.value === 'regular';
  const freeShippingThreshold = 250_000;

  if (isRegular && subtotal >= freeShippingThreshold) return 0;
  return baseFee;
}

function updateOrderSummary() {
  const subtotal = getSubtotal();
  const shipping = getShippingFee(subtotal);
  const total = subtotal + shipping;

  const subtotalElement = document.querySelector('#subtotal-value');
  const shippingElement = document.querySelector('#shipping-value');
  const totalElement = document.querySelector('#grand-total-value');

  if (subtotalElement) subtotalElement.textContent = formatRupiah(subtotal);
  if (shippingElement) shippingElement.textContent = shipping === 0 ? 'Gratis' : formatRupiah(shipping);
  if (totalElement) totalElement.textContent = formatRupiah(total);
}

orderItems.forEach((item) => {
  const quantityInput = item.querySelector('.quantity-input');
  quantityInput?.addEventListener('input', updateOrderSummary);
  quantityInput?.addEventListener('change', updateOrderSummary);
});

shippingInputs.forEach((input) => {
  input.addEventListener('change', updateOrderSummary);
});

updateOrderSummary();

// Mark the sidebar step currently visible in the viewport.
const checkoutSections = [...document.querySelectorAll('.checkout-card[id]')]
  .filter((section) => ['customer-section', 'address-section', 'shipping-section', 'payment-section'].includes(section.id));
const stepLinks = [...document.querySelectorAll('.checkout-steps__link')];

if ('IntersectionObserver' in window && checkoutSections.length > 0) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleEntry) return;

    stepLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${visibleEntry.target.id}`;
      link.classList.toggle('is-active', isCurrent);

      if (isCurrent) {
        link.setAttribute('aria-current', 'step');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }, {
    rootMargin: '-22% 0px -58% 0px',
    threshold: [0, 0.2, 0.5, 0.8],
  });

  checkoutSections.forEach((section) => sectionObserver.observe(section));
}

// Native HTML form validation remains enabled. This demo deliberately does not send personal data.
checkoutForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!checkoutForm.reportValidity()) return;

  if (checkoutFeedback) {
    checkoutFeedback.textContent = 'Form valid! Ini masih demo frontend: data belum dikirim ke server dan pembayaran belum diproses.';
    checkoutFeedback.scrollIntoView({ behavior: reducedMotionQuery.matches ? 'auto' : 'smooth', block: 'nearest' });
  }
});
