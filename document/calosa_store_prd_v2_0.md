# PRODUCT REQUIREMENT DOCUMENT (PRD)
## Calosa Laptop & Gadget Store — Web Catalog & Comparison Experience

| Elemen | Deskripsi |
| :--- | :--- |
| **Status** | Final Baseline (Siap Implementasi Frontend) |
| **Versi** | v2.0 |
| **Tanggal** | 21 November 2026 |
| **Platform & Orientasi** | Website (**Desktop-First**, optimal pada resolusi $\ge 1280\text{px}$) |
| **Arsitektur Implementasi** | Aplikasi Frontend Mandiri (*Client-Side Web App*) dengan *Dummy Data* terstruktur (Tanpa Backend/Database nyata) |
| **Dasar Penyusunan** | UX Design Workbook (Worksheet 1–8), Data Kuesioner 5 Responden (R1–R5), & Klarifikasi Teknis |

---

## 1. CONTEXT AND GOALS

### 1.1 Overview
Calosa Laptop & Gadget Store adalah aplikasi katalog web yang dirancang untuk memudahkan calon pembeli menelusuri, menyaring, memeriksa detail teknis, dan membandingkan produk komputer maupun gadget. Revisi v2.0 ini menghilangkan ambiguitas interaksi pada v1.0 dan menetapkan aturan teknis yang siap langsung diterjemahkan ke dalam kode antarmuka (*vibe coding*).

### 1.2 Problem Statement
Berdasarkan audit heuristik (Worksheet 1) dan pengujian 5 responden (R1–R5), pengguna mengalami hambatan utama pada tahap evaluasi produk (*Moment of Truth: During*):
1. **Navigasi & Pencarian Membingungkan:** Terdapat duplikasi kotak pencarian (*search bar*), ikon navigasi "Shop" yang rusak/tidak responsif, perubahan menu *header* yang tidak konsisten, serta hasil pencarian yang terkadang memunculkan produk di luar merek/kata kunci.
2. **Kategori Tercampur & Filter Tidak Terduga:** Kategori produk masih tercampur (misalnya *smartwatch* masuk ke kategori *tablet*), filter cabang tidak memiliki label yang jelas, serta pengguna berekspektasi filter bekerja secara *realtime* saat dicentang tanpa harus mencari tombol *apply* terpisah.
3. **Defisit Kelengkapan Informasi Produk:** Sejumlah produk tampil tanpa gambar, tanpa spesifikasi terstruktur, atau tanpa informasi garansi, memaksa pengguna membuka halaman detail satu per satu.
4. **Fitur Compare Product Tidak Berfungsi (*Broken Empty State*):** Halaman perbandingan menampilkan area kosong tanpa penjelasan maupun mekanisme pemilihan produk yang intuitif.

### 1.3 Product Goals
1. Menyediakan **satu pusat pencarian terpadu** dengan *autocomplete* dan pratinjau produk instan yang akurat.
2. Menghadirkan sistem **penyaringan (*filtering*) *realtime*** dengan pemisahan kategori yang ketat, label cabang yang jelas, serta indikator filter aktif yang transparan.
3. Menyajikan **hierarki informasi produk yang rapi dan konsisten** pada kartu katalog maupun halaman detail, lengkap dengan penanganan eksplisit (*fallback*) jika ada data atribut yang kosong.
4. Menyediakan fitur **perbandingan berdampingan (*side-by-side compare*) hingga maksimal 3 produk** yang dapat diakses dari katalog maupun halaman detail, lengkap dengan umpan balik informatif pada kondisi kosong.

---

## 2. TARGET USERS & PERSONAS

