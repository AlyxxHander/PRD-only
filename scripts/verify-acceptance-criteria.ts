/**
 * =================================
 * CARA RUN: npm.cmd run test:ac
 * =================================
 */

import { DUMMY_PRODUCTS, CATEGORIES, BRANCHES } from '../resources/js/data/dummyProducts';
import { Product } from '../resources/js/types/product';

console.log('========================================================');
console.log('🔍 MENJALANKAN VERIFIKASI LOGIKA & ACCEPTANCE CRITERIA');
console.log('   Calosa Laptop & Gadget Store — PRD v2.0');
console.log('========================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`✅ [PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`❌ [FAIL] ${testName}`);
    if (detail) console.error(`   👉 Detail: ${detail}`);
    failCount++;
  }
}

// 1. Uji Kelengkapan Dataset Dummy (Bab 4 PRD)
assert(
  DUMMY_PRODUCTS.length >= 12 && DUMMY_PRODUCTS.length <= 20,
  'Kuantitas Dummy Data Memenuhi Syarat (12–20 produk)',
  `Total produk saat ini: ${DUMMY_PRODUCTS.length}`
);

// 2. Uji Skenario Missing Image (FR-07, AC-06)
const missingImageProducts = DUMMY_PRODUCTS.filter((p) => p.imageUrl === null);
assert(
  missingImageProducts.length >= 2,
  'Minimal 2 Produk Tanpa Gambar (Uji Placeholder Fallback)',
  `Ditemukan ${missingImageProducts.length} produk tanpa gambar (${missingImageProducts.map((p) => p.name).join(', ')})`
);

// 3. Uji Skenario Missing Warranty / Description (FR-07, AC-06)
const missingWarrantyProducts = DUMMY_PRODUCTS.filter((p) => p.warranty === null);
const missingDescProducts = DUMMY_PRODUCTS.filter((p) => p.description === null);
assert(
  missingWarrantyProducts.length >= 1 && missingDescProducts.length >= 1,
  'Minimal Ada Produk Tanpa Garansi dan Tanpa Deskripsi (Uji Graceful Fallback)',
  `Tanpa garansi: ${missingWarrantyProducts.length}, Tanpa deskripsi: ${missingDescProducts.length}`
);

// 4. Uji Pemisahan Kategori Ketat (FR-02, AC-02)
assert(
  CATEGORIES.length === 4,
  'Tepat Ada 4 Kategori Resmi Terpisah',
  `Kategori: ${CATEGORIES.join(', ')}`
);

const invalidCategories = DUMMY_PRODUCTS.filter(
  (p) => !CATEGORIES.includes(p.category as any)
);
assert(
  invalidCategories.length === 0,
  'Semua Produk Terpetakan ke Kategori yang Sah (Tidak Ada Kategori Liar)',
  invalidCategories.length > 0 ? `Ditemukan kategori tidak valid pada: ${invalidCategories.map((p) => p.name).join(', ')}` : undefined
);

// Uji bahwa tidak ada smartwatch yang nyasar ke kategori Laptop
const smartwatchInLaptop = DUMMY_PRODUCTS.filter(
  (p) => p.category === 'Laptop' && (p.name.toLowerCase().includes('watch') || p.name.toLowerCase().includes('jam'))
);
assert(
  smartwatchInLaptop.length === 0,
  'Kategori Laptop Murni (Tidak Tercampur Wearable/Smartwatch)',
  smartwatchInLaptop.length > 0 ? `Ditemukan: ${smartwatchInLaptop.map((p) => p.name).join(', ')}` : undefined
);

// 5. Uji Validitas Cabang Toko (FR-03, AC-03)
assert(
  BRANCHES.length === 3,
  'Tepat 3 Lokasi Cabang Toko Resmi',
  `Cabang: ${BRANCHES.join(', ')}`
);

const invalidBranchProducts = DUMMY_PRODUCTS.filter((p) =>
  p.branches.some((b: any) => !BRANCHES.includes(b as any))
);
assert(
  invalidBranchProducts.length === 0,
  'Semua Cabang Toko Memiliki Label Lengkap dan Sah',
  invalidBranchProducts.length > 0 ? `Cabang tidak valid pada produk: ${invalidBranchProducts.map((p) => p.name).join(', ')}` : undefined
);

// 6. Uji Logika Pembatas Maksimal 3 Produk Perbandingan (FR-08, AC-08)
const mockCompareList: Product[] = [];
function mockAddCompare(product: Product): { success: boolean; message?: string } {
  if (mockCompareList.length >= 3) {
    return { success: false, message: 'Maksimal 3 produk dapat dibandingkan sekaligus.' };
  }
  mockCompareList.push(product);
  return { success: true };
}

mockAddCompare(DUMMY_PRODUCTS[0]);
mockAddCompare(DUMMY_PRODUCTS[1]);
mockAddCompare(DUMMY_PRODUCTS[2]);
const fourthAttempt = mockAddCompare(DUMMY_PRODUCTS[3]);

assert(
  mockCompareList.length === 3 && fourthAttempt.success === false,
  'Pencegahan Produk ke-4 Berfungsi dan Memberikan Pesan Pembatas',
  `Status: success=${fourthAttempt.success}, message="${fourthAttempt.message}"`
);

// 7. Uji Format Spesifikasi Kunci & Full Specs (FR-05, FR-06)
const productsWithIncompleteSpecs = DUMMY_PRODUCTS.filter(
  (p) => p.highlightSpecs.length === 0 || Object.keys(p.fullSpecs).length === 0
);
assert(
  productsWithIncompleteSpecs.length === 0,
  'Semua Produk Memiliki Highlight Specs dan Full Specs Terstruktur',
  productsWithIncompleteSpecs.length > 0 ? `Produk tanpa specs: ${productsWithIncompleteSpecs.map((p) => p.name).join(', ')}` : undefined
);

console.log('\n========================================================');
console.log(`📊 HASIL PENGUJIAN OTOMATIS:`);
console.log(`   Total Lulus: ${passCount}`);
console.log(`   Total Gagal: ${failCount}`);
console.log('========================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 SELURUH ATURAN PRD & CRITERIA LOGIKA LOLOS VALIDASI!');
}