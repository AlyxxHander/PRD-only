# PANDUAN IMPLEMENTASI TEKNIS — FASE 1: SETUP PROYEK & FONDASI ARSITEKTUR
## Calosa Laptop & Gadget Store (Web Catalog & Comparison Experience)

Dokumen ini berisi instruksi detail dan langkah-langkah teknis untuk menjalankan **Fase 1** berdasarkan PRD v2.0 dan Rencana Implementasi umum.

---

## 📌 Ringkasan Target Fase 1

Fase 1 bertujuan untuk menyiapkan repositori, perkakas pengembangan (*tooling*), skema data TypeScript, dataset dummy pengujian, *state management*, dan layout dasar *desktop-first* sebelum fitur katalog dan perbandingan diimplementasikan.

### Tech Stack yang Digunakan:
* **Backend:** Laravel 11
* **Starter Kit:** Laravel Breeze (React.js + TypeScript / `.tsx` + Inertia.js)
* **CSS Framework:** Tailwind CSS
* **Build Tool:** Vite
* **Icon Pack:** Lucide React
* **State Management:** React Context (Client-side)
* **Data Source:** Structured Local Dummy Data (`dummyProducts.ts`)

---

## 📋 Langkah Demi Langkah Implementasi Fase 1

### Langkah 1: Inisialisasi Proyek Laravel 11

Jalankan perintah berikut pada terminal untuk membuat struktur proyek Laravel baru bernama `calosa-store`:

```bash
composer create-project laravel/laravel calosa-store
cd calosa-store
```

> **Catatan Windows PowerShell:** Jika menggunakan PowerShell, pastikan perintah dijalankan di direktori kerja utama proyek.

---

### Langkah 2: Instalasi Laravel Breeze (React + TypeScript)

Laravel Breeze menyediakan starter kit minimalis berbasis Inertia.js dan React dengan dukungan TypeScript bawaan.

1. Pasang dependensi Breeze:
   ```bash
   composer require laravel/breeze --dev
   ```
2. Jalankan perintah instalasi stack React TypeScript:
   ```bash
   php artisan breeze:install react --typescript --ssr=false
   ```
   *(Pilih opsional pengujian default jika ditanyakan, misal: PHPUnit / Pest).*
3. Jalankan migrasi basis data SQLite bawaan (untuk kebutuhan sesi/internal Laravel):
   ```bash
   php artisan migrate
   ```

---

### Langkah 3: Pemasangan Library Pendukung & Konfigurasi Tailwind CSS

1. **Instalasi Paket Tambahan:**
   Pasang `lucide-react` untuk ikon antarmuka serta utilitas styling `clsx` dan `tailwind-merge`:
   ```bash
   npm.cmd install lucide-react clsx tailwind-merge
   ```
   *(Gunakan `npm.cmd` jika PowerShell memblokir eksekusi script `npm.ps1`).*

2. **Konfigurasi `tailwind.config.js`:**
   Sesuaikan tema warna khusus Calosa (biru teknologi, abu-abu netral, dan amber/oranye) serta penataan kontainer *desktop-first*:
   ```javascript
   import defaultTheme from 'tailwindcss/defaultTheme';
   import forms from '@tailwindcss/forms';

   /** @type {import('tailwindcss').Config} */
   export default {
       content: [
           './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
           './storage/framework/views/*.php',
           './resources/views/**/*.blade.php',
           './resources/js/**/*.tsx',
       ],

       theme: {
           extend: {
               fontFamily: {
                   sans: ['Figtree', ...defaultTheme.fontFamily.sans],
               },
               colors: {
                   brand: {
                       50: '#eff6ff',
                       100: '#dbeafe',
                       500: '#2563eb', // Calosa Primary Blue
                       600: '#1d4ed8',
                       700: '#1e40af',
                   },
                   accent: {
                       500: '#f59e0b', // Highlight / Badge Amber
                       600: '#d97706',
                   }
               },
               screens: {
                   'desktop': '1280px',
                   'wide': '1440px',
               }
           },
       },

       plugins: [forms],
   };
   ```

