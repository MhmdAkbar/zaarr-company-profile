# AGENTS.md — Recreate https://zaar-mocha.vercel.app/ dengan React, deploy ke Vercel

Kamu agen yang mengerjakan tugas ini dari awal sampai deploy. **Jangan bertanya ke user.** Kalau ada hal ambigu, pakai aturan di bagian "Keputusan yang sudah ditetapkan", catat asumsi di `NOTES.md`, lalu lanjut. Berhenti hanya jika ada blocker nyata (lihat "Blocker yang boleh menghentikan pekerjaan").

## 1. Tujuan

Hasil akhir: situs React yang **tampilannya dan perilakunya identik 1:1** dengan situs asli, ter-deploy di Vercel. Ini recreate, bukan redesign. Jangan memperbaiki, merapikan, atau menambah apa pun yang tidak ada di situs asli.

Tidak perlu backend. Situs 100% statis: tidak ada form, login, API, atau data dinamis.

## 2. Batasan

- Stack: Vite + React (sudah ter-scaffold), JSX (bukan TypeScript), CSS biasa (satu file CSS per komponen + `src/styles/tokens.css`). 
- Dilarang: backend, router, Tailwind, UI library, state manager, animasi library. Dependency runtime hanya `react` dan `react-dom`. `playwright` hanya devDependency.
- Semua teks diambil dari `src/data/content.js`. Jangan mengetik ulang copy di dalam komponen dan jangan mengubah isinya (termasuk typo seperti `cybersecuirty.png` dan teks fallback video).
- Bahasa UI: Inggris, sama seperti situs asli.
- Style harus berasal dari `reference/` (hasil ekstraksi), bukan dari tebakan. Nilai warna/font/ukuran masuk `src/styles/tokens.css` sebagai CSS variables, lalu dipakai di CSS komponen.

## 3. Sumber kebenaran

| Apa | Di mana |
|---|---|
| Copy semua section | `src/data/content.js` |
| Struktur HTML asli | `reference/body.html` (dibuat step 2) |
| Seluruh CSS asli (termasuk `:hover`, `@media`) | `reference/original.css` |
| Nilai style terkomputasi + frekuensi warna/font | `reference/tokens.json` |
| File mentah css/js/font asli | `reference/raw/` |
| Screenshot asli (1280/768/375, per section) | `reference/original/` |
| Screenshot versi kita | `reference/local/` |

Jika `reference/body.html` dan `original.css` ada, **port langsung**: salin struktur elemen dan aturan CSS, ubah jadi JSX dan file CSS komponen. Class name asli boleh dipertahankan. Screenshot dipakai untuk verifikasi, bukan untuk menebak.

## 4. Struktur target

```
src/
  main.jsx            (sudah ada)
  App.jsx             merakit semua komponen
  index.css           reset + base (sudah ada)
  styles/tokens.css   CSS variables (isi dari reference)
  data/content.js     (sudah ada, jangan diubah)
  components/
    Navbar.jsx / Navbar.css
    Hero.jsx / Hero.css
    About.jsx / About.css
    Services.jsx / Services.css
    Products.jsx / Products.css
    Footer.jsx / Footer.css
public/Resources/Image/*.png   (di-download step 1)
public/Resources/Video/0706.mp4
```

Urutan di `App.jsx`: `Navbar`, lalu `<main>` berisi `Hero`, `About`, `Services`, `Products`, lalu `Footer`. Section id: `about`, `services`, `products`. Path aset memakai `/Resources/...` persis seperti situs asli.

## 5. Langkah kerja (kerjakan berurutan, verifikasi tiap langkah)

### Step 0 — Preflight
```bash
node -v        # harus >= 20
npm install
git init 2>/dev/null; git add -A; git commit -m "chore: scaffold vite react" || true
```
Verifikasi: `npm run build` sukses.

### Step 1 — Ambil aset
```bash
npm run assets
```
Verifikasi:
- 6 gambar di `public/Resources/Image/` (`logo-zaar.png`, `unified.png`, `imops.png`, `product-patrol.png`, `cybersecuirty.png`, `HIS.png`) dan `public/Resources/Video/0706.mp4`, semua berukuran > 0.
- `file public/Resources/Image/*.png` melaporkan PNG image data. Jika ada yang berisi HTML (halaman error), download ulang dengan `curl -fSL`.
- Jika semua gagal karena domain tidak bisa diakses: lihat "Blocker".

Commit: `git add -A && git commit -m "feat: add assets"`.

