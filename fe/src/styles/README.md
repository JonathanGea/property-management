# Design token Rentora

Semua token ada di [`tokens.css`](./tokens.css), dimuat secara global dari `src/styles.css`. Komponen menggunakan CSS custom properties sehingga perubahan token berlaku langsung di seluruh aplikasi, termasuk CSS inline komponen Angular, navbar, grafik, dan preview PRD.

## Mengubah tema

Tema bawaan menggunakan oranye bata solid (`--color-brand: #c2410c`) dengan varian gelap (`--color-brand-strong: #9a3412`). Background halaman netral hangat dan kartu putih; warna lembut dipakai untuk badge, status, dan penanda menu aktif. Ubah nilai token pada `:root` di `tokens.css` untuk mengganti tema seluruh aplikasi. Tidak ada preset tambahan atau atribut tema yang wajib dipasang.

Contoh untuk mengganti warna utama menjadi ungu, ubah nilai berikut di dalam `:root` yang sudah ada:

```css
--color-brand: #6d28d9;
--color-brand-strong: #5b21b6;
--color-focus: #7c3aed;
--color-background: #faf7ff;
--color-border: #e9def5;
```

Warna aksen lembut, hover, track grafik, dan bayangan diturunkan menggunakan `color-mix()` sehingga otomatis mengikuti warna brand. Untuk tema gelap, sesuaikan juga surface, teks, border, seluruh warna status dan pasangan teksnya.

## Memilih token

| Kelompok | Token utama | Penggunaan |
| --- | --- | --- |
| Brand | `--color-brand`, `--color-brand-strong`, `--color-brand-subtle` | Tombol, tautan, menu aktif, grafik |
| Permukaan | `--color-background`, `--color-surface`, `--color-surface-muted`, `--color-surface-hover` | Halaman, panel, track, hover |
| Teks | `--color-text`, `--color-text-muted`, `--color-on-brand` | Teks utama, keterangan, teks di atas brand |
| Status | `--color-success-*`, `--color-warning-*`, `--color-danger-*` | Pembayaran, peringatan, validasi |
| Notifikasi | `--color-notification`, `--color-on-notification` | Badge navigasi |
| Fokus | `--color-focus`, `--shadow-focus` | Navigasi keyboard dan input |
| Tipografi | `--font-family-sans`, `--font-size-12`, `--font-size-page-title` | Font, skala ukuran, judul responsif |
| Jarak | `--space-8`, `--space-16`, `--space-24` | Skala padding, margin, gap |
| Radius | `--radius-control`, `--radius-card`, `--radius-panel`, `--radius-dock` | Input, kartu, panel, navbar |
| Bayangan | `--shadow-panel`, `--shadow-card`, `--shadow-dock` | Elevasi komponen |
| Animasi | `--motion-duration-fast`, `--motion-duration-slow`, `--motion-ease-out` | Transisi; tetap hormati reduced motion |
| Layout | `--layout-content-width`, `--layout-dock-width`, `--page-gutter` | Lebar konten, navbar, gutter responsif |

Angka pada token skala menunjukkan nilai awal, bukan batas nilai: `--space-16` dapat diubah secara terpusat. Ukuran ikon, breakpoint, dan ukuran khusus layout tetap berada di komponen. Jika mengganti keluarga font, sesuaikan juga `@font-face` serta preload font di `index.html`.

## Menulis komponen

Gunakan token berdasarkan fungsi, bukan nama warna. Contoh:

```css
.panel {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-panel);
  padding: var(--space-16);
  box-shadow: var(--shadow-panel);
}
```

Warna hex baru ditempatkan di `tokens.css`. Variabel lokal komponen, seperti `--dock-accent` dan `--stat-tint`, harus merujuk ke token global. Warna status tetap sesuai artinya saat brand berganti. Logo favicon dan `meta[name="theme-color"]` merupakan aset statis; perbarui terpisah saat melakukan rebranding atau menambahkan penggantian tema permanen.
