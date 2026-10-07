# PRD — Rentora MVP

Rentora adalah aplikasi pencatatan properti sewa untuk pemilik di Indonesia. Pemilik mengelola unit, penyewa aktif, daftar serta riwayat penghuni, dan pembayaran sewa bulanan secara manual.

Rincian data dan aksi tiap halaman ada di [Peta Halaman Rentora MVP](PAGES.md).

## Definisi

- **Properti sewa** adalah entitas utama yang dikelola pemilik, dengan nama, lokasi, dan daftar unit sewa.
- **Unit sewa** adalah objek yang disewakan di dalam satu properti. Setiap unit memiliki nomor dan berstatus kosong atau terisi berdasarkan ada atau tidaknya penyewa aktif.

## Pengguna

**Pengguna utama: pemilik properti sewa.** Pemilik dapat mengelola satu atau beberapa properti dan ingin memantau kondisi unit serta sewa bulanan dari ponsel.

## Kebutuhan Pengguna

1. <a id="k-1"></a> **K-1 — Mencatat properti dan unit sewa.** Pemilik perlu menyimpan dan membetulkan daftar properti serta unit yang dikelola agar tidak bergantung pada catatan terpisah.
2. <a id="k-2"></a> **K-2 — Mengetahui ketersediaan unit.** Pemilik perlu melihat unit yang kosong atau terisi tanpa menghitungnya sendiri.
3. <a id="k-3"></a> **K-3 — Mencatat penyewa aktif dan riwayat penghuni.** Pemilik perlu mengetahui siapa yang menempati unit, tarif bulanannya, tanggal jatuh temponya, serta melihat seluruh penghuni aktif dan mantan penghuni lintas properti maupun riwayat pada satu properti.
4. <a id="k-4"></a> **K-4 — Memantau pembayaran.** Pemilik perlu mengetahui periode sewa yang sudah atau belum dicatat lunas, termasuk periode lampau, dan dapat membetulkan salah input.
5. <a id="k-5"></a> **K-5 — Melihat ringkasan dan riwayat.** Pemilik perlu melihat kondisi seluruh properti, total pembayaran yang tercatat, dan riwayat pembayaran bulan sebelumnya.
6. <a id="k-6"></a> **K-6 — Menjaga salinan data.** Pemilik perlu mempertahankan data saat halaman dimuat ulang dan dapat mengunduh salinannya.

## Daftar Fitur & Ruang Lingkup

### Dalam cakupan (in-scope)

