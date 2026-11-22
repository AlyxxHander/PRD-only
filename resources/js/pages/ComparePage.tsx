import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { useCompare } from '@/contexts/CompareContext';
import EmptyCompareState from '@/components/compare/EmptyCompareState';
import CompareTable from '@/components/compare/CompareTable';
import { ArrowLeft, Trash2 } from 'lucide-react';

export default function ComparePage() {
  const { compareList, clearCompare } = useCompare();

  return (
    <AppLayout>
      <Head title="Perbandingan Spesifikasi Produk — Calosa Store" />

      <div className="space-y-6">
        {/* Header Halaman */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/"
                className="text-xs font-semibold text-slate-500 hover:text-brand-500 flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Katalog</span>
              </Link>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Bandingkan Produk
            </h1>
          </div>

          {compareList.length > 0 && (
            <button
              type="button"
              onClick={clearCompare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Kosongkan Semua</span>
            </button>
          )}
        </div>

        {/* Tampilan Kondisi: Kosong vs Tabel Komparasi */}
        {compareList.length === 0 ? (
          <EmptyCompareState />
        ) : (
          <CompareTable />
        )}
      </div>
    </AppLayout>
  );
}