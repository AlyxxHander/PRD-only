# Calosa Laptop & Gadget Store — Web Catalog & Comparison Experience

[![PRD Version](https://img.shields.io/badge/PRD-v2.0-blue.svg)](document/calosa_store_prd_v2_0.md)
[![Status](https://img.shields.io/badge/Status-Final%20Release-emerald.svg)]()
[![Stack](https://img.shields.io/badge/Tech%20Stack-Laravel%2011%20%7C%20React%20TSX%20%7C%20Tailwind%20CSS-orange.svg)]()

Calosa Laptop & Gadget Store adalah aplikasi katalog web mandiri (*Client-Side Web App*) yang dirancang khusus dengan orientasi **Desktop-First ($\ge 1280\text{px}$)**. Aplikasi ini memungkinkan calon pembeli menelusuri katalog, melakukan penyaringan *realtime*, memeriksa spesifikasi teknis mendalam, dan membandingkan hingga 3 produk secara berdampingan dengan penanganan kondisi data kosong (*graceful fallback*) yang elegan.

---

## 🚀 Fitur Utama & Kepatuhan PRD v2.0

* **Unified Search Bar & Autocomplete (`FR-01`, `AC-01`):** Satu kotak pencarian terpadu di header dengan pratinjau maksimal 4 produk dan saran kata kunci saat mengetik $\ge 2$ karakter (debounce 350ms).
* **Pemisahan Kategori Ketat (`FR-02`, `AC-02`):** 4 Kategori resmi terpisah murni (`Laptop`, `Komponen PC`, `Aksesoris`, `Tablet & Wearable`).
* **Filter Realtime & Label Cabang Jelas (`FR-03`, `AC-03`, `AC-04`):** Checkbox cabang lengkap (Panjaitan, Suhat, Hi-Tech Mall Surabaya), filter merek dinamis, dan rentang harga Min–Maks dengan debounce 400ms tanpa tombol "Apply" terpisah.
* **Indikator Filter Aktif & Reset (`FR-04`, `AC-05`):** Tag/chip filter yang dapat dihapus individual dan tombol "Reset Semua Filter".
* **Kartu Katalog Mudah Dipindai (`FR-05`, `UX-04`):** Tinggi kartu seragam (nama produk maksimal 2 baris *ellipsis*), highlight spesifikasi kunci, dan harga format Rupiah kontras tinggi.
* **Halaman Detail Produk Lengkap (`FR-06`, `UX-04`):** Galeri foto, rincian ketersediaan stok fisik cabang, status garansi, dan tabel spesifikasi terstruktur dengan garis selang-seling (*zebra striping*).
* **Penanganan Elegan Data Kosong (`FR-07`, `AC-06`):** Menampilkan ilustrasi placeholder *"Gambar belum tersedia"*, *"Informasi garansi belum dicantumkan"*, atau *"Deskripsi produk belum tersedia"* tanpa adanya elemen rusak (*no broken image*).
* **Floating Compare Tray & Batas Maksimal 3 Produk (`FR-08`, `AC-07`, `AC-08`):** Bilah bawah mengambang yang melacak produk terpilih dengan persistensi `localStorage` dan notifikasi *toast* pencegahan pada produk ke-4.
* **Tabel Perbandingan Berdampingan (`FR-09`, `AC-09`):** 3 Kolom sejajar dengan baris atribut simetris, toggle **"Soroti Perbedaan Spesifikasi"**, dan tanda `—` untuk produk beda kategori.
* **Compare Empty & Partial State (`FR-10`, `AC-10`):** Panduan 3 langkah ramah saat 0 produk terpilih, serta slot kosong interaktif bergaris putus-putus (*dashed border*) saat baru 1 atau 2 produk dipilih.

---

## 🛠️ Tech Stack

* **Backend:** Laravel 11
* **Frontend:** Inertia.js + React 19 (TypeScript `.tsx`)
* **Styling:** Tailwind CSS v4 + PostCSS
* **Ikon:** Lucide React
* **Build Tool:** Vite
* **Data Source:** Structured Local Dataset (`resources/js/data/dummyProducts.ts`)

---

## 📦 Prasyarat Sistem

Sebelum menjalankan aplikasi, pastikan komputer Anda telah terpasang:
* **PHP:** $\ge 8.2$ (disarankan PHP 8.3 atau 8.5)
* **Composer:** $\ge 2.0$
* **Node.js:** $\ge 18.0$ (disarankan LTS v20 atau v22)
* **NPM:** $\ge 9.0$

---

## 💻 Panduan Menjalankan Aplikasi Secara Lokal

### 1. Kloning Repositori & Instal Dependensi
```bash
# Masuk ke direktori proyek
cd "PRD Only"

# Pasang dependensi PHP
composer install

# Pasang dependensi JavaScript
npm install
# (Gunakan 'npm.cmd install' jika menggunakan Windows PowerShell)