| Persona | Profil & Fokus Utama | Kebutuhan Kunci pada Antarmuka |
| :--- | :--- | :--- |
| **Jack** *(Tech-Oriented Buyer)* | Pencari Laptop & Komponen PC (RAM, SSD, GPU) yang mengutamakan **kelengkapan dan akurasi data**. | Spesifikasi teknis terstruktur, harga jelas, informasi garansi, ketersediaan cabang terdekat, serta tabel perbandingan spesifikasi yang mudah dipindai. |
| **Tony** *(Clarity-Oriented Buyer)* | Pembeli umum / pengguna baru yang mengutamakan **kejelasan interaksi dan navigasi**. | Satu *search bar* dengan saran otomatis, filter *realtime* yang dapat diprediksi, label kontrol yang jelas, navigasi atas yang stabil, dan alur *compare* yang tidak membingungkan. |

---

## 3. SCOPE & TECHNICAL BOUNDARIES

### 3.1 In Scope (Cakupan Pengembangan MVP)
* **Aplikasi Frontend Mandiri (Desktop-First):** Dibangun menggunakan teknologi web modern (HTML/CSS/JS atau React + Tailwind CSS) dengan pengelolaan *state* di sisi klien (*client-side state management*).
* **Katalog Berbasis *Dummy Data*:** Dataset lokal (JSON/JS) yang mencakup kategori **Laptop**, **Komponen PC** (RAM, SSD, GPU), dan **Aksesoris & Gadget** (Mouse, Tablet, Smartwatch), termasuk beberapa produk yang sengaja dikosongkan sebagian datanya untuk menguji skenario *missing data*.
* **Single Unified Search Bar + Autocomplete:** Satu kotak pencarian utama di *header* dengan *dropdown* saran kata kunci dan pratinjau produk secara langsung saat mengetik.
* **Filter Katalog Realtime & Indikator Aktif:** Filter Kategori, Cabang Toko, Merek, dan Rentang Harga (Min–Maks) beserta *chip* indikator filter aktif dan tombol *Reset*.
* **Halaman Katalog & Detail Produk Terstruktur:** Tampilan daftar produk yang mudah dipindai dan tampilan detail dengan tab/bagian spesifikasi yang rapi.
* **Fitur Compare Product (Maksimal 3 Produk):** *Floating compare bar* (bilah perbandingan mengambang) dan halaman/tampilan perbandingan berdampingan hingga 3 produk yang dapat ditambahkan dari kartu katalog maupun halaman detail.

### 3.2 Out of Scope (Di Luar Cakupan MVP)
* Implementasi *backend* server, REST/GraphQL API eksternal, dan *database* persisten (MySQL/PostgreSQL/MongoDB).
* Proses transaksi pembayaran (*checkout*), keranjang belanja (*cart*), integrasi ongkos kirim, dan manajemen akun/login pengguna.
* Fitur ulasan interaktif (*submit review*), sistem *loyalty*, dan sinkronisasi API *marketplace* (Shopee/Tokopedia) secara langsung.
* Optimasi tata letak khusus *mobile-first* (tampilan tetap rapi, namun seluruh tata letak dirancang dengan prioritas layar **Desktop $\ge 1280\text{px}$**).

---

## 4. DUMMY DATA SCHEMA & KATEGORI PRODUK

Untuk mendukung pengujian seluruh kriteria UX dan riset responden, *dummy data* wajib memenuhi struktur berikut:

* **Kategori Resmi (Terpisah Ketat):**
  1. `Laptop` (Notebook kerja, ultrabook, laptop gaming)
  2. `Komponen PC` (RAM, SSD, GPU)
  3. `Aksesoris` (Mouse, Keyboard, Charger)
  4. `Tablet & Wearable` (Tablet, Smartwatch — dipisahkan agar tidak tercampur)
* **Opsi Cabang Toko (Berlabel Jelas):**
  * `Calosa Malang (Pusat - Jl. Mayjen Panjaitan)`
  * `Calosa Malang (Soekarno Hatta)`
  * `Calosa Surabaya (Hi-Tech Mall)`
* **Atribut Wajib per Objek Produk:**
  * `id`, `name`, `brand`, `category`, `price` (angka), `branches` (array cabang yang memiliki stok), `imageUrl` (boleh `null` untuk simulasi data kosong), `warranty` (string atau `null`), `description` (string atau `null`), `highlightSpecs` (3 poin ringkas untuk kartu katalog), dan `fullSpecs` (pasangan *key-value* terstruktur untuk halaman detail & perbandingan).
