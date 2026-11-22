import React, { useState, useMemo } from 'react';
import { Link } from '@inertiajs/react';
import { Product } from '@/types/product';
import { useCompare } from '@/contexts/CompareContext';
import ImageWithFallback from '@/components/catalog/ImageWithFallback';
import {
  X,
  Plus,
  Sparkles,
  MapPin,
  ShieldCheck,
  ShieldAlert,
  Layers,
} from 'lucide-react';

export default function CompareTable() {
  const { compareList, removeFromCompare } = useCompare();
  const [highlightDiff, setHighlightDiff] = useState(false);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Kumpulkan seluruh kunci spesifikasi unik dari semua produk pembanding
  const allSpecKeys = useMemo(() => {
    const keys = new Set<string>();
    compareList.forEach((product) => {
      Object.keys(product.fullSpecs).forEach((key) => keys.add(key));
    });
    return Array.from(keys);
  }, [compareList]);

  // Fungsi pengecekan apakah nilai baris spesifikasi berbeda antar produk
  const isDifferent = (key: string): boolean => {
    if (compareList.length < 2) return false;
    const firstVal = compareList[0].fullSpecs[key] || '—';
    return compareList.some(
      (prod) => (prod.fullSpecs[key] || '—') !== firstVal
    );
  };

  // Jumlah slot kosong yang perlu ditampilkan (maks 3 kolom)
  const remainingSlots = Math.max(0, 3 - compareList.length);

  return (
    <div className="space-y-6">
      {/* Kontrol Atas: Toggle Soroti Perbedaan */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-brand-500" />
          <span className="text-sm font-bold text-slate-900">
            Perbandingan Berdampingan ({compareList.length} dari maks. 3 produk)
          </span>
        </div>

        {compareList.length >= 2 && (
          <label className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors text-xs font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={highlightDiff}
              onChange={(e) => setHighlightDiff(e.target.checked)}
              className="w-4 h-4 text-brand-500 rounded border-slate-300 focus:ring-brand-500 transition-colors"
            />
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Soroti Perbedaan Spesifikasi</span>
          </label>
        )}
      </div>

      {/* Tabel Komparasi Utama */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            {/* 1. Header Produk: Gambar, Nama, Kategori, Harga & Tombol Hapus */}
            <tr className="border-b border-slate-200 bg-slate-50/50">
              <th className="w-1/4 p-6 align-top font-bold text-slate-400 text-xs uppercase tracking-wider">
                Produk
              </th>

              {/* Kolom Produk Terpilih */}
              {compareList.map((product) => (
                <th key={product.id} className="w-1/4 p-6 align-top">
                  <div className="relative bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between h-full group">
                    {/* Tombol Hapus per Item */}
                    <button
                      type="button"
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-500 border border-slate-200 flex items-center justify-center text-xs transition-colors shadow-sm"
                      title="Hapus dari perbandingan"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    {/* Gambar Thumbnail */}
                    <div className="h-36 w-full rounded-xl bg-slate-100 overflow-hidden flex items-center justify-center mb-3">
                      <ImageWithFallback
                        src={product.imageUrl}
                        alt={product.name}
                        aspectRatioClass="h-36 w-full"
                        className="w-full h-36 object-cover"
                      />
                    </div>

                    {/* Info Ringkas */}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {product.brand}
                    </span>
                    <Link
                      href={`/product/${product.id}`}
                      className="text-xs font-bold text-slate-900 line-clamp-2 hover:text-brand-600 transition-colors mt-0.5"
                    >
                      {product.name}
                    </Link>

                    {/* Harga Kontras */}
                    <span className="text-sm font-extrabold text-brand-600 mt-2 block">
                      {formatRupiah(product.price)}
                    </span>
                  </div>
                </th>
              ))}

              {/* Slot Kosong Interaktif (Partial State - FR-10, AC-10) */}
              {Array.from({ length: remainingSlots }).map((_, idx) => (
                <th key={`slot-${idx}`} className="w-1/4 p-6 align-top">
                  <Link
                    href="/"
                    className="h-full min-h-[220px] rounded-2xl border-2 border-dashed border-slate-200 hover:border-brand-400 hover:bg-brand-50/30 transition-all flex flex-col items-center justify-center p-4 text-center group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-brand-500 group-hover:text-white text-slate-400 flex items-center justify-center mb-2 transition-colors">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 group-hover:text-brand-600 transition-colors">
                      + Tambah Produk Pembanding
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1">
                      Pilih produk dari katalog
                    </span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs">
            {/* 2. Baris Kategori */}
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="p-4 font-semibold text-slate-500 bg-slate-50/70">
                Kategori
              </td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4 font-medium text-slate-800">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold">
                    {p.category}
                  </span>
                </td>
              ))}
              {Array.from({ length: remainingSlots }).map((_, idx) => (
                <td key={idx} className="p-4 text-slate-300 italic">
                  —
                </td>
              ))}
            </tr>

            {/* 3. Baris Status Garansi */}
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="p-4 font-semibold text-slate-500 bg-slate-50/70">
                Garansi Resmi
              </td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4">
                  {p.warranty ? (
                    <span className="flex items-center gap-1.5 text-slate-800 font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{p.warranty}</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-amber-700 italic">
                      <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span>Informasi belum dicantumkan</span>
                    </span>
                  )}
                </td>
              ))}
              {Array.from({ length: remainingSlots }).map((_, idx) => (
                <td key={idx} className="p-4 text-slate-300 italic">
                  —
                </td>
              ))}
            </tr>

            {/* 4. Baris Ketersediaan Cabang */}
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="p-4 font-semibold text-slate-500 bg-slate-50/70">
                Ketersediaan Cabang
              </td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4">
                  <div className="space-y-1">
                    {p.branches.map((b, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 text-[11px] text-slate-700"
                      >
                        <MapPin className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </td>
              ))}
              {Array.from({ length: remainingSlots }).map((_, idx) => (
                <td key={idx} className="p-4 text-slate-300 italic">
                  —
                </td>
              ))}
            </tr>

            {/* 5. Header Seksi Spesifikasi Teknis */}
            <tr className="bg-slate-100 font-bold text-slate-700 text-xs uppercase tracking-wider">
              <td colSpan={4} className="py-2.5 px-4">
                Spesifikasi Teknis
              </td>
            </tr>

            {/* 6. Baris-Baris Spesifikasi Teknis Sejajar */}
            {allSpecKeys.map((key, rowIdx) => {
              const diff = highlightDiff && isDifferent(key);
              return (
                <tr
                  key={key}
                  className={`transition-colors ${diff
                      ? 'bg-amber-50/80 font-medium' // Highlight Perbedaan Spesifikasi (FR-09)
                      : rowIdx % 2 === 0
                        ? 'bg-white'
                        : 'bg-slate-50/40' // Zebra striping (UX-04)
                    }`}
                >
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/70 flex items-center justify-between">
                    <span>{key}</span>
                    {diff && (
                      <span className="text-[10px] text-amber-700 font-bold px-1.5 py-0.5 rounded bg-amber-200/60">
                        Berbeda
                      </span>
                    )}
                  </td>

                  {/* Nilai Spesifikasi per Produk */}
                  {compareList.map((product) => {
                    const val = product.fullSpecs[key];
                    return (
                      <td
                        key={product.id}
                        className="p-4 text-slate-800 leading-relaxed font-medium align-top"
                      >
                        {/* Simbol — jika atribut tidak dimiliki (FR-09) */}
                        {val || <span className="text-slate-400 font-normal italic">— Tidak tersedia</span>}
                      </td>
                    );
                  })}

                  {/* Slot kosong */}
                  {Array.from({ length: remainingSlots }).map((_, idx) => (
                    <td key={idx} className="p-4 text-slate-300 italic">
                      —
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}