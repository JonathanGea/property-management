# PRD — Rentora MVP

Rentora adalah aplikasi pencatatan properti sewa untuk pemilik di Indonesia. Pemilik mengelola unit, penyewa aktif, daftar serta riwayat penghuni, dan pembayaran sewa bulanan secara manual.

Rincian data dan aksi tiap halaman ada di [Peta Halaman Rentora MVP](PAGES.md).

## Definisi

- **Properti sewa** adalah entitas utama dengan nama, lokasi, dan daftar unit sewa.
- **Unit sewa** adalah objek yang disewakan dalam satu properti, dengan nomor unik dan harga sewa standar bulanan. Status kosong atau terisi berasal dari masa sewa aktif.
- **Penghuni** adalah identitas orang yang menyewa, dengan nama dan nomor telepon opsional. Satu penghuni dapat memiliki beberapa masa sewa tanpa mengulang identitasnya.
- **Masa sewa** menghubungkan penghuni dengan unit, tanggal masuk/keluar, tanggal jatuh tempo, dan riwayat tarif kesepakatan. Istilah penyewa aktif merujuk pada penghuni dengan masa sewa yang belum berakhir.
- **Riwayat tarif** berisi tarif kesepakatan bulanan dan periode mulai berlaku pada suatu masa sewa.
- **Transaksi pembayaran** adalah catatan pelunasan satu periode bulan pada satu masa sewa, dengan tarif periode tersebut, nominal pembayaran, tanggal pembayaran sebenarnya, waktu pencatatan, dan status.

## Pengguna

**Pengguna utama: pemilik properti sewa.** Pemilik dapat mengelola satu atau beberapa properti dan ingin memantau kondisi unit serta sewa bulanan dari ponsel.

## Kebutuhan Pengguna

1. <a id="k-1"></a> **K-1 — Mencatat properti dan unit sewa.** Pemilik perlu menyimpan dan membetulkan daftar properti serta unit yang dikelola agar tidak bergantung pada catatan terpisah.
2. <a id="k-2"></a> **K-2 — Mengetahui ketersediaan unit.** Pemilik perlu melihat unit yang kosong atau terisi tanpa menghitungnya sendiri.
3. <a id="k-3"></a> **K-3 — Mencatat penyewa aktif dan riwayat penghuni.** Pemilik perlu menyimpan identitas penghuni sekali, menghubungkannya dengan masa sewa, menentukan tarif kesepakatan dan jatuh tempo, serta melihat perubahan tarif dan riwayat penyewaannya.
4. <a id="k-4"></a> **K-4 — Memantau pembayaran.** Pemilik perlu mengetahui periode sewa yang sudah atau belum dicatat lunas, termasuk periode lampau, dan dapat membetulkan salah input.
5. <a id="k-5"></a> **K-5 — Melihat ringkasan dan riwayat.** Pemilik perlu melihat kondisi seluruh properti, total pembayaran yang tercatat, dan riwayat pembayaran bulan sebelumnya.

## Daftar Fitur & Ruang Lingkup

### Dalam cakupan (in-scope)

