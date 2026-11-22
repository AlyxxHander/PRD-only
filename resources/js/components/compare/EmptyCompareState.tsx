import React from 'react';
import { Link } from '@inertiajs/react';
import { Scale, ArrowLeft, PlusCircle } from 'lucide-react';

export default function EmptyCompareState() {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-2xl mx-auto shadow-sm my-8">
      {/* Ikon Ilustrasi */}
      <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-50 text-brand-500 border border-brand-100 flex items-center justify-center mb-6 shadow-inner">
        <Scale className="w-10 h-10" />
      </div>

      {/* Teks Penjelasan Ramah (FR-10, AC-10) */}
      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
        Belum Ada Produk yang Dipilih untuk Dibandingkan
      </h2>
      <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
        Anda dapat memilih 1 hingga maksimal 3 produk dari katalog toko maupun dari halaman detail produk dengan menekan tombol <strong>&ldquo;+ Bandingkan&rdquo;</strong>.
      </p>

      {/* Langkah Panduan Singkat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-8 text-left">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center mb-2">
            1
          </span>
          <h4 className="text-xs font-bold text-slate-800">Cari Produk</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Buka katalog atau gunakan kotak pencarian.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center mb-2">
            2
          </span>
          <h4 className="text-xs font-bold text-slate-800">Klik Bandingkan</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Tekan &ldquo;+ Bandingkan&rdquo; hingga 3 produk.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center mb-2">
            3
          </span>
          <h4 className="text-xs font-bold text-slate-800">Evaluasi Selisih</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Bandingkan spesifikasi berdampingan.
          </p>
        </div>
      </div>

      {/* Tombol CTA Utama (AC-10) */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-lg shadow-brand-500/20 transition-all hover:gap-3"
      >
        <PlusCircle className="w-4 h-4" />
        <span>Pilih Produk di Katalog Sekarang</span>
      </Link>
    </div>
  );
}