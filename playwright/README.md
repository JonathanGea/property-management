# Pengujian Playwright

Folder ini memisahkan script pengujian UI Rentora dari hasil pemeriksaan browser.

- `scripts/`: script untuk menjalankan pengujian.
- `results/`: laporan dan screenshot hasil pengujian.

Hasil pengujian: Hasil terbaru menggantikan berkas dengan nama yang sama.

- `results/browser-report.json`: hasil 24 pemeriksaan layout (6 halaman × 4 lebar layar), visibilitas navigasi, ukuran input, error JavaScript, dan alur pencatatan pembayaran.
- `results/screenshots/dashboard-mobile.png`: beranda pada viewport 390 × 844 px.
- `results/screenshots/finance-mobile.png`: keuangan pada viewport 390 × 844 px.
- `results/screenshots/dashboard-desktop.png`: beranda pada viewport 1280 × 844 px.

Pemeriksaan dilakukan dengan Chromium pada lebar 320, 390, 768, dan 1280 CSS px. Data properti dan penyewa adalah data uji dalam context browser terpisah. Tidak ada data pengguna yang diubah.

Screenshot menggunakan seluruh panjang halaman; posisi navigasi tetap mengikuti viewport saat pengambilan gambar. Pemeriksaan ini belum mencakup perangkat fisik, Safari, atau keyboard virtual ponsel.

## Menjalankan ulang

Script uji: `scripts/check-ui.cjs`. Jalankan frontend terlebih dahulu dengan `npm start --prefix fe`.

Jika Playwright sudah terpasang dan dapat di-resolve oleh Node:

```bash
node playwright/scripts/check-ui.cjs
```

Untuk instalasi terpisah dari dependency aplikasi:

```bash
npm install --prefix /tmp/rentora-pw playwright@1.64.0
/tmp/rentora-pw/node_modules/.bin/playwright install --with-deps chromium
PLAYWRIGHT_MODULE_PATH=/tmp/rentora-pw/node_modules/playwright node playwright/scripts/check-ui.cjs
```

Alamat server dapat diubah melalui `BASE_URL`. Script menulis laporan dan screenshot ke `playwright/results/` secara otomatis, dan mengembalikan exit code 1 jika pemeriksaan gagal.
