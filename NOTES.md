# NOTES — Recreate Zaarr Integrated Solutions

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
- **Konten**: Judul `About ZAARR.` (`2.5rem` / `40px`, `font-weight: 600`, `margin-bottom: 3rem`), diikuti paragraf di dalam kolom terpusat `col-md-8` (`66.6667%` pada layar `>= 768px`, `100%` di `375px`) dengan ukuran font `fs-4` (`1.5rem` di desktop), `font-weight: 300`, warna `#6c757d`.

### 4. Services Section (`#services`)
- **Layout**: Latar `#fbfbfd`, padding vertikal section `48px 0` + container `48px 12px`.
- **Grid Kartu**: 3 kolom sejajar pada `>= 768px` (`col-md-4` dengan gap `24px` / `g-4`), dan bertumpuk 1 kolom pada `375px`.
- **Kartu (`.apple-card`)**: Latar `#ffffff`, `border-radius: 20px`, `padding: 2.5rem`, `border: 1px solid #f0f0f0`, `box-shadow: 0 4px 24px rgba(0, 0, 0, 0.03)`. Memiliki ikon Bootstrap Icons hijau (`#34c759`, `bi-cpu`, `bi-sliders`, `bi-person-gear`), judul `h4` (`1.5rem`, `font-weight: 600`), dan deskripsi `p` (`#6c757d`).

### 5. Products Section (`#products`)
- **Layout**: Latar `#ffffff`, padding vertikal section `48px 0` + container `48px 12px`.
- **Grid Produk**:
  - 4 produk pertama berada dalam grid 2 kolom di `>= 768px` (`col-md-6`, gap `24px`) dan 1 kolom di `375px`.
  - Tema warna kartu berselang-seling:
    1. *Zaarr Unified Platform*: Light (`#f5f5f7`)
    2. *Zaarr iMOPS™*: Dark (`#000000`, teks putih)
    3. *Zaarr SmartPatrol*: Light (`#f5f5f7`)
    4. *Cyber Security*: Dark (`#000000`, teks putih)
    5. *Hospital Information System*: Light (`#f5f5f7`), berada di baris bawah terpusat dengan lebar `col-md-8` (`66.6667%` pada `>= 768px`) dan `mt-4` (`24px`).
- **Kartu Produk (`.apple-product-grid`)**: Tinggi tetap `550px`, `border-radius: 24px`, `padding-top: 3.5rem`, flex column terpusat, teks di atas (`h3` `2.5rem`, `p` `1.1rem` dengan `max-width: 80%`), grup 2 tombol (`Learn more` solid hijau & `Buy` outline hijau, keduanya `<a href="#">` tanpa preventDefault pada situs asli), dan gambar produk di bawah (`.product-img-wrapper` tinggi `300px`, `margin-top: auto`, `object-fit: contain`, `object-position: bottom`).

### 6. Footer
- **Layout**: Latar `#f5f5f7`, `padding: 2rem 0`, `border-top: 1px solid #f8f9fa`, rata tengah, warna teks `#86868b`, ukuran `0.875rem` (`14px`).
- **Konten**: `h5` (`Zaarr.`, `20px`, `font-weight: 700`, warna `#212529`, `margin-bottom: 1rem`), tagline `p`, dan copyright `p` (`margin-top: 1.5rem`, `padding-bottom: 1rem`).

---

## Analisa & Penghalusan Efek Hover (Permintaan Pemilik Project)

### 1. Ringkasan Analisa Efek Hover Asli (`reference/original.css`)
- **Navbar Link (`.nav-link:hover`)**: `color: rgba(0, 0, 0, 0.65)` → `rgba(0, 0, 0, 0.8)` (`0.15s ease-in-out`). Sudah halus dan tenang.
- **Tombol CTA Hero (`.btn-apple:hover`)**: `#34c759` → `#2eb350` (`0.3s ease`). Sudah halus, namun sebelumnya memakai `transition: all`.
- **Kartu Services (`.apple-card:hover`)**: Di `original.css` memakai `transform: scale(1.02)` dan `box-shadow: 0 10px 30px rgba(0,0,0,0.06)` dengan `transition: transform 0.3s`. Terasa berlebihan karena kartu layanan bukan elemen yang bisa diklik namun membesar ke segala arah (membuat teks ikut membesar/bergeser), dan perubahan `box-shadow` tidak ikut ditransisikan.
- **Kartu Products (`.apple-product-grid:hover`)**: Di `original.css` memakai `transform: translateY(-12px)` dan `box-shadow: 0 20px 40px rgba(0,0,0,0.12)`. Lompatan `-12px` ke atas dan bayangan `40px` terlalu agresif saat pengguna hanya melakukan scroll.
- **Overlay Gambar Products (`.product-img-wrapper::after`)**: Di `original.css` menampilkan `linear-gradient(to top, rgba(52, 199, 89, 0.75), rgba(52, 199, 89, 0))` (`opacity: 0` → `1` saat kartu di-hover). Opasitas hijau `75%` menutupi detail visual gambar produk secara berlebihan.
- **Tombol Sekunder Products (`.btn-product-secondary:hover` / `Buy`)**: Di `original.css` berubah penuh menjadi `#34c759` dengan teks putih, sehingga saat di-hover terlihat kembar identik dengan tombol utama `Learn more` di sebelahnya.

