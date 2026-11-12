# 🛍️ MAY'S Store — E-Commerce Web Project (Task 5)

Proyek e-commerce eceran _streetwear_ dan pakaian sehari-hari (_everyday wear_) yang dikembangkan secara bertahap untuk memenuhi tugas mata kuliah **Desain Web 1**. Proyek ini dibangun murni menggunakan **Vanilla HTML & CSS3** tanpa _framework_ atau _preprocessor_ instan.

---

## 👨‍💻 Identitas Mahasiswa

- **Nama:** Fauzan Fauzia Fauzi
- **NIM:** D112521003
- **Kelas:** IFK-25
- **Program Studi:** Sarjana Terapan Teknik Informatika (D4) — Politeknik TEDC Bandung

---

## 🚀 Fitur & Implementasi CSS3 (Tugas 5 - Home Page)

### 1. Tugas 5 — Home Page (`index.html`)

- **Custom Scroll Announcement Banner**: Banner pengumuman berjalan (_marquee effect_) menggunakan properti CSS3 `@keyframes`.
- **Advanced Box & Text Shadows**: Memperkuat hierarki visual dengan `box-shadow` dan `text-shadow`.
- **CSS3 Gradients**: Penerapan _linear gradient_ pada tombol utama dan latar belakang elemen.
- **2D Transforms**: Efek interaktif _scale_, _translate_, dan _rotate_ yang halus pada kartu produk dan gambar _hero_.
- **Transitions & Hover Effects**: Transisi mulus untuk navigasi, tombol, dan gambar produk.
- **Responsive Design**: Tata letak fleksibel yang dioptimalkan untuk perangkat seluler (_mobile-friendly_).

### 2. Tugas 6 — Product Catalog (`kategori.html`)

- **Editorial Catalog Layout**: Kombinasi CSS Grid untuk tata letak _sidebar_ navigasi cepat (_quick navigation_) dan grid produk 2 kolom.
- **Category Jump Anchors**: Navigasi _pill_ interaktif dengan efek transisi elevasi (`translateY`) dan indikator status aktif.
- **2D/3D Transforms & Keyframe Animations**: Efek perspektif 3D ringan (`rotateX`) pada kartu produk, animasi _floating sticker badge_ (`sticker-drift`), serta pergeseran gradien latar belakang (`frame-shift`).
- **Decorative Border Image**: Penerapan `border-image` bergradien pada komponen panduan ukuran (_Size Guide_).
- **Pure CSS Accordion**: Komponen _Size Guide_ interaktif (buka/tutup) menggunakan teknik _checkbox hack_ tanpa JavaScript.
- **Mobile-First iPhone Optimization**: Penyesuaian khusus _viewport_ seluler (`max-width: 480px`) dengan navigasi kategori yang dapat digeser secara horizontal (_horizontal scroll_).

---

## 📂 Struktur Direktori Proyek

Struktur folder dirancang modular dan siap dikembangkan untuk tugas-tugas berikutnya:

```text
mays-store/
│
├── .gitignore          # Konfigurasi file/folder yang diabaikan Git
├── README.md           # Dokumentasi proyek (file ini)
│
├── index.html          # Halaman Utama (Home Page - Tugas 5)
├── kategori.html       # Halaman Katalog Produk (Catalog Page - Tugas 6)
│
├── src/                # Folder Source Code
│   └── css/            # Berisi stylesheet utama (style.css)
        ├── style.css   # Stylesheet utama & komponen global
│       └── kategori.css# Stylesheet khusus halaman katalog
│
└── assets/             # Folder Aset Media
    └── images/         # Kumpulan gambar produk dan banner

---

🛠️ Cara Menjalankan Proyek Secara Lokal
1. Clone repository ini ke komputer lokal Anda:

Bash
git clone [https://github.com/Fauzan55-ikmal/mays-store.git](https://github.com/Fauzan55-ikmal/mays-store.git)

2. Buka folder proyek menggunakan teks editor pilihan Anda (disarankan Visual Studio Code).

3. Jalankan proyek:

    a. Install ekstensi Live Server di VS Code.

    b. Klik kanan pada file index.html, lalu pilih "Open with Live Server".

© 2026 MAY'S Store. Dibuat untuk keperluan pembelajaran akademik.
```
