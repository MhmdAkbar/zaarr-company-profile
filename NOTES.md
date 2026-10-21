# NOTES — Recreate Zaar Integrated Solutions

## Observasi Referensi Situs Asli (Step 2)

Berdasarkan ekstraksi `reference/body.html`, `reference/original.css`, `reference/tokens.json`, serta pemeriksaan visual terhadap screenshot di `reference/original/` (`fold-1280.png`, `full-1280.png`, `full-768.png`, `full-375.png`, `nav-1280.png`, `nav-375.png`, `about-1280.png`, `services-1280.png`, `products-1280.png`, `footer-1280.png`):

### 1. Navbar
- **Posisi & Transparansi**: `position: fixed` di bagian atas (`top: 0; left: 0; right: 0; z-index: 1030`), tinggi `62px`, latar belakang semi-transparan `rgba(255, 255, 255, 0.8)` dengan efek blur `backdrop-filter: saturate(180%) blur(20px)` dan border bawah `1px solid #f8f9fa`.
- **Desktop (1280px)**: Logo di kiri (`height: 35px`), tiga link navigasi (`About`, `Services`, `Products`) rata kanan (`justify-content: flex-end`).
- **Tablet & Mobile (768px & 375px)**: Menggunakan breakpoint `lg` (`< 992px`). **Ada tombol hamburger menu** di sebelah kanan (`navbar-toggler`) dan daftar link tersembunyi secara default dalam `.collapse.navbar-collapse`, dapat dibuka/tutup ketika tombol hamburger diklik.

### 2. Hero Section
- **Layout**: Teks rata tengah (`text-align: center`), `padding: 160px 0 120px`, `position: relative`, `overflow: hidden`.
- **Video & Overlay**: Elemen `<video>` (`autoplay loop muted playsinline`) terpusat absolut (`top: 50%; left: 50%; transform: translate(-50%, -50%); min-width: 100%; min-height: 100%; object-fit: cover; z-index: -2`) dengan `.hero-overlay` (`background-color: rgba(0, 0, 0, 0.5); z-index: -1`).
- **Tipografi & CTA**:
  - `h1.hero-title`: `3.8rem` (`60.8px`), `font-weight: 700`, `letter-spacing: -0.05em`, warna `#ffffff`, 2 baris dengan `<br />`.
  - `p.hero-subtitle`: `1.4rem` (`22.4px`), `font-weight: 400`, warna `#f5f5f7`, `margin: 1rem 0 2.5rem`, 2 baris dengan `<br />`.
  - Tombol CTA (`Discover Solutions` → `#products`): pill hijau (`background-color: #34c759`, `border-radius: 980px`, `padding: 10px 24px`, `font-size: 15px`, `font-weight: 500`, warna teks putih, hover `#2eb350`).

### 3. About Section (`#about`)
- **Layout**: Latar putih (`#ffffff`), border atas `1px solid #f8f9fa`, padding vertikal `py-5` ganda (section `48px 0` + container `48px 12px`).
- **Konten**: Judul `About ZAAR.` (`2.5rem` / `40px`, `font-weight: 600`, `margin-bottom: 3rem`), diikuti paragraf di dalam kolom terpusat `col-md-8` (`66.6667%` pada layar `>= 768px`, `100%` di `375px`) dengan ukuran font `fs-4` (`1.5rem` di desktop), `font-weight: 300`, warna `#6c757d`.

### 4. Services Section (`#services`)
- **Layout**: Latar `#fbfbfd`, padding vertikal section `48px 0` + container `48px 12px`.
- **Grid Kartu**: 3 kolom sejajar pada `>= 768px` (`col-md-4` dengan gap `24px` / `g-4`), dan bertumpuk 1 kolom pada `375px`.
- **Kartu (`.apple-card`)**: Latar `#ffffff`, `border-radius: 20px`, `padding: 2.5rem`, `border: 1px solid #f0f0f0`, `box-shadow: 0 4px 24px rgba(0, 0, 0, 0.03)`. Memiliki ikon Bootstrap Icons hijau (`#34c759`, `bi-cpu`, `bi-sliders`, `bi-person-gear`), judul `h4` (`1.5rem`, `font-weight: 600`), dan deskripsi `p` (`#6c757d`).

### 5. Products Section (`#products`)
- **Layout**: Latar `#ffffff`, padding vertikal section `48px 0` + container `48px 12px`.
- **Grid Produk**:
  - 4 produk pertama berada dalam grid 2 kolom di `>= 768px` (`col-md-6`, gap `24px`) dan 1 kolom di `375px`.
  - Tema warna kartu berselang-seling:
    1. *Zaar Unified Platform*: Light (`#f5f5f7`)
    2. *Zaar iMOPS™*: Dark (`#000000`, teks putih)
    3. *Zaar SmartPatrol*: Light (`#f5f5f7`)
    4. *Cyber Security*: Dark (`#000000`, teks putih)
    5. *Hospital Information System*: Light (`#f5f5f7`), berada di baris bawah terpusat dengan lebar `col-md-8` (`66.6667%` pada `>= 768px`) dan `mt-4` (`24px`).
- **Kartu Produk (`.apple-product-grid`)**: Tinggi tetap `550px`, `border-radius: 24px`, `padding-top: 3.5rem`, flex column terpusat, teks di atas (`h3` `2.5rem`, `p` `1.1rem` dengan `max-width: 80%`), grup 2 tombol (`Learn more` solid hijau & `Buy` outline hijau, keduanya `<a href="#">` tanpa preventDefault pada situs asli), dan gambar produk di bawah (`.product-img-wrapper` tinggi `300px`, `margin-top: auto`, `object-fit: contain`, `object-position: bottom`).

### 6. Footer
- **Layout**: Latar `#f5f5f7`, `padding: 2rem 0`, `border-top: 1px solid #f8f9fa`, rata tengah, warna teks `#86868b`, ukuran `0.875rem` (`14px`).
- **Konten**: `h5` (`Zaar.`, `20px`, `font-weight: 700`, warna `#212529`, `margin-bottom: 1rem`), tagline `p`, dan copyright `p` (`margin-top: 1.5rem`, `padding-bottom: 1rem`).

### 7. Animasi & Efek Hover di `original.css`
- `.apple-card`: `transition: transform 0.3s ease;` → saat `:hover` menjadi `transform: scale(1.02); box-shadow: 0 10px 30px rgba(0,0,0,0.06);`
- `.btn-apple` & `.btn-product-primary`: `transition: all 0.3s ease;` → saat `:hover` warna latar berubah dari `#34c759` ke `#2eb350`.
- `.btn-product-secondary`: `transition: all 0.3s ease;` → saat `:hover` latar menjadi `#34c759` dan teks `white`.
- `.apple-product-grid`: `transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease;` → saat `:hover` naik `transform: translateY(-12px)` dengan bayangan `0 20px 40px rgba(0,0,0,0.12)`.
- `.product-img-wrapper::after`: overlay gradasi hijau `linear-gradient(to top, rgba(52, 199, 89, 0.75), rgba(52, 199, 89, 0))` dengan `opacity: 0` dan `transition: opacity 0.5s ease;` → saat `.apple-product-grid:hover` berubah menjadi `opacity: 1`.