| No. | Fitur | Kebutuhan pengguna | Halaman terkait |
| --- | --- | --- | --- |
| 1 | [Kelola properti sewa](#fitur-1) | [K-1](#k-1) | [Daftar properti sewa](PAGES.md#h-2), [Tambah properti sewa](PAGES.md#h-3), [Detail properti sewa](PAGES.md#h-4) |
| 2 | [Kelola unit sewa](#fitur-2) | [K-1](#k-1), [K-2](#k-2) | [Detail properti sewa](PAGES.md#h-4), [Detail unit sewa](PAGES.md#h-8) |
| 3 | [Kelola masa huni penyewa](#fitur-3) | [K-2](#k-2), [K-3](#k-3) | [Detail unit sewa](PAGES.md#h-8), [Riwayat penghuni](PAGES.md#h-5) |
| 4 | [Catat pembayaran bulanan](#fitur-4) | [K-4](#k-4), [K-5](#k-5) | [Detail unit sewa](PAGES.md#h-8), [Keuangan](PAGES.md#h-6) |
| 5 | [Dashboard dan ringkasan keuangan](#fitur-5) | [K-2](#k-2), [K-4](#k-4), [K-5](#k-5) | [Beranda](PAGES.md#h-1), [Keuangan](PAGES.md#h-6) |
| 6 | [Riwayat pembayaran](#fitur-6) | [K-5](#k-5) | [Detail properti sewa](PAGES.md#h-4), [Detail unit sewa](PAGES.md#h-8), [Keuangan](PAGES.md#h-6) |
| 7 | [Daftar dan riwayat penghuni](#fitur-7) | [K-3](#k-3) | [Daftar penghuni](PAGES.md#h-9), [Riwayat penghuni](PAGES.md#h-5), [Detail unit sewa](PAGES.md#h-8) |
| 8 | [Penyimpanan lokal dan ekspor data](#fitur-8) | [K-6](#k-6) | [Lainnya](PAGES.md#h-7) |

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
- **Impor dan pemulihan data:** impor cadangan JSON dan pemulihan data dari berkas pada prototipe.
- **Penerimaan uang:** penerimaan uang pembayaran sewa oleh aplikasi.
- **Tagihan otomatis:** pembuatan tagihan sewa secara otomatis.
- **Pembayaran online:** pembayaran sewa secara online, termasuk melalui QRIS.
- **Pembayaran sebagian:** pencatatan pembayaran yang belum melunasi seluruh nominal sewa bulanan.
- **Pengingat WhatsApp:** pengiriman pengingat pembayaran melalui WhatsApp.
- **Deposit:** pencatatan uang jaminan sewa.
- **Biaya listrik dan air:** pencatatan biaya listrik dan air di luar sewa bulanan.
- **Laporan kerusakan:** pencatatan laporan kerusakan pada properti atau unit sewa.
- **Pencarian kos:** pencarian kos oleh calon penyewa.
- **Identitas dan dokumen penyewa:** pengumpulan nomor identitas, foto KTP, dan dokumen kontrak.
- **Kontak darurat:** pencatatan kontak yang dapat dihubungi dalam keadaan darurat.

## Rincian Fitur

<a id="fitur-1"></a>

### Fitur 1 — Kelola properti sewa [K-1](#k-1)

Pemilik dapat melihat daftar kos, menambah kos dengan nama, lokasi, dan jumlah kamar awal, serta mengubah nama atau lokasi kos. Kos yang belum pernah memiliki penghuni atau pembayaran dapat dihapus setelah konfirmasi; kos yang memiliki riwayat tetap disimpan.

**Alur Pengguna (User Flow)**

1. Pemilik membuka daftar properti sewa dan memilih **Tambah properti**.
2. Pemilik mengisi nama, lokasi, dan jumlah kamar awal, lalu menyimpan.
3. Kos baru muncul pada daftar dan dapat dibuka untuk melihat kamarnya.
4. Bila perlu, pemilik membuka detail kos, mengubah nama atau lokasi, lalu menyimpan perubahan.
5. Pemilik dapat menghapus kos yang belum memiliki riwayat setelah mengonfirmasi penghapusan.

**Kriteria selesai:** kos dan jumlah kamar awal sesuai input; perubahan tersimpan tanpa data contoh; kos yang memiliki riwayat penghuni atau pembayaran tidak dapat dihapus.

<a id="fitur-2"></a>

### Fitur 2 — Kelola unit sewa [K-1](#k-1), [K-2](#k-2)

Kamar awal dibuat saat kos ditambahkan. Pemilik dapat menambah kamar, membetulkan nomor kamar, dan melihat status kosong atau terisi. Nomor kamar harus unik di dalam satu kos. Kamar yang belum pernah memiliki penghuni atau pembayaran dapat dihapus setelah konfirmasi.

**Alur Pengguna (User Flow)**

1. Pemilik membuka detail properti dan melihat daftar kamar.
2. Pemilik memilih **Tambah unit** bila membutuhkan kamar baru.
3. Kamar baru muncul dengan status kosong; status berubah menjadi terisi setelah ada penyewa aktif.
4. Pemilik memilih unit dalam daftar untuk membuka **Detail unit sewa** dan melihat nomor, status, penyewa aktif, serta riwayat unit tersebut.
5. Dari detail unit, pemilik dapat membetulkan nomor atau menghapus kamar yang belum memiliki riwayat.

**Kriteria selesai:** satu kamar memiliki satu status yang berasal dari data penyewa aktif; nomor kamar tidak berulang dalam satu kos; jumlah kamar pada ringkasan sesuai daftar kamar; kamar yang memiliki riwayat tidak dapat dihapus atau diganti nomornya.

<a id="fitur-3"></a>

### Fitur 3 — Kelola masa huni penyewa [K-2](#k-2), [K-3](#k-3)

Pemilik dapat mengisi nama penyewa, nomor telepon opsional, tarif sewa bulanan, tanggal jatuh tempo, dan tanggal mulai menempati untuk kamar kosong. Tanggal keluar kosong saat penyewa masih aktif dan diisi ketika masa huni berakhir. Satu kamar hanya dapat memiliki satu penyewa aktif. Data masa huni dapat dikoreksi tanpa membuat riwayat penghuni baru; koreksi tidak mengubah catatan pembayaran yang sudah dibuat.

**Alur Pengguna (User Flow)**

1. Pemilik membuka **Detail unit sewa** untuk kamar kosong, lalu mengisi data penyewa serta tanggal mulai menempati.
2. Pemilik menyimpan data; kamar menjadi terisi.
3. Bila ada kesalahan data, pemilik membuka masa huni terkait dan menyimpan koreksi. Perubahan tarif hanya berlaku untuk pencatatan pembayaran berikutnya.
4. Saat penyewa keluar, pemilik memilih **Akhiri masa huni**, mengisi tanggal keluar yang sebenarnya, dan mengonfirmasi.
5. Kamar kembali kosong, sedangkan riwayat penghuni dan pembayaran lama tetap tersedia.

**Kriteria selesai:** tarif berupa rupiah bulat lebih dari Rp 0; tanggal jatuh tempo dibatasi 1–28; tanggal mulai tidak melewati hari ini; tanggal keluar boleh kosong untuk masa huni aktif, tetapi wajib diisi saat kamar dikosongkan dan tidak boleh mendahului tanggal mulai atau melewati hari ini; masa huni pada kamar yang sama tidak bertumpang tindih; koreksi tanggal tidak boleh menempatkan pembayaran yang sudah dicatat di luar masa huni; mengosongkan kamar tidak menghapus riwayat penghuni atau pembayaran.

<a id="fitur-4"></a>

### Fitur 4 — Catat pembayaran bulanan [K-4](#k-4), [K-5](#k-5)

Pemilik mencatat pembayaran lunas secara manual untuk bulan sewa yang berada dalam masa huni, paling jauh bulan kalender berjalan. Periode yang lampau tetap dapat dicatat, termasuk setelah penyewa keluar. Bulan ketika penyewa masuk atau keluar memakai tarif bulanan penuh tanpa perhitungan prorata. Aplikasi mencegah pencatatan ganda dan menyediakan pembatalan bila terjadi salah input.

**Alur Pengguna (User Flow)**

1. Pemilik membuka masa huni penyewa pada **Detail unit sewa**, langsung dari daftar unit atau melalui daftar penghuni, riwayat penghuni, maupun halaman Keuangan.
2. Pemilik memilih periode bulan yang berada dalam masa huni dan belum dicatat lunas. Periode tidak boleh melewati bulan berjalan.
3. Nominal awal mengikuti tarif terakhir yang tersimpan pada masa huni terpilih; bila mencatat periode lama setelah tarif berubah, pemilik dapat menyesuaikan nominal penuh untuk periode tersebut sebelum menyimpan.
4. Pemilik memilih **Catat pembayaran**; status periode itu menjadi **Tercatat lunas**.
5. Bila salah input, pemilik membatalkan catatan dengan konfirmasi; status periode kembali **Belum dicatat lunas** dan periode itu dapat dicatat ulang.

**Kriteria selesai:** hanya bulan yang beririsan dengan masa huni yang dapat dipilih, dengan batas akhir bulan berjalan untuk masa huni aktif atau bulan tanggal keluar untuk masa huni yang berakhir; satu masa huni pada satu kamar memiliki paling banyak satu catatan pembayaran yang belum dibatalkan untuk periode yang sama; nominal berupa rupiah bulat lebih dari Rp 0 dan merepresentasikan pembayaran lunas, bukan pembayaran sebagian; catatan yang dibatalkan tetap tersimpan untuk riwayat tetapi tidak dihitung dalam total.

<a id="fitur-5"></a>

### Fitur 5 — Dashboard dan ringkasan keuangan [K-2](#k-2), [K-4](#k-4), [K-5](#k-5)

Dashboard menampilkan jumlah properti, unit kosong dan terisi, tingkat okupansi, serta unit terisi yang **Belum dicatat lunas** untuk bulan berjalan. Halaman Keuangan menampilkan total pembayaran yang tercatat untuk periode sewa yang dipilih dan daftar masa huni dalam periode itu yang **Belum dicatat lunas**, termasuk mantan penyewa bila periode pilihannya berada dalam masa huni mereka.

**Alur Pengguna (User Flow)**

1. Pemilik membuka dashboard untuk melihat kondisi saat ini atau halaman Keuangan untuk memilih periode bulan sewa.
2. Pemilik melihat ringkasan dan masa huni yang perlu ditindaklanjuti pada periode tersebut.
3. Pemilik membuka detail unit dan masa huni terkait untuk mencatat pembayaran.

**Kriteria selesai:** angka berubah mengikuti data yang dimasukkan; total periode sewa dihitung dari nominal catatan pembayaran pada periode terpilih yang belum dibatalkan, bukan angka contoh; label **Belum dicatat lunas** tidak menyatakan bahwa penyewa pasti belum membayar di luar aplikasi.

<a id="fitur-6"></a>

### Fitur 6 — Riwayat pembayaran [K-5](#k-5)

Setiap catatan pembayaran memuat kos, nomor kamar, nama penyewa saat pembayaran dicatat, periode sewa, nominal, waktu pencatatan, dan status **Tercatat lunas** atau **Dibatalkan**. Perubahan data penyewa atau tarif berikutnya tidak mengubah isi catatan lama.

Pada **Detail unit sewa**, riwayat pembayaran mencakup seluruh masa huni pada unit tersebut, termasuk penyewa aktif, mantan penyewa, dan catatan yang dibatalkan. Riwayat tetap tersedia ketika unit kosong atau ditempati penyewa baru.

**Alur Pengguna (User Flow)**

1. Pemilik membuka halaman Keuangan, detail properti, atau detail unit untuk melihat riwayat pembayaran sesuai konteksnya.
2. Pemilik melihat pembayaran yang pernah dicatat beserta periode, nominal, dan statusnya.
3. Setelah penyewa keluar, pemilik masih dapat melihat catatan pembayaran lama.

**Kriteria selesai:** riwayat lama tetap tersedia setelah kamar dikosongkan; catatan yang dibatalkan tetap terlihat dengan statusnya tetapi tidak menambah total pembayaran tercatat; pembayaran pengganti dapat dicatat untuk periode yang sama.

<a id="fitur-7"></a>

### Fitur 7 — Daftar dan riwayat penghuni [K-3](#k-3)

Pemilik dapat melihat **Daftar penghuni** lintas seluruh properti, mencakup penghuni aktif dan mantan penghuni. Setiap entri mewakili satu masa huni dan menampilkan nama penyewa, properti, unit, status **Aktif** atau **Sudah keluar**, tanggal mulai, dan tanggal keluar bila masa huni telah berakhir. Orang yang menyewa beberapa kali tetap memiliki entri masa huni terpisah. Daftar dapat disaring menurut properti dan status; awalnya semua properti dan kedua status ditampilkan.

**Riwayat penghuni** pada detail properti menampilkan masa huni hanya untuk properti tersebut. Detail unit menampilkan masa huni hanya untuk unit terkait. Seluruh tampilan menggunakan data masa huni yang sama dan tetap tersedia terlepas dari ada atau tidaknya catatan pembayaran.

**Alur Pengguna (User Flow)**

1. Pemilik memilih **Penghuni** pada bar navigasi bawah untuk membuka **Daftar penghuni**.
2. Pemilik melihat seluruh masa huni lintas properti dan dapat menyaring daftar menurut properti atau status.
3. Untuk konteks satu properti, pemilik membuka detail properti dan memilih **Riwayat penghuni**.
4. Dari kedua daftar tersebut, pemilik dapat membuka entri menuju detail unit dan masa huni terkait untuk membetulkan data atau mencatat pembayaran periode lampau.
5. Setelah unit dikosongkan dan ditempati penyewa baru, entri penyewa lama tetap terlihat dengan tanggal keluar dan status **Sudah keluar**.

**Kriteria selesai:** daftar global mencakup seluruh masa huni dari semua properti; filter properti dan status dapat dipakai bersamaan; status **Aktif** berasal dari tanggal keluar yang kosong dan **Sudah keluar** dari tanggal keluar yang terisi; daftar per properti dan per unit hanya menampilkan masa huni terkait; memilih entri membuka unit dan masa huni yang tepat; mengakhiri masa huni tidak menghapus entrinya; penghuni tetap terlihat meskipun tidak memiliki catatan pembayaran.

<a id="fitur-8"></a>

### Fitur 8 — Penyimpanan lokal dan ekspor data [K-6](#k-6)

Data disimpan di browser yang sama. Pemilik dapat mengunduh salinan JSON yang mencakup kos, kamar, seluruh masa huni, serta catatan pembayaran termasuk yang dibatalkan.

**Alur Pengguna (User Flow)**

1. Pemilik memilih ikon **Lainnya** di kanan atas header untuk membuka halaman **Lainnya**, lalu memilih **Ekspor data**.
2. Aplikasi mengunduh berkas JSON berisi data yang tersimpan saat itu.

**Kriteria selesai:** data tetap ada setelah halaman dimuat ulang pada browser yang sama; berkas ekspor memuat seluruh kos, kamar, riwayat penghuni, dan catatan pembayaran beserta statusnya.

## Batasan MVP dan Hal yang Perlu Diuji

Data tersimpan di browser/perangkat yang digunakan. Menghapus data browser atau kehilangan perangkat dapat menghilangkan data lokal. Alur utama harus dapat digunakan pada layar ponsel selebar 320 px.

Sebelum memperluas fitur, uji bersama calon pengguna: apakah mereka lebih sering mengelola satu atau beberapa kos, apakah sewa selalu bulanan, apakah pembayaran sebagian umum terjadi, dan apakah pencatatan di satu perangkat cukup untuk uji awal.
