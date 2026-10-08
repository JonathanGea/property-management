# Rentora frontend

Frontend Rentora untuk pencatatan properti sewa, berbasis Angular dan dirancang dari lebar layar kecil ke layar besar.

## Menjalankan

```bash
npm install
npm start
```

Buka `http://localhost:4200`. Untuk verifikasi, jalankan `npm run build` dan `npm test -- --watch=false`.

## Tema dan design token

Token warna, tipografi, jarak, radius, bayangan, dan animasi terpusat di `src/styles/tokens.css`. Lihat [panduan design token](src/styles/README.md) untuk mengganti tema dari satu tempat.

## Deploy ke Railway

Gunakan builder Railpack dengan Root Directory `/fe` dan Build Command `npm run build`.
Kosongkan pengaturan Start Command agar Railpack menyajikan hasil build sebagai situs statis.

`angular.json` menetapkan `outputPath` ke `dist/fe`. File situs, termasuk `index.html`,
berada di `dist/fe/browser`. Jika Railway masih mencoba menyalin `/app/browser`,
atur variable `RAILPACK_SPA_OUTPUT_DIR=dist/fe/browser`, lalu deploy ulang.
Path ini relatif terhadap Root Directory `/fe`, sehingga tidak perlu awalan `fe/` atau `/app/`.

## Struktur

```text
src/app/
├── core/               # model data dan state pencatatan MVP
├── features/
│   ├── dashboard/      # halaman ringkasan kos
│   ├── properties/     # daftar properti, unit, penyewa MVP
│   ├── finance/        # pembayaran sewa
│   └── more/           # halaman menu lainnya
├── layout/             # header, footer, dan navigasi utama
├── shared/ui/          # komponen visual yang digunakan lintas halaman
├── app.routes.ts       # path halaman
└── app.ts              # root aplikasi
```

Pada pembukaan pertama, Rentora mengisi tiga properti, tiga penyewa, dan satu pembayaran contoh agar halaman portofolio langsung dapat dicoba. Data ini hanya dibuat sekali; data yang sudah tersimpan atau workspace yang sengaja dikosongkan tidak ditimpa. Data kos, kamar, penyewa, dan pembayaran disimpan di `localStorage` browser melalui `PropertyStore`. Daftar fitur di luar cakupan MVP dijelaskan di PRD.

Rancangan cakupan dan batasan MVP ada di [PRD](../docs/PRD.md). Data dan aksi tiap halaman dijabarkan di [peta halaman](../docs/PAGES.md).

Ikon tab browser tersedia sebagai `public/favicon.svg` dan `public/favicon.ico`. Jika logo berubah, perbarui SVG dan jalankan `node scripts/generate-favicon.mjs` untuk membuat ulang ICO.