---

### Langkah 4: Pembuatan Struktur Direktori Modular di `resources/js/`

Buka atau buat direktori modular berikut agar pengelolaan komponen terstruktur rapi:

```bash
mkdir -p resources/js/Components/Common
mkdir -p resources/js/Components/Layout
mkdir -p resources/js/Components/Catalog
mkdir -p resources/js/Components/Compare
mkdir -p resources/js/Contexts
mkdir -p resources/js/Data
mkdir -p resources/js/Types
```

Struktur folder yang dihasilkan:
```text
resources/js/
├── Components/
│   ├── Common/              # Button, Badge, Modal, Toast
│   ├── Layout/              # Navbar, Header, Footer
│   ├── Catalog/             # SearchBar, FilterSidebar, ActiveFilterChips, ProductCard
│   └── Compare/             # FloatingCompareTray, CompareTable, EmptyCompareState
├── Contexts/
│   ├── CompareContext.tsx   # State perbandingan (maksimal 3 item)
│   └── FilterContext.tsx    # State pencarian & penyaringan realtime
├── Data/
│   └── dummyProducts.ts     # Dataset lokal terstruktur (14-16 produk)
├── Layouts/
│   └── AppLayout.tsx        # Layout utama (Desktop-First, 1280px–1440px)
├── Pages/
│   ├── CatalogPage.tsx      # Tampilan utama katalog & filter
│   ├── ProductDetailPage.tsx# Tampilan detail produk
│   └── ComparePage.tsx      # Tampilan perbandingan berdampingan
└── Types/
    └── product.ts           # Definisi interface TypeScript
```

---

### Langkah 5: Definisi Tipe Data TypeScript (`resources/js/Types/product.ts`)

Buat file `resources/js/Types/product.ts` yang mendefinisikan tipe data sesuai Bab 4 PRD:

```typescript
export type Category = 
  | 'Laptop'
  | 'Komponen PC'
  | 'Aksesoris'
  | 'Tablet & Wearable';

export type BranchLocation = 
  | 'Calosa Malang (Pusat - Jl. Mayjen Panjaitan)'
  | 'Calosa Malang (Soekarno Hatta)'
  | 'Calosa Surabaya (Hi-Tech Mall)';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  branches: BranchLocation[];
  imageUrl: string | null;         // Nullable untuk skenario missing image
  warranty: string | null;         // Nullable untuk skenario missing warranty
  description: string | null;      // Nullable untuk skenario missing description
  highlightSpecs: string[];        // 2-3 spesifikasi ringkas untuk kartu katalog
  fullSpecs: Record<string, string>; // Pasangan key-value untuk detail & perbandingan
}

export interface FilterState {
  searchQuery: string;
  selectedCategories: Category[];
  selectedBranches: BranchLocation[];
  selectedBrands: string[];
  minPrice: number | null;
  maxPrice: number | null;
}
```

---

### Langkah 6: Pembuatan Dataset Pengujian (`resources/js/Data/dummyProducts.ts`)

Buat file `resources/js/Data/dummyProducts.ts` dengan minimal 14–16 data produk yang memenuhi skenario PRD:
* 4 Kategori resmi yang terpisah ketat.
* 3 Lokasi cabang berlabel jelas.
* **Minimal 2 produk tanpa gambar** (`imageUrl: null`).
* **Minimal 2 produk tanpa informasi garansi atau deskripsi** (`warranty: null` / `description: null`).