* **Skenario Data Uji Wajib dalam Dummy Data:**
  * Minimal 12–16 produk bervariasi lintas kategori.
  * Minimal **2 produk tanpa gambar** (`imageUrl: null`) untuk menguji komponen *placeholder* gambar.
  * Minimal **2 produk dengan informasi garansi atau deskripsi kosong** (`warranty: null` / `description: null`) untuk menguji aturan transparansi data kosong (AC-06).

---

## 5. USER STORIES

1. **US-01 (Pencarian & Autocomplete):** Sebagai calon pembeli, saya ingin mengetik nama atau merek produk di satu *search bar* utama dan langsung melihat saran kata kunci serta pratinjau produk yang relevan, sehingga saya dapat menemukan produk secara cepat tanpa hasil yang melenceng.
2. **US-02 (Filter Realtime & Jelas):** Sebagai calon pembeli, saya ingin menyaring katalog berdasarkan kategori, cabang toko, merek, dan rentang harga min–maks dengan pembaruan hasil secara langsung (*realtime*) serta melihat filter apa saja yang sedang aktif, sehingga saya tidak bingung menebak cara kerja filter.
3. **US-03 (Pemindaian & Detail Produk Lengkap):** Sebagai calon pembeli, saya ingin melihat ringkasan spesifikasi utama di kartu produk dan membaca spesifikasi lengkap, harga, ketersediaan cabang, serta status garansi secara terstruktur di halaman detail, sehingga saya yakin produk tersebut sesuai kebutuhan saya.
4. **US-04 (Pemilihan Produk untuk Perbandingan):** Sebagai calon pembeli, saya ingin dapat menambahkan hingga 3 produk ke daftar perbandingan baik langsung dari halaman katalog maupun dari halaman detail produk, sehingga alur evaluasi saya fleksibel.
5. **US-05 (Evaluasi Berdampingan & Empty State Informatif):** Sebagai calon pembeli, saya ingin membandingkan hingga 3 produk secara berdampingan dalam satu layar serta mendapatkan panduan yang jelas jika belum ada produk yang dipilih atau ada atribut yang datanya tidak tersedia, sehingga saya tidak menemui halaman kosong yang membingungkan.

---

## 6. FUNCTIONAL REQUIREMENTS

