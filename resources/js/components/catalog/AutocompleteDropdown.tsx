import React from 'react';
import { Link } from '@inertiajs/react';
import { Product } from '@/types/product';
import { Search, Tag, ImageOff, ArrowRight } from 'lucide-react';

interface AutocompleteDropdownProps {
  query: string;
  matchedProducts: Product[];
  matchedCategories: string[];
  matchedBrands: string[];
  onSelectSuggestion: (value: string) => void;
  onViewAllResults: () => void;
}

export default function AutocompleteDropdown({
  query,
  matchedProducts,
  matchedCategories,
  matchedBrands,
  onSelectSuggestion,
  onViewAllResults,
}: AutocompleteDropdownProps) {
  // Format mata uang Rupiah
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Batasi pratinjau produk maksimal 4 item (FR-01)
  const previewProducts = matchedProducts.slice(0, 4);
  const hasResults = previewProducts.length > 0 || matchedCategories.length > 0 || matchedBrands.length > 0;

  if (!hasResults) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-50 text-center animate-fadeIn">
        <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
          <Search className="w-6 h-6" />
        </div>
        <p className="text-sm font-semibold text-slate-800">
          Produk tidak ditemukan
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Tidak ada produk atau merek yang cocok dengan kata kunci &ldquo;<span className="font-medium text-slate-700">{query}</span>&rdquo;.
        </p>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-fadeIn">
      {/* Bagian 1: Saran Kata Kunci & Kategori */}
      {(matchedBrands.length > 0 || matchedCategories.length > 0) && (
        <div className="p-3 bg-slate-50/80 border-b border-slate-100">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1.5 flex items-center gap-1.5">
            <Tag className="w-3 h-3" />
            Saran Kata Kunci & Kategori
          </div>
          <div className="flex flex-wrap gap-1.5 px-2">
            {matchedCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectSuggestion(cat)}
                className="text-xs bg-brand-50 text-brand-600 hover:bg-brand-100 px-2.5 py-1 rounded-full font-medium transition-colors"
              >
                Kategori: {cat}
              </button>
            ))}
            {matchedBrands.map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => onSelectSuggestion(brand)}
                className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-2.5 py-1 rounded-full font-medium transition-colors"
              >
                Merek: {brand}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bagian 2: Pratinjau Produk (Maks. 4 Produk - FR-01) */}
      <div className="p-3">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
          Pratinjau Produk ({previewProducts.length} dari {matchedProducts.length})
        </div>

        <div className="space-y-1">
          {previewProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              {/* Thumbnail atau Placeholder Gambar (FR-07, AC-06) */}
              <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0 overflow-hidden flex items-center justify-center">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <ImageOff className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* Info Produk */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {product.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {product.brand}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-800 truncate group-hover:text-brand-500 transition-colors">
                  {product.name}
                </h4>
              </div>

              {/* Harga */}
              <div className="text-right flex-shrink-0">
                <span className="text-sm font-bold text-brand-600 block">
                  {formatRupiah(product.price)}
                </span>
                <span className="text-[10px] text-emerald-600 font-medium">
                  {product.branches.length} Cabang
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bagian 3: Tombol Aksi "Lihat Semua Hasil" */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
        <button
          type="button"
          onClick={onViewAllResults}
          className="w-full py-2 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <span>Lihat semua {matchedProducts.length} hasil untuk &ldquo;{query}&rdquo;</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}