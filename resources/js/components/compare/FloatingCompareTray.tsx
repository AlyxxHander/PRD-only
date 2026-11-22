import React from 'react';
import { Link } from '@inertiajs/react';
import { useCompare } from '@/contexts/CompareContext';
import ImageWithFallback from '@/components/catalog/ImageWithFallback';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';

export default function FloatingCompareTray() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();



  // Hitung berapa slot kosong dari maksimal 3 produk
  const emptySlotsCount = Math.max(0, 3 - compareList.length);
  // Check apakah compare list kosong atau tidak 
  const emptyCompareList = compareList.length === 0;

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-4xl px-4 ${emptyCompareList ? "animate-slideDown" : "animate-slideUp"}`}>
      <div className="bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/60 rounded-2xl p-4 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        {/* Info & Counter */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/30 flex-shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight">
                Perbandingan Produk
              </span>
              <span className="px-2 py-0.5 rounded-full bg-brand-500/30 text-brand-300 border border-brand-500/40 text-[11px] font-bold">
                {compareList.length}/3 Terpilih
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Pilih hingga 3 produk untuk dibandingkan berdampingan
            </p>
          </div>
        </div>

        {/* Daftar Thumbnail Produk & Slot Kosong */}
        <div className="flex items-center gap-3">
          {/* Produk yang sudah dipilih */}
          {compareList.map((product) => (
            <div
              key={product.id}
              className="relative group bg-slate-800 rounded-xl border border-slate-700 p-1.5 flex items-center gap-2.5 max-w-[170px]"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-900 overflow-hidden flex-shrink-0 flex items-center justify-center">
                <ImageWithFallback
                  src={product.imageUrl}
                  alt={product.name}
                  aspectRatioClass="w-9 h-9"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-semibold text-slate-200 truncate pr-4">
                {product.name}
              </span>

              {/* Tombol Hapus per Item */}
              <button
                type="button"
                onClick={() => removeFromCompare(product.id)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center text-[10px] shadow-sm transition-transform hover:scale-110"
                title={`Hapus ${product.name}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {/* Slot Kosong Tersisa */}
          {Array.from({ length: emptySlotsCount }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="hidden sm:flex items-center justify-center px-3 py-2 rounded-xl border border-dashed border-slate-700 text-slate-500 text-xs font-medium"
            >
              + Slot Kosong
            </div>
          ))}
        </div>

        {/* Tombol Aksi */}
        <div className="flex items-center gap-2">
          {/* Tombol Kosongkan Semua */}
          <button
            type="button"
            onClick={clearCompare}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors text-xs flex items-center gap-1 font-medium"
            title="Kosongkan daftar perbandingan"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden md:inline">Kosongkan</span>
          </button>

          {/* Tombol CTA Bandingkan Sekarang */}
          <Link
            href="/compare"
            className="py-2.5 px-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-brand-500/25 transition-all hover:gap-3"
          >
            <span>Bandingkan Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}