| ID | Fitur / Modul | Spesifikasi Fungsional & Aturan Perilaku | Prioritas |
| :--- | :--- | :--- | :--- |
| **FR-01** | **Unified Search & Autocomplete** | Sistem hanya menyediakan **1 kotak pencarian** di *header*. Saat pengguna mengetik $\ge 2$ karakter, sistem menampilkan *dropdown* berisi saran kata kunci populer/kategori dan maksimal **4 pratinjau produk** (thumbnail, nama, kategori, harga) yang cocok dengan nama/merek. Menekan *Enter* atau klik "Lihat semua hasil" menyaring halaman katalog utama. | High |
| **FR-02** | **Klasifikasi Kategori Konsisten** | Navigasi kategori dan filter kategori hanya menampilkan produk yang `category`-nya cocok secara eksak (misal: kategori *Tablet* tidak boleh menampilkan *Smartwatch*). | High |
| **FR-03** | **Perilaku Filter Realtime** | • **Checkbox (Kategori, Cabang, Merek):** Memperbarui daftar produk secara **instan (*realtime*)** begitu dicentang/dihapus centangnya.<br>• **Input Harga (Min & Maks):** Memiliki label eksplisit "Harga Minimum" dan "Harga Maksimum", memperbarui hasil secara otomatis dengan *debounce* ($400\text{ms}$) atau saat menekan tombol *Enter* / klik tombol "Terapkan Harga" di samping input. | High |
| **FR-04** | **Indikator Filter Aktif & Reset** | Menampilkan jumlah total produk yang ditemukan, daftar *tag/chip* untuk setiap filter yang sedang aktif (dapat dihapus satu per satu), serta tombol **"Reset Semua Filter"**. | High |
| **FR-05** | **Kartu Produk Mudah Dipindai (*Scannable Card*)** | Setiap kartu produk pada katalog menampilkan: gambar (atau *placeholder* rapi jika kosong), lencana kategori, nama produk (maksimal 2 baris dengan *ellipsis* agar seragam), 2–3 spesifikasi kunci, status cabang tersedia, harga, tombol **"+ Bandingkan"** (*toggle*), dan tombol **"Lihat Detail"**. | Medium |
| **FR-06** | **Halaman / Tampilan Detail Produk** | Menampilkan gambar produk, nama, merek, harga, daftar cabang tempat stok tersedia, status garansi, deskripsi, dan **tabel spesifikasi terstruktur** (key-value). Menyediakan tombol **"+ Tambah ke Perbandingan"** yang sinkron dengan status pada katalog. | High |
| **FR-07** | **Penanganan Data Tidak Lengkap (*Graceful Fallback*)** | Jika produk pada *dummy data* tidak memiliki gambar, garansi, atau deskripsi, sistem menampilkan elemen visual/teks eksplisit (misal: ikon *placeholder* *"Gambar belum tersedia"* atau label *"Informasi garansi belum dicantumkan"*), tidak dibiarkan rusak (*broken image*) atau tersembunyi tanpa keterangan. | High |
| **FR-08** | **Manajemen Antrean Compare (Maks. 3 Produk)** | Pengguna dapat memilih **1 hingga maksimal 3 produk** dari kartu katalog maupun halaman detail. Status pemilihan tersimpan di *state* aplikasi dan ditampilkan pada **Floating Compare Tray** di bagian bawah layar (menampilkan thumbnail produk terpilih, tombol hapus per item, dan tombol **"Bandingkan Sekarang"**). Jika pengguna mencoba menambah produk ke-4, sistem menampilkan notifikasi/toast *"Maksimal 3 produk dapat dibandingkan sekaligus"*. | High |
| **FR-09** | **Halaman Perbandingan Berdampingan** | Menampilkan hingga 3 kolom produk secara berdampingan dengan baris atribut yang sejajar (Gambar, Nama, Kategori, Harga, Garansi, Ketersediaan Cabang, dan seluruh parameter spesifikasi). Terdapat fitur opsional **"Soroti Perbedaan"** untuk memudahkan identifikasi selisih spesifikasi. Jika membandingkan produk beda kategori, atribut yang tidak dimiliki salah satu produk ditampilkan dengan tanda `—` (*Tidak tersedia*). | High |
| **FR-10** | **Compare Empty & Partial State** | • Jika pengguna membuka halaman *Compare* dengan **0 produk terpilih**, sistem menampilkan ilustrasi/pesan *"Belum ada produk yang dipilih untuk dibandingkan"* beserta tombol CTA **"Pilih Produk di Katalog"**.<br>• Jika baru **1 produk terpilih**, sistem menampilkan produk tersebut di kolom pertama dan menampilkan kartu slot kosong interaktif pada kolom ke-2 dan ke-3 dengan tombol **"+ Tambah Produk Pembanding"**. | High |

---

## 7. UX & UI REQUIREMENTS (DESKTOP-FIRST)