### 2. Daftar Perubahan Hover yang Diterapkan
Tanpa mengubah layout, ukuran, atau warna dasar non-hover:
1. **`src/styles/tokens.css`**:
   - `--gradient-product-hover`: Opasitas gradasi hijau diturunkan dari `0.75` menjadi `0.12` (`linear-gradient(to top, rgba(52, 199, 89, 0.12), rgba(52, 199, 89, 0))`) agar gambar produk tetap jernih dengan *ambient glow* tipis.
   - `--shadow-card-hover`: Dihaluskan dari `0 10px 30px rgba(0, 0, 0, 0.06)` menjadi `0 6px 24px rgba(0, 0, 0, 0.05)`.
   - `--shadow-product-hover`: Dihaluskan dari `0 20px 40px rgba(0, 0, 0, 0.12)` menjadi `0 10px 28px rgba(0, 0, 0, 0.07)`.
   - `--transition-product` & `--transition-gradient`: Diselaraskan ke `0.35s`.
2. **`src/components/Services.css`**:
   - `.apple-card:hover`: Mengganti `transform: scale(1.02)` menjadi `transform: translateY(-2px)`.
   - `.apple-card`: Menambahkan `box-shadow var(--transition-base)` ke dalam `transition`.
3. **`src/components/Products.css` & `src/components/Hero.css`**:
   - `.apple-product-grid:hover`: Mengurangi angkatan dari `translateY(-12px)` menjadi `translateY(-4px)`.
   - `.btn-product-secondary:hover`: Menggunakan latar tint hijau lembut (`rgba(52, 199, 89, 0.12)` di tema terang dan `rgba(48, 209, 88, 0.15)` di `.dark-theme`) dengan teks tetap hijau agar hierarki visual dengan tombol `Learn more` tetap jelas.
   - `.btn-apple`, `.btn-product-primary`, `.btn-product-secondary`: Mengganti `transition: all` menjadi properti spesifik (`background-color`, `color`, `border-color`).

---

## Koreksi Ejaan Nama Perusahaan (`ZAARR` / `Zaarr`)

Sesuai instruksi pemilik project, ejaan nama perusahaan pada teks UI diperbaiki menjadi **ZAARR** / **Zaarr** (dobel R) di `src/data/content.js` dan `index.html`:
- `<title>` (`index.html` & `site.title`): `Zaarr - Integrated Solutions`
- `site.logo.alt`: `Zaarr Logo` (path `/Resources/Image/logo-zaar.png` **tidak diubah** agar tidak 404)
- `hero.taglineLines[0]`: `Zaarr is a one-stop solution integrator.`
- `about.title`: `About ZAARR.`
- Judul & `alt` produk di `products.items`: `Zaarr Unified Platform`, `Zaarr iMOPS™` (`alt: Zaarr i-MOPSTM`), `Zaarr SmartPatrol` (seluruh path gambar `/Resources/Image/*.png` **tidak diubah**)
- `footer.brand`: `Zaarr.`
- `footer.copyright`: `© 2026 Zaarr. All rights reserved.`

---

## Deploy manual (Step 10)

Pemeriksaan `npx vercel whoami` menunjukkan status `> Logged out.` di lingkungan ini. Repository sudah siap di-push (commit bersih, `.gitignore` mengecualikan `node_modules`, `dist`, `.vercel`, `reference/`).

Langkah-langkah deploy manual ke Vercel:
1. **Push ke GitHub**:
   ```bash
   git remote add origin <URL_REPO_GITHUB_ANDA>
   git branch -M main
   git push -u origin main
   ```
2. Buka **https://vercel.com/new** di browser.
3. Pilih **Import Git Repository** dan pilih repository GitHub yang baru di-push.
4. Pastikan konfigurasi project:
   - **Project Name**: `zaarr-react`
   - **Framework Preset**: `Vite` (Build Command: `npm run build`, Output Directory: `dist`)
5. Klik **Deploy**.

---

## Laporan Akhir (Step 11)

### 1. Status Deploy
- **Status**: **Siap deploy manual** (Vercel CLI belum login di environment lokal; seluruh kode dan aset sudah di-commit bersih dan siap di-push ke GitHub/Vercel).

### 2. Daftar Commit
1. `6b1b764` — `chore: scaffold vite react`
2. `28a83e2` — `feat: add assets`
3. `14f6282` — `feat: design tokens`
4. `8721e45` — `feat: navbar`
5. `e1514fc` — `feat: hero`
6. `f40dbd1` — `feat: about and services`
7. `6babcb8` — `feat: products and footer`
8. `b4a0de2` — `fix: match original at all breakpoints`
9. `8f5814b` — `docs: add manual deploy steps and final report in NOTES.md`
10. `6635790` — `style: refine hover effects to be calmer and smoother`
11. Checkpoint commit — `checkpoint: tone down hover effects and fix ZAARR brand spelling`