```typescript
import { Product } from '@/Types/product';

export const BRANCHES = [
  'Calosa Malang (Pusat - Jl. Mayjen Panjaitan)',
  'Calosa Malang (Soekarno Hatta)',
  'Calosa Surabaya (Hi-Tech Mall)',
] as const;

export const CATEGORIES = [
  'Laptop',
  'Komponen PC',
  'Aksesoris',
  'Tablet & Wearable',
] as const;

export const DUMMY_PRODUCTS: Product[] = [
  // --- KATEGORI: LAPTOP ---
  {
    id: 'lap-01',
    name: 'ASUS ROG Zephyrus G14 (2024)',
    brand: 'ASUS',
    category: 'Laptop',
    price: 28999000,
    branches: [
      'Calosa Malang (Pusat - Jl. Mayjen Panjaitan)',
      'Calosa Surabaya (Hi-Tech Mall)',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80',
    warranty: '2 Tahun Garansi Resmi ASUS Indonesia + 1 Tahun ADP',
    description: 'Laptop gaming ultra-portable dengan layar OLED 3K 120Hz dan prosesor AMD Ryzen 9 terbaru.',
    highlightSpecs: ['Ryzen 9 8945HS', 'RTX 4060 8GB', 'Layar 3K OLED 120Hz'],
    fullSpecs: {
      'Prosesor': 'AMD Ryzen 9 8945HS (8 Core, 16 Thread up to 5.2GHz)',
      'Kartu Grafis': 'NVIDIA GeForce RTX 4060 8GB GDDR6 (TGP 90W)',
      'RAM': '16GB LPDDR5X 6400MHz Dual Channel',
      'Penyimpanan': '1TB M.2 NVMe PCIe 4.0 SSD',
      'Layar': '14.0 inch 3K (2880 x 1800) OLED 16:10 120Hz 0.2ms',
      'Bobot': '1.50 kg',
      'Sistem Operasi': 'Windows 11 Home + OHS 2021',
    },
  },
  {
    id: 'lap-02',
    name: 'Lenovo IdeaPad Slim 3 14IAH8',
    brand: 'Lenovo',
    category: 'Laptop',
    price: 7899000,
    branches: [
      'Calosa Malang (Pusat - Jl. Mayjen Panjaitan)',
      'Calosa Malang (Soekarno Hatta)',
      'Calosa Surabaya (Hi-Tech Mall)',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80',
    warranty: '2 Tahun Garansi Resmi Lenovo Premium Care',
    description: 'Laptop kerja harian yang ringkas dan responsif ditenagai prosesor Intel Core i5 generasi ke-12.',
    highlightSpecs: ['Intel Core i5-12450H', 'RAM 8GB LPDDR5', 'Bobot Ringan 1.37 kg'],
    fullSpecs: {
      'Prosesor': 'Intel Core i5-12450H (8 Core, 12 Thread up to 4.4GHz)',
      'Kartu Grafis': 'Intel UHD Graphics',
      'RAM': '8GB LPDDR5-4800 (Soldered)',
      'Penyimpanan': '512GB SSD M.2 2242 PCIe 4.0x4 NVMe',
      'Layar': '14 inch FHD (1920x1080) IPS 300nits Anti-glare',
      'Bobot': '1.37 kg',
      'Sistem Operasi': 'Windows 11 Home + OHS 2021',
    },
  },
  {
    // SKENARIO UJI: Produk TANPA GAMBAR (imageUrl: null)
    id: 'lap-03',
    name: 'Acer Swift Go 14 AI Touch',
    brand: 'Acer',
    category: 'Laptop',
    price: 13499000,
    branches: ['Calosa Malang (Soekarno Hatta)'],
    imageUrl: null, // UJI: Komponen Placeholder Gambar (FR-07, AC-06)
    warranty: '2 Tahun Garansi Resmi Acer + 1 Tahun ADP',
    description: 'Laptop tipis bertenaga Intel Core Ultra dengan layar sentuh responsif dan dukungan fitur AI terpadu.',
    highlightSpecs: ['Intel Core Ultra 5 125H', 'Touchscreen OLED', 'Baterai hingga 14 Jam'],
    fullSpecs: {
      'Prosesor': 'Intel Core Ultra 5 125H (14 Core, 18 Thread, Intel AI Boost)',
      'Kartu Grafis': 'Intel Arc Graphics',
      'RAM': '16GB LPDDR5X Dual Channel',
      'Penyimpanan': '512GB PCIe Gen4 NVMe SSD',
      'Layar': '14 inch 2.8K (2880 x 1800) OLED Multi-Touch 90Hz',
      'Bobot': '1.32 kg',
      'Sistem Operasi': 'Windows 11 Home',
    },
  },

  // --- KATEGORI: KOMPONEN PC ---
  {
    id: 'komp-01',
    name: 'Corsair Vengeance RGB DDR5 32GB (2x16GB) 6000MHz',
    brand: 'Corsair',
    category: 'Komponen PC',
    price: 1850000,
    branches: [
      'Calosa Malang (Pusat - Jl. Mayjen Panjaitan)',
      'Calosa Surabaya (Hi-Tech Mall)',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&auto=format&fit=crop&q=80',
    warranty: 'Garansi Seumur Hidup Terbatas (Limited Lifetime)',
    description: 'RAM DDR5 berkinerja tinggi dengan pencahayaan RGB dinamis sepuluh zona terintegrasi software iCUE.',
    highlightSpecs: ['DDR5 6000MHz', 'Dual Channel 32GB', 'Dukungan XMP 3.0 & EXPO'],
    fullSpecs: {
      'Kapasitas': '32GB (2 x 16GB)',
      'Tipe Memori': 'DDR5 UDIMM 288-pin',
      'Frekuensi Kecepatan': '6000 MT/s',
      'Timing Latensi': 'CL36-36-36-76',
      'Tegangan Operasional': '1.35V',
      'Pencahayaan': 'Dynamic Ten-Zone RGB',
    },
  },
  {
    id: 'komp-02',
    name: 'Samsung 990 PRO NVMe M.2 SSD 1TB Heatsink',
    brand: 'Samsung',
    category: 'Komponen PC',
    price: 2150000,
    branches: [
      'Calosa Malang (Pusat - Jl. Mayjen Panjaitan)',
      'Calosa Malang (Soekarno Hatta)',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80',
    warranty: '5 Tahun Garansi Resmi Samsung',
    description: 'SSD NVMe PCIe Gen 4.0 tercepat di kelasnya lengkap dengan heatsink terintegrasi untuk kestabilan suhu.',
    highlightSpecs: ['Read up to 7450 MB/s', 'PCIe 4.0 x4 NVMe 2.0', 'With Thermal Heatsink'],
    fullSpecs: {
      'Form Factor': 'M.2 (2280) with Integrated Heatsink',
      'Antarmuka': 'PCIe Gen 4.0 x4, NVMe 2.0',
      'Kecepatan Baca Sekuensial': 'Hingga 7.450 MB/s',
      'Kecepatan Tulis Sekuensial': 'Hingga 6.900 MB/s',
      'Ketahanan (TBW)': '600 TBW',
    },
  },
  {
    // SKENARIO UJI: Produk TANPA GARANSI & TANPA GAMBAR
    id: 'komp-03',
    name: 'Thermal Grizzly Kryonaut Extreme Pasta Termal 2g',
    brand: 'Thermal Grizzly',
    category: 'Komponen PC',
    price: 240000,
    branches: ['Calosa Malang (Pusat - Jl. Mayjen Panjaitan)'],
    imageUrl: null, // UJI: Null image
    warranty: null, // UJI: Null warranty (FR-07, AC-06)
    description: 'Thermal grease performa ekstrem yang dirancang khusus untuk overclocking berat dan pendinginan maksimal.',
    highlightSpecs: ['Konduktivitas 14.2 W/mk', 'Tidak Mengalirkan Listrik', 'Isi Bersih 2 Gram'],
    fullSpecs: {
      'Konduktivitas Termal': '14.2 W/mK',
      'Kepadatan': '3.76 g/cm3',
      'Viskositas': '130–180 Pas',
      'Suhu Operasional': '-250 °C hingga +350 °C',
    },
  },

  // --- KATEGORI: AKSESORIS ---
  {
    id: 'aks-01',
    name: 'Logitech MX Master 3S Wireless Mouse',
    brand: 'Logitech',
    category: 'Aksesoris',
    price: 1549000,
    branches: [
      'Calosa Malang (Pusat - Jl. Mayjen Panjaitan)',
      'Calosa Malang (Soekarno Hatta)',
      'Calosa Surabaya (Hi-Tech Mall)',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
    warranty: '1 Tahun Garansi Resmi Logitech Indonesia',
    description: 'Mouse produktivitas ikonik dengan sensor 8.000 DPI yang dapat bekerja di permukaan kaca serta klik senyap.',
    highlightSpecs: ['Sensor 8000 DPI Darkfield', 'Quiet Click Mechanism', 'Scroll MagSpeed Elektromagnetik'],
    fullSpecs: {
      'Resolusi Sensor': '200–8000 DPI (bisa diatur per 50 DPI)',
      'Konektivitas': 'Bluetooth Low Energy & Logi Bolt USB Receiver',
      'Daya Tahan Baterai': 'Hingga 70 hari sekali pengisian penuh via USB-C',
      'Jumlah Tombol': '7 Tombol yang dapat dikustomisasi',
      'Kompatibilitas': 'Windows, macOS, Linux, iPadOS, Android',
    },
  },
  {
    id: 'aks-02',
    name: 'Keychron K2 Pro QMK/VIA Wireless Mechanical Keyboard',
    brand: 'Keychron',
    category: 'Aksesoris',
    price: 1450000,
    branches: [
      'Calosa Malang (Soekarno Hatta)',
      'Calosa Surabaya (Hi-Tech Mall)',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&auto=format&fit=crop&q=80',
    warranty: '1 Tahun Garansi Resmi Keychron Indonesia',
    description: 'Keyboard mekanikal nirkabel 75% kustom yang mendukung pemrograman tombol QMK/VIA dan hot-swappable switch.',
    highlightSpecs: ['Tata Letak Kompak 75%', 'Dukungan QMK/VIA', 'Hot-Swappable Switch'],
    fullSpecs: {
      'Tata Letak': '75% (84 tombol)',
      'Tipe Switch': 'Keychron K Pro Red Mechanical',
      'Konektivitas': 'Bluetooth 5.1 & Kabel Type-C',
      'Kapasitas Baterai': '4000 mAh (hingga 300 jam tanpa backlight)',
      'Keycaps': 'Double-shot PBT profile OSA',
    },
  },
  {
    // SKENARIO UJI: Produk TANPA DESKRIPSI
    id: 'aks-03',
    name: 'Anker PowerPort III 65W Pod GaN Fast Charger',
    brand: 'Anker',
    category: 'Aksesoris',
    price: 399000,
    branches: ['Calosa Surabaya (Hi-Tech Mall)'],
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80',
    warranty: '18 Bulan Garansi Resmi Anker Indonesia',
    description: null, // UJI: Null description (FR-07, AC-06)
    highlightSpecs: ['Output Daya 65W Max', 'Teknologi GaN II', 'Port USB-C Universal'],
    fullSpecs: {
      'Total Output': '65 Watt',
      'Input': '100-240V ~ 2.1A 50-60Hz',
      'Port': '1x USB-C PowerIQ 3.0',
      'Teknologi': 'Gallium Nitride (GaN II)',
    },
  },

  // --- KATEGORI: TABLET & WEARABLE ---
  {
    id: 'tab-01',
    name: 'Samsung Galaxy Tab S9 FE 5G (6/128GB)',
    brand: 'Samsung',
    category: 'Tablet & Wearable',
    price: 6999000,
    branches: [
      'Calosa Malang (Pusat - Jl. Mayjen Panjaitan)',
      'Calosa Surabaya (Hi-Tech Mall)',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
    warranty: '1 Tahun Garansi Resmi SEIN',
    description: 'Tablet produktivitas dan hiburan tahan air IP68 yang sudah dilengkapi S-Pen responsif dalam paket penjualan.',
    highlightSpecs: ['Layar 10.9 inch 90Hz', 'Sertifikasi Tahan Air IP68', 'Termasuk S-Pen Bawaan'],
    fullSpecs: {
      'Layar': '10.9 inch WQXGA (2304 x 1440) TFT 90Hz',
      'Chipset': 'Exynos 1380 (5 nm) Octa-Core',
      'RAM & Storage': '6GB RAM / 128GB (MicroSD up to 1TB)',
      'Baterai': '8.000 mAh Fast Charging 45W',
      'Ketahanan': 'IP68 Water & Dust Resistance',
    },
  },
  {
    id: 'tab-02',
    name: 'Apple Watch Series 9 GPS 45mm Starlight',
    brand: 'Apple',
    category: 'Tablet & Wearable',
    price: 6799000,
    branches: [
      'Calosa Malang (Soekarno Hatta)',
      'Calosa Surabaya (Hi-Tech Mall)',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
    warranty: '1 Tahun Garansi Resmi Apple Indonesia (iBox/Digimap)',
    description: 'Smartwatch tercanggih dengan chip S9 SiP, navigasi gesture Double Tap ajaib, dan layar Always-On super cerah.',
    highlightSpecs: ['Chip S9 SiP & Gesture Double Tap', 'Layar Always-On 2000 nits', 'Sensor EKG & Suhu Tubuh'],
    fullSpecs: {
      'Ukuran Case': '45mm (Aluminium Starlight)',
      'Chip': 'Apple S9 SiP Dual-core 64-bit',
      'Layar': 'Always-On Retina LTPO OLED, Kecerahan hingga 2000 nits',
      'Sensor Kesehatan': 'Sensor Oksigen Darah, Sensor EKG Elektrik, Sensor Suhu Tubuh',
      'Daya Tahan Baterai': 'Hingga 18 jam (36 jam dalam Mode Daya Rendah)',
    },
  },
  {
    id: 'tab-03',
    name: 'Xiaomi Pad 6 (8/256GB)',
    brand: 'Xiaomi',
    category: 'Tablet & Wearable',
    price: 4999000,
    branches: [
      'Calosa Malang (Pusat - Jl. Mayjen Panjaitan)',
      'Calosa Malang (Soekarno Hatta)',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop&q=80',
    warranty: '15 Bulan Garansi Resmi Xiaomi Indonesia',
    description: 'Tablet kerja dan multimedia dengan layar 144Hz 2.8K tajam dan audio quad speaker Dolby Atmos.',
    highlightSpecs: ['Snapdragon 870', 'Layar 2.8K 144Hz 7-gear', 'Baterai 8840 mAh 33W'],
    fullSpecs: {
      'Layar': '11 inch 2.8K (2880 x 1800) WQHD+ 144Hz IPS',
      'Chipset': 'Qualcomm Snapdragon 870 5G (7 nm)',
      'RAM & Storage': '8GB LPDDR5 / 256GB UFS 3.1',
      'Audio': '4 Speaker Stereo Dolby Atmos',
      'Bobot': '490 gram',
    },
  },
];
```

