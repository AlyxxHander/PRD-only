import React from 'react';
import { Link } from '@inertiajs/react';
import { Product } from '@/types/product';
import { useCompare } from '@/contexts/CompareContext';
import ImageWithFallback from '@/components/catalog/ImageWithFallback';
import { MapPin, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();
  const selected = isInCompare(product.id);

  // Format harga Rupiah kontras tinggi (UX-04)
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Toggle status perbandingan (AC-07)
  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (selected) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Gambar Produk dengan Fallback (FR-07) */}
        <div className="relative overflow-hidden bg-slate-100">
          <Link href={`/product/${product.id}`} className="block">
            <ImageWithFallback
              src={product.imageUrl}
              alt={product.name}
              aspectRatioClass="h-48 w-full"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Lencana Kategori */}
          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-semibold text-slate-700 shadow-sm border border-slate-100">
            {product.category}
          </span>
        </div>

        {/* Konten Utama Kartu */}
        <div className="p-5">
          {/* Merek & Status Cabang */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-bold uppercase tracking-wider text-slate-500">
              {product.brand}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
              <MapPin className="w-3 h-3" />
              {product.branches.length} Cabang
            </span>
          </div>

          {/* Nama Produk (Maks 2 Baris / Ellipsis - FR-05) */}
          <Link href={`/product/${product.id}`}>
            <h3
              className="text-sm font-bold text-slate-800 line-clamp-2 min-h-[2.5rem] leading-snug group-hover:text-brand-600 transition-colors"
              title={product.name}
            >
              {product.name}
            </h3>
          </Link>

          {/* Ringkasan Spesifikasi Kunci (Highlight Specs - FR-05) */}
          <div className="mt-3 flex flex-wrap gap-1.5 min-h-[3.25rem] content-start">
            {product.highlightSpecs.map((spec, i) => (
              <span
                key={i}
                className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Kartu: Harga & Tombol Aksi */}
      <div className="p-5 pt-0 border-t border-slate-100 mt-2">
        {/* Harga */}
        <div className="pt-3 pb-3 flex items-baseline justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-medium block">
              Harga Mulai
            </span>
            <span className="text-base font-extrabold text-brand-600 tracking-tight">
              {formatRupiah(product.price)}
            </span>
          </div>
        </div>

        {/* Tombol Aksi Ganda (FR-05, UX-05, AC-07) */}
        <div className="grid grid-cols-2 gap-2">
          {/* Tombol Toggle Compare dengan Status Kontras (UX-05) */}
          <button
            type="button"
            onClick={handleToggleCompare}
            className={`py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${selected
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shadow-emerald-500/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            title={selected ? 'Hapus dari perbandingan' : 'Tambah ke perbandingan'}
          >
            {selected ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Terpilih ✓</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Bandingkan</span>
              </>
            )}
          </button>

          {/* Tombol Lihat Detail */}
          <Link
            href={`/product/${product.id}`}
            className="py-2 px-2.5 rounded-xl text-xs font-semibold text-center bg-slate-900 hover:bg-brand-600 text-white transition-colors shadow-sm"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
}