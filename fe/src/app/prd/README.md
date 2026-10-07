# Preview dokumen (development only)

Folder ini berisi pembaca Markdown independen untuk dokumen sumber:

- `/prd` → `docs/PRD.md`
- `/prd/pages` → `docs/PAGES.md`

Jalankan `npm start` dari folder `fe`, lalu buka `http://localhost:4200/prd`.
Tersedia daftar isi, tabel yang dapat digeser, anchor eksplisit (misalnya
`/prd/pages#h-8`), dan tautan lintas dokumen. Tombol **Muat ulang** mengambil
ulang dokumen; jika perubahan sumber belum terlihat, restart dev server.

Dokumen disajikan langsung dari `docs/` melalui symlink `documents` dan konfigurasi assets development,
tanpa salinan dokumen di folder ini. Markdown diproses dengan `marked` dan
disanitasi oleh binding `innerHTML` Angular. Tidak ada akses ke store aplikasi,
localStorage, atau backend. Preview mempunyai layout sendiri.

Route `/prd` hanya didaftarkan saat `isDevMode()` aktif. Dokumen sumber hanya
disertakan dalam konfigurasi build development, bukan build production.

## Menghapus preview

1. Hapus folder `src/app/prd/`.
2. Hapus import `isDevMode` dan blok route development `/prd` di `app.routes.ts`.
3. Kembalikan `app.ts` menjadi root sederhana: import `Component`, `RouterOutlet`,
   dan `AppShell`, dengan template `<app-shell><router-outlet /></app-shell>` dan
   `export class App {}`. Hapus state `preview` dan import terkait.
4. Hapus override `assets` di `angular.json` → configurations → development.
5. Jalankan `npm uninstall --save-dev marked` dari `fe`.
6. Hapus tombol **Preview dokumen** dan kondisi `showDocsPreview` di halaman
   `features/more/`, beserta style `.docs-preview-button` dan import `isDevMode`.

Data aplikasi utama tidak disentuh oleh preview ini.
