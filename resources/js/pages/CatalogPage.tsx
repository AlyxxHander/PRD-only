import React from 'react';
import { useFilter } from '@/contexts/FilterContext';
import { Head, Link } from '@inertiajs/react';
import FilterSidebar from '@/components/catalog/FilterSidebar';
import ActiveFilterChips from '@/components/catalog/ActiveFilterChips';
import { Search, ImageOff, RotateCcw, MapPin } from 'lucide-react';
import ProductCard from '@/components/catalog/ProductCard';

export default function CatalogPage() {
  const { filteredProducts, resetFilters } = useFilter();

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <>
      <Head title="Katalog Produk & Filter Realtime — Calosa Store" />

      {/* Kontainer Desktop-First (UX-01: 2 Kolom) */}
      <div className="flex gap-8 items-start">
        {/* Kolom Kiri: Sticky Sidebar Filter (260px - 280px) */}
        <FilterSidebar />

        {/* Kolom Kanan: Header Filter Aktif & Grid Produk */}
        <section className="flex-1 min-w-0">
          {/* Indikator Filter Aktif, Counter & Tombol Reset (FR-04, AC-05) */}
          <ActiveFilterChips />

          {/* Grid Katalog Produk (Desktop 3 Kolom - UX-01) */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Empty State Filter (UX-03) */
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                Tidak Ada Produk yang Cocok
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
                Tidak ada produk di Calosa Store yang memenuhi kombinasi filter aktif saat ini. Coba longgarkan kriteria atau reset filter.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold transition-colors shadow-md shadow-brand-500/20"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Semua Filter</span>
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}