* **UX-01 (Layout Desktop-First):** Menggunakan tata letak *grid* desktop standar (lebar kontainer maksimal `1280px`–`1440px`), dengan **Sidebar Filter tetap (*sticky sidebar*, lebar `260px–280px`)** di sisi kiri dan **Grid Katalog (3 kolom kartu produk)** di sisi kanan.
* **UX-02 (Navigasi Global Stabil & Bersih):** *Header* atas bersifat konsisten di seluruh halaman, memuat Logo Calosa, menu navigasi utama (`Katalog Produk`, `Bandingkan Produk` dengan lencana jumlah item aktif), dan **1 Search Bar Terpadu** di tengah. Tidak ada menu navigasi yang berubah-ubah posisinya secara tiba-tiba atau ikon yang tidak berfungsi.
* **UX-03 (Umpan Balik Visual Instan):** Setiap perubahan filter atau pencarian memberikan transisi/pembaruan daftar produk secara langsung dan menampilkan *empty state* pencarian jika 0 produk cocok (disertai tombol reset pencarian/filter).
* **UX-04 (Hierarki Informasi & Keterbacaan):** Harga ditampilkan dengan kontras tinggi dan format mata uang Rupiah yang jelas (`Rp X.XXX.XXX`). Spesifikasi pada halaman detail dan perbandingan menggunakan baris berlatar selang-seling (*zebra striping*) agar mata pengguna tidak salah baris saat memindai dari kiri ke kanan.
* **UX-05 (Kejelasan Status Tombol Compare):** Tombol perbandingan pada kartu produk dan halaman detail memiliki dua status visual yang kontras: **"Bandingkan"** (default) dan **"Terpilih ✓"** (aktif), sehingga pengguna selalu tahu produk mana yang sudah masuk daftar banding.

---

## 8. ACCEPTANCE CRITERIA

| ID | Kriteria Penerimaan (Testable Checklist) | Terkait FR |
| :--- | :--- | :--- |
| **AC-01** | Hanya terdapat **1 search bar** pada tampilan aplikasi. Mengetik minimal 2 karakter memunculkan *dropdown* saran kata kunci dan pratinjau produk yang relevan; menekan *Enter* memperbarui daftar katalog sesuai kata kunci. | FR-01 |
| **AC-02** | Memilih kategori (misal: `Laptop` atau `Tablet & Wearable`) hanya menampilkan produk dengan kategori tersebut tanpa ada produk kategori lain yang tercampur. | FR-02 |
| **AC-03** | Setiap opsi filter cabang menampilkan nama cabang secara lengkap dan jelas; mencentang opsi cabang, kategori, atau merek langsung memperbarui daftar produk secara *realtime* tanpa tombol *apply* terpisah. | FR-03 |
| **AC-04** | Input filter harga memiliki label "Harga Minimum" dan "Harga Maksimum" yang jelas, serta menyaring produk sesuai rentang harga yang dimasukkan. | FR-03 |
| **AC-05** | Filter yang sedang aktif terlihat sebagai *chip/tag* di atas daftar produk dan dapat dihapus secara individual maupun sekaligus melalui tombol "Reset Semua Filter". | FR-04 |
| **AC-06** | Kartu katalog dan halaman detail menampilkan gambar, harga, spesifikasi, cabang, dan garansi secara terstruktur. Untuk produk pada *dummy data* yang tidak memiliki gambar/garansi/deskripsi, sistem menampilkan *placeholder* atau keterangan eksplisit ("Informasi belum tersedia") dan tidak tampak rusak. | FR-05, FR-06, FR-07 |
| **AC-07** | Pengguna dapat menambahkan produk ke daftar perbandingan dari **kartu katalog** maupun dari **halaman detail produk**, dan status tombol langsung berubah menjadi "Terpilih". | FR-08 |
| **AC-08** | Pengguna dapat memilih maksimal **3 produk** untuk dibandingkan; upaya menambahkan produk ke-4 dicegah dengan pesan pemberitahuan yang jelas. | FR-08 |
| **AC-09** | Halaman perbandingan menampilkan hingga 3 produk secara berdampingan dengan baris atribut (harga, garansi, cabang, dan spesifikasi) yang sejajar dan mudah dibandingkan. | FR-09 |
| **AC-10** | Membuka halaman perbandingan saat 0 produk terpilih menampilkan pesan panduan yang jelas beserta tombol kembali ke katalog (tidak menampilkan area kosong tanpa konteks); saat baru 1 produk terpilih, kolom ke-2 dan ke-3 menampilkan slot ajakan untuk menambah produk pembanding. | FR-10 |