---

### Langkah 7: Pembuatan State Context untuk Perbandingan (`resources/js/Contexts/CompareContext.tsx`)

Fitur perbandingan memerlukan *state* terpusat di sisi klien untuk melacak produk yang dipilih (maksimal 3 item) dan memicu *toast* jika batas terlampaui.

```typescript
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/Types/product';

interface CompareContextType {
  compareList: Product[];
  addToCompare: (product: Product) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  toastMessage: string | null;
  dismissToast: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const addToCompare = (product: Product): boolean => {
    if (compareList.some((item) => item.id === product.id)) {
      return false;
    }
    // Batasan maksimal 3 produk sesuai FR-08 & AC-08
    if (compareList.length >= 3) {
      setToastMessage('Maksimal 3 produk dapat dibandingkan sekaligus.');
      return false;
    }
    setCompareList((prev) => [...prev, product]);
    return true;
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (productId: string): boolean => {
    return compareList.some((item) => item.id === productId);
  };

  const dismissToast = () => {
    setToastMessage(null);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        toastMessage,
        dismissToast,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare harus digunakan di dalam CompareProvider');
  }
  return context;
};
```

---

### Langkah 8: Pembuatan Layout Utama Desktop-First (`resources/js/Layouts/AppLayout.tsx`)

Sesuai UX-01 dan UX-02, buat layout desktop-first dengan lebar kontainer maksimal `1280px`–`1440px`, *header* konsisten, slot *search bar* terpadu, dan *toast alert* terintegrasi.

