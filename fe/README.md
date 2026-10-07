# Rentora frontend

Frontend Rentora untuk pencatatan properti sewa, berbasis Angular dan dirancang dari lebar layar kecil ke layar besar.

## Menjalankan

```bash
npm install
npm start
```

Buka `http://localhost:4200`. Untuk verifikasi, jalankan `npm run build` dan `npm test -- --watch=false`.

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

Data kos, kamar, penyewa, dan pembayaran disimpan di `localStorage` browser melalui `PropertyStore`. Rancangan cadangan JSON dan daftar fitur di luar cakupan MVP dijelaskan di PRD.

Rancangan cakupan dan batasan MVP ada di [PRD](../docs/PRD.md). Data dan aksi tiap halaman dijabarkan di [peta halaman](../docs/PAGES.md).

Ikon tab browser tersedia sebagai `public/favicon.svg` dan `public/favicon.ico`. Jika logo berubah, perbarui SVG dan jalankan `node scripts/generate-favicon.mjs` untuk membuat ulang ICO.
