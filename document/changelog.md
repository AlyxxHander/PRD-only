# Changelog

Dokumen ini mencatat seluruh pembaruan, perbaikan bug, dan perubahan penting dalam proyek.

---

## [v1.2] - Third Commit
- Menyesuaikan kategori produk dengan filter asli Calosa Store, pada file `dummyProducts.ts` dan `product.ts`.
- Menyesuaikan cabang toko dengan filter asli Calosa Store, pada file `dummyProducts.ts` dan `product.ts`.
- Memperbaiki error logika function `getCategoryIcon` pada `FilterSidebar.tsx`.
- Menghapus file `Detail-Dokumentasi_Error.md` dan menggantikannya dengan `changelog.md`.

---

## [v1.1] - Second Commit

### Laporan Testing Implementation Plan (Pasca Fase 1–7)
- Memperbaiki masalah duplikasi *sidebar navigation* pada halaman *Compare Product* dengan menghapus salah satu navigasi secara manual.
- Memperbaiki posisi `FloatingCompareTray` yang tidak sejajar di tengah dengan melakukan penyesuaian tata letak (*styling*).

---

## [v1.0] - First Commit

### Ringkasan Umum
- Berhasil menyelesaikan *implementation plan* dari Fase 1 hingga Fase 7.
- Memperbaiki beberapa kendala teknis pada alur pengkodian tiap fase.

### Detail Perubahan per Fase

#### Fase 1: Setup Awal & Inisialisasi
- Menangani *error setup* awal akibat rekomendasi penggunaan Breeze untuk Laravel + React. Masalah diselesaikan dengan menginstal Laravel dan *starter kit* React secara manual.
- Menyelesaikan masalah tampilan *blank screen* putih (komponen/UI tidak muncul) yang dipicu oleh kegagalan konfigurasi *setup* awal.

#### Fase 2: Struktur Path & Catalog Navigation
- Memperbaiki kesalahan penulisan jalur berkas (*case-sensitivity*). Contohnya: perbaikan dari `@/Types/..` menjadi `@/types/..`.
- Menghapus *sidebar navigation* ganda pada halaman *Product Catalog* untuk mengeliminasi duplikasi.

#### Fase 4: Product Detail
- Menghapus duplikasi *sidebar navigation* pada halaman detail produk.