### Step 2 — Tangkap referensi dari situs asli
```bash
npm i -D playwright
npx playwright install chromium        # tambahkan --with-deps jika Linux dan gagal karena library
npm run ref
```
Verifikasi: ada `reference/tokens.json`, `reference/original.css`, `reference/body.html`, dan screenshot di `reference/original/` (fold, full, nav, about, services, products, footer, di 1280/768/375).

Setelah itu **lihat sendiri** minimal `fold-1280.png`, `full-1280.png`, `full-375.png`, dan satu screenshot per section. Catat di `NOTES.md`: layout tiap section, apakah ada hamburger menu di 375px, apakah navbar sticky/fixed/transparan, animasi/hover yang terlihat di `original.css`.

Jika Playwright tidak bisa berjalan: fallback manual `scripts/extract-tokens.js` (jalankan di DevTools console), atau `curl -L https://zaar-mocha.vercel.app/ -o reference/original.html` lalu unduh file CSS/JS yang direferensikan di dalamnya ke `reference/raw/`.

### Step 3 — Isi design tokens
Edit `src/styles/tokens.css`:
- Ganti **semua** nilai bertanda `TODO` dengan nilai asli dari `reference/tokens.json` dan `original.css`. Jika `rootVars` tidak kosong, pakai nama dan nilai itu.
- Tambah token yang diperlukan (mis. warna aksen, tinggi hero, durasi transition). Hapus token yang tidak dipakai.
- Font: jika `fontLinks` berisi Google Fonts, tambahkan `<link>` yang sama di `index.html`. Jika font file ada di `reference/raw/`, salin ke `public/fonts/` dan buat `@font-face` di `tokens.css`. Jika hanya font sistem, pakai font stack yang sama persis.

Verifikasi: `grep -n TODO src/styles/tokens.css` kosong. Commit: `feat: design tokens`.

### Step 4 — Layout dasar + Navbar
- `App.jsx` merakit semua komponen; komponen yang belum dikerjakan boleh placeholder sementara.
- `Navbar`: logo (link `#`), tiga link anchor dari `navLinks`. Ikuti posisi/ukuran/warna asli (cek apakah `position: fixed/sticky`, background transparan atau solid). Smooth scroll ke anchor sudah ada di `index.css` (`scroll-behavior`); jika di situs asli offset terhadap navbar tinggi, samakan dengan `scroll-margin-top`.
- Mobile: tiru persis apa yang dilakukan situs asli di 375px (lihat `reference/original/nav-375.png` dan `@media` di `original.css`). Jangan tambah hamburger jika asli tidak punya.

Verifikasi: `npm run dev`, anchor berfungsi. Commit: `feat: navbar`.

### Step 5 — Hero
- `<video>` dengan atribut yang sama seperti `reference/tokens.json` → `videoHtml` (umumnya `autoplay muted loop playsinline`), `src` dari `hero.video`, teks fallback dari `hero.videoFallback`.
- Overlay, tinggi, posisi, tipografi judul (dua baris dari `titleLines`, pakai `<br />`), tagline (dua baris), tombol CTA `Discover Solutions` → `#products`.
- Video harus tetap bisa autoplay (wajib `muted` + `playsInline`).

Commit: `feat: hero`.

### Step 6 — About + Services
- `About`: judul `About ZAAR.` + paragraf, id `about`.
- `Services`: judul `Our Services.`, 3 kartu dari `services.items` lewat `.map()`, id `services`. Layout kartu (grid/flex, jumlah kolom per breakpoint) ikuti asli.

Commit: `feat: about and services`.

### Step 7 — Products + Footer
- `Products`: judul `Innovative Products.`, 5 item dari `products.items` lewat `.map()`; tiap item: judul, teks, dua tombol dari `products.actions`, gambar. Tombol berupa `<a href="#">` dummy. Karena `href="#"` menggulung ke atas, tambahkan `onClick={(e) => e.preventDefault()}` hanya jika situs asli tidak scroll ke atas saat diklik; kalau asli scroll ke atas, biarkan perilaku default. Urutan teks/gambar (selang-seling atau tidak) ikuti screenshot asli.
- `Footer`: `footer.brand`, `footer.tagline`, `footer.copyright`.

Commit: `feat: products and footer`.

### Step 8 — Samakan dengan aslinya (pass responsif)
```bash
npm run build
npx vite preview --port 4173 &
sleep 2
npm run shot
```
Bandingkan `reference/local/*` dengan `reference/original/*` untuk 1280, 768, 375 (fold, full, dan tiap section). Perbaiki selisih: spacing, ukuran font, warna, tinggi section, posisi gambar, wrapping teks. Ulangi sampai perbedaannya tidak terlihat mata. Lakukan minimal dua putaran.

