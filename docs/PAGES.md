# Peta Halaman Rentora MVP

Dokumen ini menurunkan halaman, data, aksi, dan aturan dari [PRD Rentora MVP](PRD.md). Definisi data mengacu pada bagian [Definisi](PRD.md#definisi); aturan lengkap mengikuti fitur PRD yang ditautkan pada setiap halaman.

## Daftar Halaman

| ID | Halaman | Tujuan | Fitur PRD |
| --- | --- | --- | --- |
| H-1 | [Beranda](#h-1) | Melihat ringkasan properti, unit, dan pembayaran bulan berjalan | [F-5](PRD.md#fitur-5) |
| H-2 | [Daftar properti sewa](#h-2) | Melihat dan membuka properti yang dikelola | [F-1](PRD.md#fitur-1), [F-5](PRD.md#fitur-5) |
| H-3 | [Tambah properti sewa](#h-3) | Membuat properti dengan nama dan lokasi | [F-1](PRD.md#fitur-1) |
| H-4 | [Detail properti sewa](#h-4) | Mengelola properti, menambah unit, dan melihat riwayat properti | [F-1](PRD.md#fitur-1), [F-2](PRD.md#fitur-2), [F-5](PRD.md#fitur-5), [F-6](PRD.md#fitur-6), [F-7](PRD.md#fitur-7) |
| H-8 | [Detail unit sewa](#h-8) | Mengelola harga standar, masa sewa, riwayat tarif, dan pembayaran unit | [F-2](PRD.md#fitur-2), [F-3](PRD.md#fitur-3), [F-4](PRD.md#fitur-4), [F-6](PRD.md#fitur-6), [F-7](PRD.md#fitur-7) |
| H-5 | [Riwayat penghuni](#h-5) | Melihat seluruh masa sewa pada satu properti | [F-3](PRD.md#fitur-3), [F-7](PRD.md#fitur-7) |
| H-6 | [Keuangan](#h-6) | Melihat pembayaran dan periode yang belum dicatat lunas | [F-3](PRD.md#fitur-3), [F-4](PRD.md#fitur-4), [F-5](PRD.md#fitur-5), [F-6](PRD.md#fitur-6) |
| H-9 | [Daftar penghuni](#h-9) | Mengelola identitas penghuni lintas properti | [F-7](PRD.md#fitur-7) |
| H-10 | [Detail penghuni](#h-10) | Mengelola identitas dan memulai atau melihat masa sewa | [F-3](PRD.md#fitur-3), [F-7](PRD.md#fitur-7) |
| H-7 | [Lainnya](#h-7) | Melihat informasi prototipe dan data contoh | — |

## Navigasi

### Bar navigasi bawah

- [Beranda](#h-1)
- [Properti](#h-2)
- [Keuangan](#h-6)
- [Penghuni](#h-9)

### Header

- [Lainnya](#h-7): ikon saja di kanan atas, dengan nama aksesibel **Lainnya**.

## Alur Utama

1. [Daftar properti](#h-2) → [Tambah properti](#h-3) → [Detail properti](#h-4).
2. Di detail properti, **Tambah unit** dengan nomor dan harga standar → [Detail unit](#h-8).
3. [Daftar penghuni](#h-9) → **Tambah penghuni** atau pilih identitas yang ada → [Detail penghuni](#h-10).
4. Di detail penghuni, **Mulai masa sewa** → pilih properti/unit, tanggal masuk, jatuh tempo, dan tarif awal → [Detail unit](#h-8) pada masa sewa baru.
5. Di detail unit, **Catat pembayaran** untuk bulan sewa pilihan; **Ubah tarif** untuk menambahkan tarif dan periode mulai berlaku; **Akhiri masa sewa** ketika penghuni keluar.

**Jalur dari unit kosong:** H-8 → **Mulai masa sewa** → pilih penghuni yang ada atau buat identitas baru. Properti dan unit sudah terpilih. Formulir ini mengikuti aturan yang sama dengan formulir di H-10.

**Jalur riwayat:** H-4 → [Riwayat penghuni](#h-5) → H-8 pada masa sewa terpilih; H-9 → H-10 → H-8 pada masa sewa terpilih. Penghuni yang menyewa kembali memakai identitas yang sama dan masa sewa baru.

## Data yang Menghubungkan Halaman

| Data | Isi | Halaman terkait |
| --- | --- | --- |
| Properti sewa | Nama, lokasi, daftar unit | H-1, H-2, H-3, H-4; konteks pada halaman lain |
| Unit sewa | Properti induk, nomor, harga standar bulanan, status dari masa sewa aktif | H-4, H-8; pemilihan pada H-10 |
| Penghuni | Identitas tersendiri: nama dan telepon opsional | H-9, H-10; pemilihan pada H-8; nama terkait pada riwayat |
| Masa sewa | Hubungan penghuni-unit, tanggal masuk/keluar, jatuh tempo | H-5, H-8, H-10; ringkasan pada H-1, H-4, H-6, H-9 |
| Riwayat tarif | Masa sewa, tarif kesepakatan, bulan/tahun mulai berlaku, catatan opsional | H-8; tarif awal pada H-10; tarif periode pada H-6 |
| Transaksi pembayaran | Masa sewa terkait; salinan properti, unit, nama penghuni, periode sewa, tarif periode, nominal, tanggal pembayaran, waktu pencatatan, status | H-4, H-6, H-8 |

**Pemilihan tarif:** gunakan tarif kesepakatan dengan periode mulai berlaku paling akhir yang tidak melewati bulan sewa pilihan. Harga standar unit hanya menjadi nilai awal untuk masa sewa baru. Transaksi menyimpan salinan tarif dan nominal saat dicatat, sesuai [F-3](PRD.md#fitur-3), [F-4](PRD.md#fitur-4), dan [F-6](PRD.md#fitur-6).

**Identitas dan riwayat:** daftar penghuni memiliki satu entri per orang; riwayat properti/unit memiliki satu entri per masa sewa. Identitas tanpa masa sewa tetap dapat disimpan. Riwayat masa sewa tetap tersedia meskipun belum memiliki pembayaran.

<a id="h-1"></a>

## H-1 — Beranda

**Data tampil:** jumlah properti; unit kosong/terisi; tingkat okupansi; unit terisi yang **Belum dicatat lunas** untuk bulan berjalan; daftar properti.

**Aksi:** buka properti atau unit pada masa sewa terkait; buka Keuangan untuk menindaklanjuti pencatatan pembayaran.

**Keadaan kosong:** bila belum ada properti, tampilkan ajakan **Tambah properti** menuju H-3. Angka ringkasan mengikuti data pengguna.

**Acuan PRD:** [K-2](PRD.md#k-2), [K-4](PRD.md#k-4), [K-5](PRD.md#k-5); [F-5](PRD.md#fitur-5).

<a id="h-2"></a>

## H-2 — Daftar properti sewa

**Data tampil:** nama dan lokasi setiap properti, serta ringkasan jumlah unit kosong/terisi.

**Aksi:** **Tambah properti** membuka H-3; pilih properti membuka H-4.

**Keadaan kosong:** tampilkan ajakan menambahkan properti pertama.

**Acuan PRD:** [K-1](PRD.md#k-1), [K-2](PRD.md#k-2); [F-1](PRD.md#fitur-1), [F-5](PRD.md#fitur-5).

<a id="h-3"></a>

## H-3 — Tambah properti sewa

**Data masukan:** nama dan lokasi, keduanya wajib.

**Aksi dan hasil:** **Simpan** membuat properti tanpa unit dan membuka H-4 untuk menambahkan unit. **Batal** kembali ke H-2 tanpa membuat properti.

**Acuan PRD:** [K-1](PRD.md#k-1); [F-1](PRD.md#fitur-1).

<a id="h-4"></a>

## H-4 — Detail properti sewa

**Data tampil:** nama dan lokasi properti; jumlah unit kosong/terisi; daftar unit dengan nomor, harga standar, status, penghuni aktif, serta status pembayaran bulan berjalan. Riwayat pembayaran mencakup transaksi seluruh unit pada properti ini dengan salinan nomor unit, nama penghuni, periode, tarif, nominal, tanggal pembayaran, waktu pencatatan, dan status.

| Aksi | Masukan atau syarat | Hasil |
| --- | --- | --- |
| **Ubah properti** | Nama dan lokasi wajib | Data diperbarui; salinan pada transaksi lama tetap sama |
| **Hapus properti** | Seluruh unit belum memiliki masa sewa/pembayaran; konfirmasi | Properti dan unit kosongnya dihapus; kembali ke H-2 |
| **Tambah unit** | Nomor unik dalam properti dan harga standar bulanan lebih dari Rp 0 | Unit kosong dibuat; buka H-8 |
| **Buka unit** | Pilih unit | Buka H-8 |
| **Riwayat penghuni** | Properti yang dibuka | Buka H-5 |
| **Buka transaksi terkait** | Pilih catatan pembayaran | Buka H-8 pada masa sewa terkait |

**Keadaan kosong:** properti tanpa unit menampilkan **Tambah unit**; riwayat tanpa pembayaran menampilkan pesan kosong.

**Acuan PRD:** [K-1](PRD.md#k-1), [K-2](PRD.md#k-2), [K-3](PRD.md#k-3), [K-5](PRD.md#k-5); [F-1](PRD.md#fitur-1), [F-2](PRD.md#fitur-2), [F-5](PRD.md#fitur-5), [F-6](PRD.md#fitur-6), [F-7](PRD.md#fitur-7).

<a id="h-8"></a>

## H-8 — Detail unit sewa

**Tujuan:** melihat kondisi dan mengelola satu unit di dalam properti.

**Data tampil:** properti induk; nomor, harga standar, dan status unit; identitas penghuni aktif; tanggal masuk/keluar dan jatuh tempo masa sewa yang dipilih; tarif kesepakatan bulan berjalan atau bulan pilihan; status pencatatan pembayaran. Harga standar unit dan tarif kesepakatan diberi label terpisah.

### Masa sewa dan riwayat tarif

Riwayat unit menampilkan satu entri per masa sewa, dengan nama penghuni, status, tanggal masuk/keluar, dan akses ke H-10. Memilih entri mengubah konteks pengelolaan tarif dan pembayaran ke masa sewa tersebut.

Riwayat tarif untuk masa sewa pilihan menampilkan tarif, bulan/tahun mulai berlaku, dan catatan opsional. Tarif terjadwal yang belum berlaku ditandai; setelah masa sewa berakhir, entri setelah bulan keluar ditandai tidak digunakan. **Ubah tarif** menambahkan entri baru. Koreksi entri dilakukan melalui aksi tersendiri dengan penjelasan periode dan pembayaran yang terdampak.

### Riwayat pembayaran unit

Menampilkan seluruh pembayaran dari masa sewa aktif maupun lampau pada unit ini. Setiap catatan memuat salinan nama penghuni, bulan sewa, tarif periode, nominal, tanggal pembayaran sebenarnya, waktu pencatatan, dan status **Tercatat lunas** atau **Dibatalkan**.

Pembayaran yang dibatalkan tetap terlihat dan dikecualikan dari total. Riwayat tetap tersedia saat unit kosong atau ditempati orang lain. Bila belum ada transaksi, tampilkan **Belum ada catatan pembayaran untuk unit ini**.

### Aksi dan aturan unit

| Aksi | Masukan atau syarat | Hasil |
| --- | --- | --- |
| **Ubah nomor unit** | Nomor unik; unit belum memiliki masa sewa/pembayaran | Nomor diperbarui |
| **Ubah harga standar** | Harga bulanan berupa rupiah bulat lebih dari Rp 0 | Harga unit diperbarui; tarif masa sewa tetap sama |
| **Hapus unit** | Belum memiliki masa sewa/pembayaran; konfirmasi | Unit dihapus; kembali ke H-4 |
| **Mulai masa sewa** | Unit kosong; pilih penghuni atau buat identitas; tanggal masuk, jatuh tempo, tarif awal otomatis dari unit | Masa sewa dan tarif awal dibuat; unit terisi |
| **Buka penghuni** | Penghuni pada masa sewa terkait | Buka H-10 |
| **Koreksi masa sewa** | Pilih masa sewa dan perbaiki data sesuai F-3 | Entri diperbarui; transaksi lama tetap sama |
| **Ubah tarif** | Masa sewa pilihan, tarif baru, bulan mulai berlaku, catatan opsional | Tambah riwayat tarif tanpa menimpa tarif lama |
| **Koreksi entri tarif** | Entri pilihan; periksa dampak dan konfirmasi | Perhitungan periode yang belum dicatat diperbarui; transaksi lama tetap sama |
| **Akhiri masa sewa** | Masa sewa aktif; tanggal keluar sebenarnya dan konfirmasi | Unit kosong; riwayat tetap tersedia |
| **Catat pembayaran** | Masa sewa dan bulan yang valid; nominal otomatis dari tarif periode; tanggal pembayaran | Transaksi dibuat; periode **Tercatat lunas** |
| **Kembali ke properti** | Properti induk | Buka H-4 |

**Aturan:** validasi masa sewa dan tarif mengikuti [F-3](PRD.md#fitur-3). Tarif awal berlaku mulai bulan masuk; entri baru unik per bulan mulai berlaku dan dapat dijadwalkan. Perubahan tarif berlaku per bulan, dengan tarif penuh pada bulan masuk/keluar. Formulir pembayaran mengikuti [F-4](PRD.md#fitur-4): bulan berada dalam masa sewa sampai bulan berjalan, nominal penuh sama dengan tarif periode, tanggal pembayaran paling jauh hari ini, dan paling banyak satu transaksi yang belum dibatalkan per masa sewa/bulan. Waktu pencatatan otomatis.

**Keadaan halaman:** unit kosong menampilkan **Mulai masa sewa**; unit terisi menampilkan masa sewa aktif dan **Akhiri masa sewa**. Bila dibuka melalui H-5, H-6, atau H-10, tampilkan masa sewa yang dipilih walaupun penghuni aktif unit sudah berbeda. Setelah penyimpanan, perbarui bagian terkait tanpa kehilangan konteks masa sewa. Jika unit tidak ditemukan, tampilkan pesan dan tautan H-4. Jika belum ada penghuni, formulir mulai masa sewa menyediakan pembuatan identitas baru.

**Acuan PRD:** [K-1](PRD.md#k-1), [K-2](PRD.md#k-2), [K-3](PRD.md#k-3), [K-4](PRD.md#k-4), [K-5](PRD.md#k-5); [F-2](PRD.md#fitur-2), [F-3](PRD.md#fitur-3), [F-4](PRD.md#fitur-4), [F-6](PRD.md#fitur-6), [F-7](PRD.md#fitur-7).

<a id="h-5"></a>

## H-5 — Riwayat penghuni

**Data tampil:** satu entri per masa sewa pada properti yang dibuka, dengan nama penghuni, nomor unit, status **Aktif** atau **Sudah keluar**, tanggal masuk, dan tanggal keluar bila sudah berakhir. Penghuni yang menyewa beberapa kali memiliki entri terpisah.

**Aksi:** pilih masa sewa untuk membuka H-8 pada konteks terkait; buka identitas penghuni di H-10; kembali ke H-4.

**Keadaan kosong:** tampilkan pesan jika belum ada masa sewa. Riwayat tidak bergantung pada adanya pembayaran.

**Acuan PRD:** [K-3](PRD.md#k-3); [F-3](PRD.md#fitur-3), [F-7](PRD.md#fitur-7).

<a id="h-6"></a>

## H-6 — Keuangan

**Data tampil:** bulan sewa pilihan; total nominal pembayaran yang belum dibatalkan; daftar masa sewa yang **Belum dicatat lunas** pada bulan tersebut beserta tarif yang berlaku, termasuk masa sewa yang sudah berakhir. Riwayat transaksi memuat salinan properti, unit, penghuni, bulan sewa, tarif, nominal, tanggal pembayaran, waktu pencatatan, dan status.

**Aksi:** pilih bulan sampai bulan berjalan; buka H-8 pada masa sewa terkait untuk mencatat pembayaran; **Batalkan pembayaran** yang salah dengan konfirmasi. Pembatalan mempertahankan transaksi dalam riwayat, mengeluarkannya dari total, dan membuka periode untuk pencatatan ulang.

**Aturan:** total mengikuti bulan sewa, bukan tanggal pembayaran atau waktu pencatatan. Perubahan tarif lampau tidak mengubah transaksi yang sudah tercatat.

**Keadaan kosong:** tampilkan pesan jika belum ada pembayaran atau tidak ada masa sewa yang menunggu pencatatan pada bulan pilihan.

**Acuan PRD:** [K-4](PRD.md#k-4), [K-5](PRD.md#k-5); [F-3](PRD.md#fitur-3), [F-4](PRD.md#fitur-4), [F-5](PRD.md#fitur-5), [F-6](PRD.md#fitur-6).

<a id="h-9"></a>

## H-9 — Daftar penghuni

**Tujuan:** mengelola identitas seluruh penghuni dari menu **Penghuni** pada bar navigasi bawah.

**Data tampil:** satu entri per identitas dengan nama, telepon opsional, status **Aktif**, **Sudah keluar**, atau **Belum menyewa**, serta ringkasan properti/unit pada masa sewa aktif bila ada. Orang yang menyewa kembali tetap memiliki satu entri; seluruh masa sewanya tersedia di H-10.

**Filter:** properti dan status, masing-masing bernilai awal **Semua**. Filter properti mencocokkan seluruh riwayat masa sewa, termasuk yang sudah berakhir. Penghuni tanpa masa sewa ditampilkan saat properti bernilai **Semua**.

**Aksi:** **Tambah penghuni** membuka formulir nama wajib dan telepon opsional; tampilkan calon identitas serupa untuk dipilih tanpa menganggap nama sama sebagai orang yang sama. **Simpan** membuat identitas dan membuka H-10; **Batal** tidak membuat identitas. Pilih penghuni yang ada untuk membuka H-10; ubah atau kembalikan filter ke **Semua**.

**Keadaan halaman:** daftar kosong menyediakan **Tambah penghuni**. Jika filter tidak menemukan hasil, tampilkan pesan dan pilihan mengembalikan filter. Identitas tanpa masa sewa atau pembayaran tetap ditampilkan sesuai filter.

**Acuan PRD:** [K-3](PRD.md#k-3); [F-7](PRD.md#fitur-7).

<a id="h-10"></a>

## H-10 — Detail penghuni

**Tujuan:** mengelola identitas sekali dan menggunakannya pada setiap masa sewa.

**Data tampil:** nama, telepon opsional, status penghuni, dan seluruh masa sewa lintas properti. Setiap masa sewa memuat properti, unit, status, tanggal masuk/keluar, jatuh tempo, dan tarif kesepakatan yang berlaku pada bulan berjalan atau bulan keluar bila sudah berakhir.

| Aksi | Masukan atau syarat | Hasil |
| --- | --- | --- |
| **Ubah identitas** | Nama wajib, telepon opsional | Identitas diperbarui pada tampilan terkait; salinan transaksi lama tetap sama |
| **Mulai masa sewa** | Pilih properti dan unit kosong; tanggal masuk, jatuh tempo 1–28, tarif awal otomatis dari harga unit dan dapat disesuaikan | Masa sewa dibuat; buka H-8 pada masa sewa baru |
| **Buka masa sewa** | Pilih masa sewa aktif atau lampau | Buka H-8 pada konteks tersebut untuk tarif, koreksi, dan pembayaran |
| **Hapus penghuni** | Identitas belum memiliki masa sewa; konfirmasi | Identitas dihapus; kembali ke H-9 |
| **Kembali ke daftar** | — | Buka H-9 |

**Aturan:** formulir mulai masa sewa mengikuti [F-3](PRD.md#fitur-3). Tanggal keluar kosong ketika dibuat; tarif awal disimpan tersendiri mulai bulan masuk. Memilih unit lain memperbarui nilai awal tarif dan pengguna memeriksa ulang sebelum menyimpan. Pindah unit dilakukan dengan mengakhiri masa sewa lama melalui H-8, lalu memulai masa sewa baru memakai identitas ini.

**Keadaan halaman:** tanpa masa sewa, tampilkan **Mulai masa sewa**. Jika belum ada properti atau unit kosong, tampilkan pesan dan tautan ke H-2 untuk membuat properti atau menambah unit. Jika penghuni tidak ditemukan, tampilkan pesan dan tautan H-9. Penghuni dengan riwayat tetap dapat dibuka setelah seluruh masa sewanya berakhir.

**Acuan PRD:** [K-2](PRD.md#k-2), [K-3](PRD.md#k-3); [F-3](PRD.md#fitur-3), [F-7](PRD.md#fitur-7).

<a id="h-7"></a>

## H-7 — Lainnya

**Akses:** ikon **Lainnya** di kanan atas header.

**Data tampil:** penjelasan bahwa Rentora merupakan prototipe portofolio dan bahwa data contoh properti, penghuni, serta pembayaran dimuat pada kunjungan pertama. Data yang dimasukkan pengguna tetap tersimpan secara lokal di browser.

**Aksi:** pada lingkungan pengembangan, **Preview dokumen** membuka halaman PRD. Tidak ada aksi ekspor atau pemulihan data pada halaman ini.

**Keadaan halaman:** informasi prototipe selalu tersedia, termasuk saat belum ada properti.