```tsx
import React, { ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { useCompare } from '@/Contexts/CompareContext';
import { Laptop, Scale, AlertCircle, X } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
  headerSearchSlot?: ReactNode;
}

export default function AppLayout({ children, headerSearchSlot }: AppLayoutProps) {
  const { compareList, toastMessage, dismissToast } = useCompare();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Toast Peringatan Batas Maksimal Compare (AC-08) */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-amber-500 text-white px-5 py-3 rounded-lg shadow-xl animate-bounce">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium text-sm">{toastMessage}</span>
          <button onClick={dismissToast} className="ml-2 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Utama Konsisten (UX-02) */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between gap-8">
          {/* Logo Calosa Store */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/30 group-hover:bg-brand-600 transition-colors">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                CALOSA
              </span>
              <span className="text-xs font-semibold tracking-wider text-brand-500 uppercase">
                Laptop & Gadget
              </span>
            </div>
          </Link>

          {/* Slot Search Bar Tunggal (FR-01) */}
          <div className="flex-1 max-w-2xl">
            {headerSearchSlot ? (
              headerSearchSlot
            ) : (
              <div className="relative">
                <input
                  type="text"
                  disabled
                  placeholder="Cari laptop, komponen, aksesoris, atau tablet..."
                  className="w-full bg-slate-100 border border-slate-200 rounded-full px-5 py-2.5 text-sm text-slate-400 cursor-not-allowed"
                />
              </div>
            )}
          </div>

          {/* Menu Navigasi Global */}
          <nav className="flex items-center gap-6 flex-shrink-0">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-700 hover:text-brand-500 transition-colors"
            >
              Katalog Produk
            </Link>

            <Link
              href="/compare"
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
            >
              <Scale className="w-4 h-4 text-brand-500" />
              <span>Bandingkan</span>
              {compareList.length > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-brand-500 text-white rounded-full">
                  {compareList.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* Konten Halaman */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-6">
        <div className="max-w-[1440px] mx-auto px-6 flex justify-between items-center text-xs text-slate-500">
          <p>© 2026 Calosa Laptop & Gadget Store. Pengalaman Katalog & Perbandingan Produk.</p>
          <p>Desktop-First Experience ($\ge 1280\text{px}$)</p>
        </div>
      </footer>
    </div>
  );
}
```

