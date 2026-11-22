import React, { useMemo } from 'react';
import { useFilter } from '@/contexts/FilterContext';
import { CATEGORIES, BRANCHES, DUMMY_PRODUCTS } from '@/data/dummyProducts';
import { Category, BranchLocation } from '@/types/product';
import PriceRangeFilter from '@/components/catalog/PriceRangeFilter';
import { Filter, RotateCcw, ChevronDown, Laptop, Cpu, Mouse, Tablet } from 'lucide-react';

export default function FilterSidebar() {
  const {
    filters,
    toggleCategory,
    toggleBranch,
    toggleBrand,
    resetFilters,
    activeFilterCount,
    availableBrands,
  } = useFilter();

  // Hitung jumlah produk per kategori untuk mempermudah navigasi
  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORIES.forEach((cat) => {
      counts[cat] = DUMMY_PRODUCTS.filter((p) => p.category === cat).length;
    });
    return counts;
  }, []);

  // Ikon pendukung tiap kategori
  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case 'Laptop':
        return <Laptop className="w-3.5 h-3.5 text-blue-500" />;
      case 'Komponen PC':
        return <Cpu className="w-3.5 h-3.5 text-purple-500" />;
      case 'Aksesoris':
        return <Mouse className="w-3.5 h-3.5 text-emerald-500" />;
      case 'Tablet & Wearable':
        return <Tablet className="w-3.5 h-3.5 text-amber-500" />;
    }
  };

  return (
    <aside className="w-[280px] flex-shrink-0">
      {/* Sticky Container Desktop (UX-01) */}
      <div className="sticky top-28 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-6">
        {/* Header Sidebar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Filter className="w-4 h-4 text-brand-500" />
            <span>Filter Katalog</span>
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-brand-500 hover:text-brand-600 flex items-center gap-1 transition-colors"
              title="Reset semua filter ke kondisi awal"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* 1. Filter Kategori (FR-02, AC-02) */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Kategori Produk</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </h4>
          <div className="space-y-2">
            {CATEGORIES.map((cat) => {
              const isChecked = filters.selectedCategories.includes(cat);
              return (
                <label
                  key={cat}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium cursor-pointer transition-colors ${isChecked
                      ? 'bg-brand-50 text-brand-700 font-semibold'
                      : 'hover:bg-slate-50 text-slate-700'
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCategory(cat)}
                      className="w-4 h-4 text-brand-500 rounded border-slate-300 focus:ring-brand-500 focus:ring-offset-0 transition-colors"
                    />
                    <span className="flex items-center gap-1.5">
                      {getCategoryIcon(cat)}
                      {cat}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-normal">
                    ({categoryCount[cat] || 0})
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* 2. Filter Cabang Toko (FR-03, AC-03) */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Cabang Toko Calosa</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </h4>
          <div className="space-y-2.5">
            {BRANCHES.map((branch) => {
              const isChecked = filters.selectedBranches.includes(branch as BranchLocation);
              return (
                <label
                  key={branch}
                  className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-900 group"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleBranch(branch as BranchLocation)}
                    className="w-4 h-4 mt-0.5 text-brand-500 rounded border-slate-300 focus:ring-brand-500 focus:ring-offset-0 transition-colors"
                  />
                  <span className={`leading-relaxed ${isChecked ? 'font-semibold text-brand-700' : ''}`}>
                    {branch}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* 3. Filter Rentang Harga (FR-03, AC-04) */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            Rentang Harga (Rp)
          </h4>
          <PriceRangeFilter />
        </div>

        {/* 4. Filter Merek (FR-03) */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Merek Produk</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </h4>
          <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {availableBrands.map((brand) => {
              const isChecked = filters.selectedBrands.includes(brand);
              return (
                <label
                  key={brand}
                  className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-900"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 text-brand-500 rounded border-slate-300 focus:ring-brand-500 focus:ring-offset-0 transition-colors"
                  />
                  <span className={isChecked ? 'font-semibold text-brand-700' : ''}>
                    {brand}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}