# Peta Halaman Rentora MVP

Dokumen ini menurunkan halaman, data yang tampil, dan aksi pengguna dari [PRD Rentora MVP](PRD.md).

## Daftar Halaman

| ID | Halaman | Tujuan | Fitur PRD |
| --- | --- | --- | --- |
| H-1 | [Beranda](#h-1) | Melihat ringkasan seluruh properti dan pembayaran bulan berjalan | [F-5](PRD.md#fitur-5) |
| H-2 | [Daftar properti sewa](#h-2) | Melihat dan membuka properti sewa yang dikelola | [F-1](PRD.md#fitur-1), [F-2](PRD.md#fitur-2) |
| H-3 | [Tambah properti sewa](#h-3) | Mencatat properti baru beserta unit awal | [F-1](PRD.md#fitur-1), [F-2](PRD.md#fitur-2) |
| H-4 | [Detail properti sewa](#h-4) | Mengelola informasi properti dan daftar unit sewanya | [F-1](PRD.md#fitur-1), [F-2](PRD.md#fitur-2), [F-6](PRD.md#fitur-6), [F-7](PRD.md#fitur-7) |
| H-8 | [Detail unit sewa](#h-8) | Mengelola satu unit, masa huni penyewa, pembayaran, dan riwayatnya | [F-2](PRD.md#fitur-2), [F-3](PRD.md#fitur-3), [F-4](PRD.md#fitur-4), [F-6](PRD.md#fitur-6), [F-7](PRD.md#fitur-7) |
| H-5 | [Riwayat penghuni](#h-5) | Melihat penyewa aktif dan mantan penyewa pada satu properti | [F-7](PRD.md#fitur-7) |
| H-6 | [Keuangan](#h-6) | Memilih periode sewa serta melihat ringkasan dan riwayat pembayaran | [F-4](PRD.md#fitur-4), [F-5](PRD.md#fitur-5), [F-6](PRD.md#fitur-6) |
| H-7 | [Lainnya](#h-7) | Melihat informasi penyimpanan dan mengunduh salinan data | [F-8](PRD.md#fitur-8) |
| H-9 | [Daftar penghuni](#h-9) | Melihat seluruh penghuni aktif dan mantan penghuni lintas properti | [F-7](PRD.md#fitur-7) |

Alur utama: [Daftar properti sewa](#h-2) → [Detail properti sewa](#h-4) → [Detail unit sewa](#h-8). Formulir data penyewa, koreksi masa huni, dan pencatatan pembayaran berada di Detail unit sewa. Riwayat penghuni pada H-5 mencakup seluruh unit dalam satu properti; riwayat pada H-8 hanya mencakup unit yang dibuka.

Alur daftar seluruh penghuni: **Penghuni** pada bar navigasi bawah → [Daftar penghuni](#h-9) → [Detail unit sewa](#h-8) pada masa huni terpilih.

## Navigasi

### Bar navigasi bawah

- [Beranda](#h-1)
- [Properti](#h-2)
- [Keuangan](#h-6)
- [Penghuni](#h-9)

### Header

- [Lainnya](#h-7): ikon saja di kanan atas, dengan nama aksesibel **Lainnya**.

## Data yang Menghubungkan Halaman

| Data | Isi | Halaman terkait |
| --- | --- | --- |
| Properti sewa | Nama, lokasi, daftar unit | H-1, H-2, H-3, H-4, H-5, H-6, H-8, H-9 |
| Unit sewa | Nomor unit, properti induk, status kosong atau terisi | H-1, H-2, H-3, H-4, H-5, H-6, H-8, H-9 |
| Masa huni penyewa | Nama, telepon opsional, unit, tarif bulanan, tanggal jatuh tempo, tanggal mulai, tanggal keluar yang kosong selama aktif | H-5, H-8, H-9; ringkasan penyewa aktif di H-1, H-4, dan H-6 |
| Pembayaran sewa | Properti, nomor unit, nama penyewa saat dicatat, periode sewa, nominal, waktu pencatatan, status tercatat lunas atau dibatalkan | H-4, H-6, H-8 |
| Salinan data JSON | Seluruh data kos, kamar, masa huni, dan pembayaran termasuk yang dibatalkan | H-7 |

Saat kamar dikosongkan, tanggal keluar diisi dan masa huni berakhir, tetapi riwayat penghuni dan pembayaran tetap tersedia. Riwayat penghuni mencakup mantan penyewa meskipun tidak ada catatan pembayarannya ([F-3](PRD.md#fitur-3), [F-6](PRD.md#fitur-6), [F-7](PRD.md#fitur-7)).

<a id="h-1"></a>

## H-1 — Beranda

**Data tampil:** jumlah properti sewa; jumlah unit kosong dan terisi; tingkat okupansi; unit terisi yang **Belum dicatat lunas** untuk bulan berjalan; daftar properti.

**Aksi:** buka properti atau unit terkait untuk menindaklanjuti pembayaran; buka daftar properti sewa atau Keuangan.

**Acuan PRD:** K-2, K-4, K-5; [F-5](PRD.md#fitur-5). Angka harus mengikuti data yang dimasukkan, bukan data contoh.

<a id="h-2"></a>

## H-2 — Daftar properti sewa

**Data tampil:** daftar properti sewa yang dikelola, masing-masing dengan nama dan lokasi. Ringkasan unit dapat membantu pemilik memilih properti yang akan dibuka.

**Aksi:** pilih **Tambah properti** untuk membuka H-3; buka satu properti untuk menuju H-4.

**Keadaan kosong:** bila belum ada properti, tampilkan ajakan untuk menambahkan properti pertama.

**Acuan PRD:** K-1, K-2; [F-1](PRD.md#fitur-1), [F-2](PRD.md#fitur-2).

<a id="h-3"></a>

## H-3 — Tambah properti sewa

**Data masukan:** nama properti, lokasi, dan jumlah unit awal.

**Aksi dan hasil:** **Simpan** membuat properti serta unit awal sesuai jumlah yang dimasukkan; properti baru muncul di H-2 dan dapat dibuka di H-4. **Batal** kembali tanpa membuat properti.

**Acuan PRD:** K-1; [F-1](PRD.md#fitur-1), [F-2](PRD.md#fitur-2).

<a id="h-4"></a>

## H-4 — Detail properti sewa

**Data tampil:** nama dan lokasi properti; jumlah unit kosong dan terisi; daftar unit dengan nomor, status, nama penyewa aktif jika ada, serta status pencatatan pembayaran bulan berjalan. Riwayat pembayaran properti menampilkan nomor unit, nama penyewa saat dicatat, periode, nominal, waktu pencatatan, dan status. Sediakan akses ke H-5 untuk seluruh riwayat penghuni properti.

| Aksi | Masukan atau syarat | Hasil |
| --- | --- | --- |
| **Ubah properti** | Nama dan lokasi properti | Data properti diperbarui |
| **Hapus properti** | Seluruh unit pada properti belum pernah memiliki penghuni atau pembayaran; konfirmasi | Properti dan unit kosongnya dihapus |
| **Tambah unit** | Properti yang sedang dibuka | Unit baru berstatus kosong muncul dalam daftar |
| **Buka unit** | Pilih unit dalam daftar | Buka H-8 untuk unit tersebut |
| **Riwayat penghuni** | Properti yang sedang dibuka | Buka H-5 untuk properti tersebut |

**Keadaan kosong:** bila properti belum memiliki unit, tampilkan pilihan **Tambah unit**. Setelah penghapusan properti berhasil, kembali ke H-2.

**Acuan PRD:** K-1, K-2, K-3, K-5; [F-1](PRD.md#fitur-1), [F-2](PRD.md#fitur-2), [F-6](PRD.md#fitur-6), [F-7](PRD.md#fitur-7).

<a id="h-8"></a>

## H-8 — Detail unit sewa

**Tujuan:** melihat kondisi dan mengelola satu unit di dalam properti.

**Data tampil:** nama properti induk; nomor dan status unit; data penyewa aktif berupa nama, telepon opsional, tarif bulanan, tanggal jatuh tempo, dan tanggal mulai; status **Tercatat lunas** atau **Belum dicatat lunas** untuk bulan berjalan. Riwayat penghuni unit menampilkan setiap masa huni dengan nama, tanggal mulai, dan tanggal keluar jika sudah berakhir.

### Riwayat pembayaran unit

Bagian ini menampilkan semua catatan pembayaran pada unit yang dibuka, dari seluruh masa huni penghuni aktif maupun mantan penghuni. Setiap catatan memuat nama penyewa saat dicatat, periode sewa, nominal, waktu pencatatan, serta status **Tercatat lunas** atau **Dibatalkan**, sesuai [F-6](PRD.md#fitur-6).

Catatan yang dibatalkan tetap terlihat tetapi tidak dihitung dalam total pembayaran. Riwayat tidak hilang saat unit dikosongkan atau ditempati penyewa baru. Bila belum ada catatan, tampilkan pesan **Belum ada catatan pembayaran untuk unit ini**.

### Aksi dan aturan unit

| Aksi | Masukan atau syarat | Hasil |
| --- | --- | --- |
| **Ubah nomor unit** | Nomor baru unik dalam properti; unit belum pernah memiliki penghuni atau pembayaran | Nomor diperbarui; tetap di H-8 |
| **Hapus unit** | Unit belum pernah memiliki penghuni atau pembayaran; konfirmasi | Unit dihapus; kembali ke H-4 |
| **Isi penyewa** | Unit kosong; nama, telepon opsional, tarif bulanan, tanggal jatuh tempo, tanggal mulai; tanggal keluar kosong | Masa huni aktif dibuat; unit menjadi terisi |
| **Koreksi masa huni** | Pilih masa huni aktif atau entri riwayat; perbaiki data tanpa membuat entri baru | Data masa huni diperbarui; pembayaran lama tetap sama |
| **Akhiri masa huni** | Unit terisi; tanggal keluar sebenarnya dan konfirmasi | Unit menjadi kosong; riwayat tetap tersedia |
| **Catat pembayaran** | Pilih masa huni aktif atau lampau, periode yang memenuhi aturan PRD, dan nominal penuh | Catatan dibuat; status periode menjadi **Tercatat lunas** |
| **Kembali ke properti** | Properti induk unit | Buka H-4 |

**Aturan:** nomor unit unik dalam properti; unit yang memiliki riwayat tidak dapat dihapus atau diganti nomornya. Validasi masa huni mengikuti [F-3](PRD.md#fitur-3): satu penyewa aktif per unit, tarif rupiah bulat lebih dari Rp 0, jatuh tempo 1–28, tanggal keluar kosong selama aktif, dan koreksi tanggal menjaga hubungan dengan riwayat pembayaran. Pencatatan pembayaran mengikuti [F-4](PRD.md#fitur-4): periode dalam masa huni sampai bulan berjalan, nominal penuh tanpa prorata, dan paling banyak satu catatan yang belum dibatalkan untuk setiap masa huni dan periode. Nominal awal mengikuti tarif terakhir pada masa huni terpilih dan dapat disesuaikan untuk periode lama.

**Keadaan halaman:** unit kosong menampilkan **Isi penyewa**; unit terisi menampilkan data penyewa dan **Akhiri masa huni**. Riwayat tetap terlihat saat unit kembali kosong. Bila dibuka melalui H-5 atau H-9, tampilkan masa huni yang dipilih, termasuk bila unit saat ini ditempati orang lain. Setelah data disimpan, tetap di H-8 dan perbarui status serta daftar terkait. Bila belum ada riwayat penghuni atau pembayaran, tampilkan keadaan kosong pada bagian terkait. Bila unit tidak ditemukan, tampilkan pesan dan tautan ke H-4.

**Acuan PRD:** K-1 s.d. K-5; [F-2](PRD.md#fitur-2), [F-3](PRD.md#fitur-3), [F-4](PRD.md#fitur-4), [F-6](PRD.md#fitur-6), [F-7](PRD.md#fitur-7).

<a id="h-5"></a>

## H-5 — Riwayat penghuni

**Data tampil:** semua masa huni yang pernah dicatat pada properti yang dibuka, termasuk penyewa aktif dan mantan penyewa. Setiap entri memuat nama, nomor unit, status **Aktif** atau **Sudah keluar**, tanggal mulai, dan tanggal keluar bila sudah tidak aktif. Tanggal keluar penyewa aktif kosong. Penghuni lama tetap muncul setelah unit ditempati penyewa baru.

**Aksi:** pilih entri masa huni untuk membuka H-8 pada unit dan masa huni terkait, lalu membetulkan data atau mencatat pembayaran periode lampau; kembali ke H-4.

**Keadaan kosong:** bila belum ada penghuni yang pernah dicatat, tampilkan daftar kosong. Riwayat tidak boleh bergantung pada adanya pembayaran.

**Acuan PRD:** K-3; [F-7](PRD.md#fitur-7), terkait alur kosongkan kamar pada [F-3](PRD.md#fitur-3).

<a id="h-6"></a>

## H-6 — Keuangan

**Data tampil:** periode bulan sewa yang dipilih; total nominal pembayaran yang belum dibatalkan pada periode tersebut; daftar masa huni yang **Belum dicatat lunas** pada periode itu, termasuk mantan penyewa yang menempati kamar pada bulan tersebut; riwayat semua pembayaran dengan kos, kamar, nama penyewa saat dicatat, periode, nominal, waktu pencatatan, dan status.

**Aksi:** pilih periode bulan sewa sampai bulan berjalan; buka H-8 pada unit dan masa huni terkait untuk mencatat pembayaran penuh, termasuk periode lampau setelah penyewa keluar; **Batalkan pembayaran** yang salah dengan konfirmasi. Catatan yang dibatalkan tetap terlihat, tidak dihitung dalam total, dan status periode terkait kembali **Belum dicatat lunas** sehingga pembayaran pengganti dapat dicatat.

**Keadaan kosong:** tampilkan pesan bila belum ada pembayaran yang tercatat atau tidak ada masa huni yang menunggu pencatatan pembayaran pada periode pilihan.

**Acuan PRD:** K-4, K-5; [F-4](PRD.md#fitur-4), [F-5](PRD.md#fitur-5), [F-6](PRD.md#fitur-6).

<a id="h-7"></a>

## H-7 — Lainnya

**Akses:** ikon **Lainnya** di kanan atas header.

**Data tampil:** informasi penyimpanan pada browser/perangkat yang digunakan dan pilihan ekspor data.

**Aksi:** **Ekspor data** mengunduh berkas JSON berisi seluruh properti, unit, riwayat penghuni, dan catatan pembayaran beserta status pembatalannya.

**Keadaan gagal:** bila ekspor gagal, tampilkan pesan yang jelas. Jelaskan bahwa data lokal dapat hilang bila data browser terhapus atau perangkat hilang.

**Acuan PRD:** K-6; [F-8](PRD.md#fitur-8).

<a id="h-9"></a>

## H-9 — Daftar penghuni

**Tujuan:** melihat seluruh penghuni aktif dan mantan penghuni dari semua properti dalam satu daftar. Halaman diakses melalui **Penghuni** pada bar navigasi bawah.

**Data tampil:** satu baris untuk setiap masa huni, berisi nama penghuni, nama properti, nomor unit, status **Aktif** atau **Sudah keluar**, tanggal mulai, dan tanggal keluar bila sudah berakhir. Tanggal keluar yang kosong ditampilkan sebagai tanda belum berakhir. Orang yang pernah menyewa beberapa kali memiliki baris terpisah untuk setiap masa huni.

**Filter:** properti dan status penghuni, masing-masing dengan pilihan **Semua**. Awalnya semua properti serta penghuni aktif dan yang sudah keluar ditampilkan. Kedua filter dapat digunakan bersamaan.

**Aksi:** pilih entri untuk membuka H-8 pada unit dan masa huni terkait, lalu melihat riwayat, membetulkan data, atau mencatat pembayaran sesuai aturan PRD; ubah atau kembalikan filter ke **Semua**; pindah halaman melalui bar navigasi bawah.

**Keadaan halaman:** bila belum ada masa huni yang pernah dicatat, tampilkan keadaan kosong. Bila tidak ada entri yang cocok dengan filter, tampilkan pesan dan pilihan mengembalikan filter ke **Semua**. Masa huni tanpa pembayaran tetap muncul. Perubahan masa huni dari H-8 memperbarui daftar dan statusnya.

**Acuan PRD:** K-3; [F-7](PRD.md#fitur-7), terkait koreksi masa huni pada [F-3](PRD.md#fitur-3).