---

### Langkah 9: Verifikasi & Pengujian Berjalan Lokal

Setelah seluruh kode di Langkah 1 s/d 8 siap:
1. Jalankan server Laravel:
   ```bash
   php artisan serve
   ```
2. Di terminal kedua, jalankan Vite dev server:
   ```bash
   npm.cmd run dev
   ```
3. Buka peramban di `http://127.0.0.1:8000` dan pastikan layout desktop-first tampil bersih tanpa error kompilasi TypeScript atau CSS.

---

## ✅ Kriteria Sukses Fase 1

Fase 1 dinyatakan selesai apabila:
1. [x] Proyek Laravel + Inertia React TypeScript berhasil terinisialisasi dan berjalan tanpa pesan kesalahan.
2. [x] Tailwind CSS dan `lucide-react` terkonfigurasi dengan palet tema Calosa.
3. [x] Struktur folder `resources/js/` modular telah dibuat.
4. [x] File `product.ts` mendefinisikan tipe data yang aman dan ketat.
5. [x] File `dummyProducts.ts` memuat minimal 12–16 produk dengan 4 kategori terpisah ketat, 3 cabang, dan data kosong (null image/null warranty/null description).
6. [x] `CompareContext` siap melacak produk terpilih hingga batas maksimal 3 produk.
7. [x] `AppLayout.tsx` terpasang dengan kontainer desktop 1280px–1440px, slot search bar tunggal, dan navigasi global yang stabil.
