import React from 'react';
import { useFilter } from '@/contexts/FilterContext';
import { X, RotateCcw } from 'lucide-react';

export default function ActiveFilterChips() {
  const {
    filters,
    totalResults,
    activeFilterCount,
    setSearchQuery,
    toggleCategory,
    toggleBranch,
    toggleBrand,
    setPriceRange,
    resetFilters,
  } = useFilter();

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Counter Total Produk & Status */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-900">
            Katalog Produk
          </span>
          <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-semibold">
            {totalResults} produk ditemukan
          </span>
        </div>

        {/* Tombol Reset Semua Filter (FR-04, AC-05) */}
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Semua Filter</span>
          </button>
        )}
      </div>

      {/* Deretan Tag / Chip Filter Aktif (AC-05) */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-400 font-medium">
            Filter aktif:
          </span>

          {/* Chip Kata Kunci Pencarian */}
          {filters.searchQuery.trim() && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-medium">
              <span>Cari: &ldquo;{filters.searchQuery}&rdquo;</span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="hover:bg-brand-200/60 rounded-full p-0.5 transition-colors"
                title="Hapus filter pencarian"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Chip Kategori */}
          {filters.selectedCategories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium"
            >
              <span>{cat}</span>
              <button
                type="button"
                onClick={() => toggleCategory(cat)}
                className="hover:bg-blue-200/60 rounded-full p-0.5 transition-colors"
                title={`Hapus kategori ${cat}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {/* Chip Cabang Toko */}
          {filters.selectedBranches.map((branch) => (
            <span
              key={branch}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium"
            >
              <span>{branch}</span>
              <button
                type="button"
                onClick={() => toggleBranch(branch)}
                className="hover:bg-emerald-200/60 rounded-full p-0.5 transition-colors"
                title={`Hapus cabang ${branch}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {/* Chip Merek */}
          {filters.selectedBrands.map((brand) => (
            <span
              key={brand}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-medium"
            >
              <span>Merek: {brand}</span>
              <button
                type="button"
                onClick={() => toggleBrand(brand)}
                className="hover:bg-purple-200/60 rounded-full p-0.5 transition-colors"
                title={`Hapus merek ${brand}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {/* Chip Rentang Harga */}
          {(filters.minPrice !== null || filters.maxPrice !== null) && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium">
              <span>
                Harga:{' '}
                {filters.minPrice !== null ? formatRupiah(filters.minPrice) : 'Rp 0'}{' '}
                –{' '}
                {filters.maxPrice !== null
                  ? formatRupiah(filters.maxPrice)
                  : 'Tak Hingga'}
              </span>
              <button
                type="button"
                onClick={() => setPriceRange(null, null)}
                className="hover:bg-amber-200/60 rounded-full p-0.5 transition-colors"
                title="Hapus filter harga"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}