Aturan: tinggi halaman penuh (`full-1280.png`) kira-kira sama dengan aslinya (selisih ≤ 2%).

Commit: `fix: match original at all breakpoints`.

### Step 9 — QA akhir
Semua harus lolos sebelum deploy:
- [ ] `npm run lint` tanpa error
- [ ] `npm run build` sukses, tanpa warning merah
- [ ] Tidak ada request 404 di console saat membuka halaman (cek aset dan font)
- [ ] Semua teks sama dengan `content.js`; tidak ada `lorem`, `TODO`, atau placeholder tersisa (`grep -rn "TODO\|Navbar$\|Hero$" src`)
- [ ] Anchor About/Services/Products dan tombol CTA berfungsi
- [ ] Video autoplay, muted, loop
- [ ] Tidak ada horizontal scroll di 375px
- [ ] `alt` gambar sesuai `content.js`

### Step 10 — Deploy ke Vercel
Vite terdeteksi otomatis oleh Vercel: build command `npm run build`, output `dist`. Tidak perlu `vercel.json`.

1. Cek CLI: `npx vercel whoami`.
   - **Jika sudah login**: `npx vercel --prod --yes` (project name `zaarr-react`). Catat URL production.
   - **Jika belum login atau tidak ada akses**: jangan minta input. Siapkan repo siap-push (commit bersih, `.gitignore` benar), tulis di `NOTES.md` bagian "Deploy manual" berisi langkah: push ke GitHub → vercel.com/new → import repo → Framework Preset: Vite → Deploy. Lalu lanjut ke Step 11.
2. Jika deploy berhasil, buka URL production (curl status 200 dan jalankan `npm run shot -- <url-production>`), pastikan sama dengan lokal.

### Step 11 — Laporan akhir
Tulis ringkasan akhir (dan simpan di `NOTES.md`):
- URL production atau status "siap deploy manual"
- Daftar commit
- Asumsi yang dibuat (dari bagian keputusan)
- Selisih visual yang masih ada (jika ada) beserta alasannya

## 6. Keputusan yang sudah ditetapkan (jangan bertanya)

| Situasi | Keputusan |
|---|---|
| Tombol "Learn more" / "Buy" tujuannya apa | `href="#"` dummy, sama seperti asli |
| Teks fallback video berbahasa Jawa | Pertahankan persis |
| Typo `cybersecuirty.png` | Pertahankan nama file dan path |
| Hamburger menu di mobile | Hanya jika situs asli punya |
| Layout produk (selang-seling atau tidak) | Ikuti screenshot asli; jika tidak jelas, selang-seling gambar kiri/kanan |
| Detail visual tidak terbaca dari referensi | Pilih nilai terdekat yang mengikuti screenshot, catat di `NOTES.md` |
| Video besar | Biarkan apa adanya, jangan kompres |
| Perbaikan UX/SEO/aksesibilitas di luar aslinya | Jangan dikerjakan. Hanya `alt`, `lang="en"`, `<title>`, dan viewport meta yang sudah ada |
| Library tambahan terasa berguna | Jangan tambah |
| Halaman tambahan (kontak, detail produk) | Jangan dibuat |
| Dua opsi implementasi sama baiknya | Pilih yang paling sederhana |

## 7. Blocker yang boleh menghentikan pekerjaan

Hanya ini, dan sebelum berhenti coba dulu semua fallback di langkah terkait:
1. Situs asli tidak bisa diakses dari lingkunganmu sama sekali (aset, referensi). Tulis persis perintah yang gagal dan pesan errornya di `NOTES.md`, lalu berhenti dan laporkan.
2. Playwright/Chromium tidak bisa diinstal **dan** fallback manual juga gagal. Kerjakan tetap dari `content.js` dengan nilai style terbaik yang bisa kamu dapatkan, tandai semuanya di `NOTES.md`, lalu lanjut sampai Step 9.
3. Deploy Vercel butuh login: bukan blocker, ikuti cabang "belum login" di Step 10.

## 8. Cara kerja

- Satu commit per step, pesan commit sesuai yang tertulis.
- Setelah tiap step jalankan `npm run build` agar proyek tidak pernah rusak.
- Jangan ubah `src/data/content.js` dan jangan hapus `AGENTS.md`.
- Jika sebuah perintah gagal, baca error-nya, perbaiki, ulangi. Jangan melewati verifikasi.