| No. | Fitur | Kebutuhan pengguna | Halaman terkait |
| --- | --- | --- | --- |
| 1 | [Kelola properti sewa](#fitur-1) | [K-1](#k-1) | [Daftar properti sewa](PAGES.md#h-2), [Tambah properti sewa](PAGES.md#h-3), [Detail properti sewa](PAGES.md#h-4) |
| 2 | [Kelola unit sewa](#fitur-2) | [K-1](#k-1), [K-2](#k-2) | [Detail properti sewa](PAGES.md#h-4), [Detail unit sewa](PAGES.md#h-8) |
| 3 | [Kelola masa sewa dan riwayat tarif](#fitur-3) | [K-2](#k-2), [K-3](#k-3) | [Detail penghuni](PAGES.md#h-10), [Detail unit sewa](PAGES.md#h-8), [Riwayat penghuni](PAGES.md#h-5), [Keuangan](PAGES.md#h-6) |
| 4 | [Catat pembayaran bulanan](#fitur-4) | [K-4](#k-4), [K-5](#k-5) | [Detail unit sewa](PAGES.md#h-8), [Keuangan](PAGES.md#h-6) |
| 5 | [Dashboard dan ringkasan keuangan](#fitur-5) | [K-2](#k-2), [K-4](#k-4), [K-5](#k-5) | [Beranda](PAGES.md#h-1), [Daftar properti sewa](PAGES.md#h-2), [Detail properti sewa](PAGES.md#h-4), [Keuangan](PAGES.md#h-6) |
| 6 | [Riwayat pembayaran](#fitur-6) | [K-5](#k-5) | [Detail properti sewa](PAGES.md#h-4), [Detail unit sewa](PAGES.md#h-8), [Keuangan](PAGES.md#h-6) |
| 7 | [Kelola penghuni dan riwayat penyewaan](#fitur-7) | [K-3](#k-3) | [Daftar penghuni](PAGES.md#h-9), [Detail penghuni](PAGES.md#h-10), [Detail properti sewa](PAGES.md#h-4), [Riwayat penghuni](PAGES.md#h-5), [Detail unit sewa](PAGES.md#h-8) |

<a id="rencana-pengembangan"></a>

### Rencana pengembangan selanjutnya

- **Penyimpanan backend:** direncanakan untuk tahap setelah prototipe. Kebutuhan migrasi data lokal ke backend ditentukan pada tahap tersebut.
- **Spesifikasi fisik dan fasilitas unit:** pencatatan AC, luas atau dimensi unit, air panas, kamar mandi dalam/luar, furnitur, dan Wi-Fi. Direncanakan setelah MVP; tahap dan jadwal pengerjaan belum ditentukan.

### Di luar cakupan (out-of-scope)

Fitur berikut tidak dikerjakan sekarang dan belum ditetapkan sebagai rencana pengembangan selanjutnya.

- **Jenis properti lainnya:** dukungan untuk properti sewa selain kos, termasuk kontrakan.
- **Akun dan login:** pendaftaran akun dan autentikasi pengguna.
- **Akses staf dan penyewa:** penggunaan aplikasi oleh staf dan penyewa, termasuk akses staf dan portal penyewa.
- **Sinkronisasi dan cadangan otomatis:** sinkronisasi data antar perangkat serta pencadangan data secara otomatis.
- **Ekspor, impor, dan pemulihan data:** unduhan atau pemuatan berkas data secara manual tidak tersedia pada prototipe.
- **Penerimaan uang:** penerimaan uang pembayaran sewa oleh aplikasi.
- **Tagihan otomatis:** pembuatan tagihan sewa secara otomatis.
- **Pembayaran online:** pembayaran sewa secara online, termasuk melalui QRIS.
- **Diskon transaksi dan prorata:** potongan khusus saat pembayaran dan perhitungan tarif berdasarkan sebagian bulan. Tarif kesepakatan yang berbeda dari harga standar tetap dapat ditentukan pada masa sewa.
- **Pembayaran sebagian:** pencatatan pembayaran yang belum melunasi seluruh nominal sewa bulanan.
- **Pengingat WhatsApp:** pengiriman pengingat pembayaran melalui WhatsApp.
- **Deposit:** pencatatan uang jaminan sewa.
- **Biaya listrik dan air:** pencatatan biaya listrik dan air di luar sewa bulanan.
- **Laporan kerusakan:** pencatatan laporan kerusakan pada properti atau unit sewa.
- **Pencarian kos:** pencarian kos oleh calon penyewa.
- **Identitas dan dokumen penyewa:** pengumpulan nomor identitas, foto KTP, dan dokumen kontrak.
- **Kontak darurat:** pencatatan kontak yang dapat dihubungi dalam keadaan darurat.

## Hubungan Data dan Alur Utama

Properti memiliki unit. Penghuni memiliki masa sewa yang menunjuk satu unit; setiap masa sewa memiliki riwayat tarif dan transaksi pembayaran sendiri. Identitas penghuni digunakan kembali saat menyewa kembali atau pindah unit.

1. Buat properti dengan nama dan lokasi.
2. Tambahkan unit dengan nomor dan harga sewa standar.
3. Buat identitas penghuni atau pilih penghuni yang sudah tercatat.
4. Mulai masa sewa pada unit kosong: isi tanggal masuk dan jatuh tempo; tarif awal otomatis dari harga unit, lalu dapat disesuaikan sebagai kesepakatan.
5. Catat pembayaran berdasarkan bulan sewa; nominal mengikuti tarif yang berlaku pada bulan tersebut.
6. Bila tarif berubah, tambahkan tarif beserta bulan mulai berlaku. Perubahan harga standar unit tidak mengubah kesepakatan masa sewa yang sudah ada.
7. Akhiri masa sewa dengan tanggal keluar sebenarnya. Unit kembali kosong; identitas, masa sewa, tarif, dan pembayaran tetap tersedia.

## Rincian Fitur

<a id="fitur-1"></a>

### Fitur 1 — Kelola properti sewa [K-1](#k-1)

Pemilik dapat melihat daftar properti, menambahkan properti dengan nama dan lokasi, serta mengubah informasi tersebut. Unit ditambahkan setelah properti tersimpan melalui detail properti.

**Alur Pengguna (User Flow)**

1. Buka **Properti**, lalu **Tambah properti**.
2. Isi nama dan lokasi, lalu simpan.
3. Buka detail properti untuk menambahkan unit atau mengubah informasi properti.
4. Hapus properti yang belum memiliki masa sewa atau pembayaran setelah konfirmasi.

**Kriteria selesai:** nama dan lokasi wajib diisi; properti baru belum memiliki unit; properti dan unit kosongnya hanya dapat dihapus bila seluruh unit belum memiliki riwayat masa sewa atau pembayaran.

<a id="fitur-2"></a>

### Fitur 2 — Kelola unit sewa [K-1](#k-1), [K-2](#k-2)

Setiap unit memiliki nomor dan harga sewa standar per bulan. Harga standar menjadi nilai awal saat membuat masa sewa; perubahan harga unit hanya memengaruhi nilai awal untuk masa sewa baru.

**Alur Pengguna (User Flow)**

1. Buka detail properti, lalu **Tambah unit**.
2. Isi nomor unit dan harga sewa standar, lalu simpan; unit berstatus kosong.
3. Buka detail unit untuk melihat harga standar, penghuni aktif, masa sewa, serta riwayat pembayaran.
4. Pilih **Ubah harga standar** bila harga untuk penyewaan baru berubah.
5. Ubah nomor atau hapus unit yang belum memiliki riwayat setelah konfirmasi penghapusan.

**Kriteria selesai:** nomor wajib diisi dan unik dalam properti; harga berupa rupiah bulat lebih dari Rp 0; satu unit hanya memiliki satu masa sewa aktif; perubahan harga standar tidak mengubah tarif kesepakatan atau transaksi; unit dengan riwayat tidak dapat dihapus atau diganti nomornya.

<a id="fitur-3"></a>

### Fitur 3 — Kelola masa sewa dan riwayat tarif [K-2](#k-2), [K-3](#k-3)

Masa sewa menyimpan hubungan penghuni dan unit, tanggal masuk, tanggal keluar opsional, jatuh tempo, serta riwayat tarif kesepakatan. Tarif awal disalin dari harga standar unit saat formulir dibuat dan dapat disesuaikan sebelum penyimpanan. Setelah tersimpan, tarif kesepakatan berdiri sendiri.

**Alur Pengguna (User Flow)**

1. Dari detail penghuni, pilih **Mulai masa sewa**, lalu pilih properti dan unit kosong. Dari detail unit kosong, aksi yang sama sudah memilih properti dan unit; pilih penghuni yang ada atau tambahkan identitas baru.
2. Isi tanggal masuk dan jatuh tempo, periksa tarif awal, lalu simpan. Tanggal keluar kosong; unit menjadi terisi.
3. Pilih **Ubah tarif** pada masa sewa terkait, isi tarif baru, bulan/tahun mulai berlaku, dan catatan opsional.
4. Koreksi data masa sewa atau entri tarif yang salah tanpa membuat masa sewa baru; tampilkan periode dan pembayaran yang terdampak sebelum konfirmasi.
5. Pilih **Akhiri masa sewa**, isi tanggal keluar sebenarnya, lalu konfirmasi. Untuk pindah unit, akhiri masa sewa lama dan buat masa sewa baru dengan identitas penghuni yang sama.

**Aturan masa sewa**

- Tanggal masuk tidak melewati hari ini. Tanggal keluar wajib saat mengakhiri masa sewa, tidak mendahului tanggal masuk, dan tidak melewati hari ini.
- Masa sewa dalam unit yang sama tidak bertumpang tindih; unit tujuan harus kosong saat memulai masa sewa.
- Jatuh tempo berupa tanggal 1–28 dalam bulan sewa. Tarif berupa rupiah bulat lebih dari Rp 0.
- Koreksi tanggal harus menjaga seluruh periode pembayaran tetap berada dalam masa sewa. Penghuni dan unit pada masa sewa yang sudah memiliki pembayaran tidak dapat diganti; tanggal dan jatuh tempo dapat dikoreksi sesuai validasi.

**Aturan riwayat tarif**

- Tarif awal berlaku mulai bulan tanggal masuk. Untuk suatu bulan sewa, gunakan entri dengan periode mulai berlaku paling akhir yang tidak melewati bulan tersebut.
- Koreksi tanggal masuk atau periode tarif awal harus tetap menyediakan tarif mulai bulan masuk; formulir menolak perubahan yang meninggalkan bulan sewa tanpa tarif.
- Satu masa sewa hanya memiliki satu entri tarif untuk setiap bulan mulai berlaku. Tarif baru dapat dijadwalkan untuk bulan mendatang pada masa sewa aktif.
- Periode mulai berlaku tidak mendahului bulan masuk. Untuk masa sewa yang sudah berakhir, periode tersebut tidak melewati bulan keluar.
- Perubahan berlaku per bulan; bulan masuk dan keluar menggunakan tarif penuh. Tarif baru tidak menimpa entri tarif sebelumnya.
- Koreksi tarif lampau memengaruhi nominal awal pembayaran yang belum dicatat. Transaksi yang sudah tercatat tetap menyimpan tarif dan nominal sebelumnya; koreksi transaksi dilakukan melalui pembatalan dan pencatatan ulang.
- Saat masa sewa diakhiri, tarif terjadwal setelah bulan keluar tetap disimpan sebagai riwayat dan tidak digunakan untuk pembayaran masa sewa tersebut.

**Kriteria selesai:** perubahan harga standar dan tarif kesepakatan terpisah; setiap bulan dalam masa sewa memperoleh tepat satu tarif; riwayat tarif, masa sewa, dan pembayaran tetap tersedia setelah penghuni keluar atau pindah unit.

<a id="fitur-4"></a>

### Fitur 4 — Catat pembayaran bulanan [K-4](#k-4), [K-5](#k-5)

Pemilik mencatat pelunasan secara manual untuk satu bulan sewa dalam suatu masa sewa, paling jauh bulan berjalan. Periode lampau dapat dicatat setelah penghuni keluar. Nominal otomatis mengikuti tarif kesepakatan yang berlaku pada bulan sewa terpilih.

**Alur Pengguna (User Flow)**

1. Buka masa sewa pada detail unit, langsung atau melalui detail penghuni, riwayat penghuni, maupun Keuangan.
2. Pilih bulan sewa yang belum dicatat lunas; aplikasi menampilkan tarif periode dan nominal penuh yang sama dengan tarif tersebut.
3. Isi tanggal pembayaran sebenarnya, dengan nilai awal hari ini; periksa lalu pilih **Catat pembayaran**. Waktu pencatatan diisi otomatis.
4. Jika salah, batalkan dengan konfirmasi, lalu catat ulang bila diperlukan.

**Kriteria selesai:** periode beririsan dengan masa sewa dan tidak melewati bulan berjalan; satu masa sewa memiliki paling banyak satu pembayaran yang belum dibatalkan per bulan; nominal sama dengan tarif periode dan tidak dapat diganti langsung pada formulir pembayaran; koreksi kesepakatan dilakukan pada riwayat tarif; tanggal pembayaran wajib dan tidak melewati hari ini, terpisah dari periode sewa dan waktu pencatatan; catatan yang dibatalkan tetap tersimpan tetapi tidak dihitung dalam total; pembatalan membuat periode kembali **Belum dicatat lunas**.

<a id="fitur-5"></a>

### Fitur 5 — Dashboard dan ringkasan keuangan [K-2](#k-2), [K-4](#k-4), [K-5](#k-5)

Beranda menampilkan jumlah properti, unit kosong/terisi, tingkat okupansi, dan unit terisi yang **Belum dicatat lunas** untuk bulan berjalan. Keuangan menampilkan total pembayaran untuk bulan sewa pilihan dan semua masa sewa pada bulan tersebut yang **Belum dicatat lunas**, termasuk masa sewa yang sudah berakhir.

**Alur Pengguna (User Flow)**

1. Buka Beranda untuk kondisi saat ini atau Keuangan untuk memilih bulan sewa.
2. Lihat ringkasan dan masa sewa yang perlu ditindaklanjuti.
3. Buka detail unit pada masa sewa terkait untuk mencatat pembayaran.

**Kriteria selesai:** angka mengikuti data pengguna; okupansi berasal dari masa sewa aktif; total dihitung dari nominal transaksi yang belum dibatalkan berdasarkan bulan sewa, terlepas dari tanggal pembayaran; label **Belum dicatat lunas** menjelaskan keadaan pencatatan dalam aplikasi.

<a id="fitur-6"></a>

### Fitur 6 — Riwayat pembayaran [K-5](#k-5)

Setiap transaksi terhubung ke masa sewa dan menyimpan salinan nama properti, nomor unit, nama penghuni, bulan sewa, tarif periode, nominal pembayaran, tanggal pembayaran sebenarnya, waktu pencatatan, serta status **Tercatat lunas** atau **Dibatalkan**. Perubahan identitas, properti, harga unit, atau riwayat tarif tidak mengubah salinan pada transaksi lama.

**Alur Pengguna (User Flow)**

1. Buka Keuangan untuk seluruh pembayaran, detail properti untuk pembayaran properti tersebut, atau detail unit untuk pembayaran seluruh masa sewanya.
2. Lihat periode, tarif, nominal, tanggal pembayaran, waktu pencatatan, dan status.
3. Buka masa sewa terkait; pembayaran penghuni lama tetap tersedia setelah unit ditempati penghuni baru.

**Kriteria selesai:** cakupan riwayat sesuai halaman; catatan yang dibatalkan tetap terlihat dan dikecualikan dari total; transaksi pengganti dapat dicatat untuk periode yang sama; seluruh salinan data transaksi lama tetap tersimpan.

<a id="fitur-7"></a>

### Fitur 7 — Kelola penghuni dan riwayat penyewaan [K-3](#k-3)

Identitas penghuni disimpan terpisah dari masa sewa. Daftar penghuni memuat satu entri per identitas, termasuk yang belum pernah menyewa, penghuni aktif, dan mantan penghuni. Status **Aktif** berarti memiliki sedikitnya satu masa sewa aktif; **Sudah keluar** berarti pernah menyewa dan seluruh masa sewanya berakhir; **Belum menyewa** berarti belum memiliki masa sewa.

Detail penghuni memuat identitas dan seluruh masa sewanya lintas properti. Riwayat penghuni pada detail properti memuat satu entri per masa sewa dalam properti tersebut; detail unit memuat masa sewa pada unit itu. Orang yang menyewa kembali memakai identitas yang sama dengan masa sewa baru.

**Alur Pengguna (User Flow)**

1. Pilih **Penghuni** pada bar navigasi bawah untuk membuka daftar penghuni; filter properti dan status, dengan nilai awal **Semua**.
2. Pilih **Tambah penghuni**, isi nama dan telepon opsional, lalu simpan. Identitas tersimpan meskipun belum memulai masa sewa.
3. Pilih penghuni untuk membuka detail penghuni; ubah identitas, mulai masa sewa, atau pilih masa sewa menuju detail unit.
4. Untuk konteks satu properti, buka detail properti lalu **Riwayat penghuni**; pilih entri menuju unit dan masa sewa terkait.

**Kriteria selesai:** nama wajib, telepon opsional; nama yang sama tidak otomatis dianggap orang yang sama; tampilkan calon identitas yang serupa sebelum membuat penghuni baru agar pengguna dapat memilih identitas yang sudah ada; perubahan identitas muncul pada daftar dan masa sewa terkait tanpa mengubah transaksi lama; filter properti mencocokkan seluruh riwayat masa sewa penghuni; identitas tanpa masa sewa tidak muncul pada filter properti tertentu; penghuni dengan riwayat tidak dapat dihapus, sedangkan identitas yang belum memiliki masa sewa dapat dihapus setelah konfirmasi; riwayat tetap terlihat tanpa pembayaran.

## Batasan MVP dan Hal yang Perlu Diuji

Perubahan data tersimpan otomatis di browser yang digunakan dan tetap tersedia setelah halaman dimuat ulang. Pada kunjungan pertama, prototipe memuat data contoh properti, penghuni, dan pembayaran; data yang sudah tersimpan tidak ditimpa. Menghapus data browser atau kehilangan perangkat dapat menghilangkan data lokal. Alur utama harus dapat digunakan pada layar ponsel selebar 320 px.

Sebelum memperluas fitur, uji bersama calon pengguna: kemudahan membuat properti dan unit sebelum memasukkan penghuni, penggunaan ulang identitas, perubahan tarif per bulan, dan pencatatan di satu perangkat.
