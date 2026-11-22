import React, { ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { CompareProvider, useCompare } from '@/contexts/CompareContext';
import { FilterProvider } from '@/contexts/FilterContext';
import SearchBar from '@/components/catalog/SearchBar';
import { Laptop, Scale, AlertCircle, X } from 'lucide-react';
import FloatingCompareTray from '@/components/compare/FloatingCompareTray';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayoutContent({ children }: AppLayoutProps) {
  const { compareList, toastMessage, dismissToast } = useCompare();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Toast Peringatan Batas Maksimal Compare (AC-08) */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-amber-500 text-white px-5 py-3 rounded-lg shadow-xl animate-bounce">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium text-sm">{toastMessage}</span>
          <button onClick={dismissToast} className="ml-2 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Utama Konsisten (UX-02) */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between gap-8">
          {/* Logo Calosa Store */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/30 group-hover:bg-brand-600 transition-colors">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                CALOSA
              </span>
              <span className="text-xs font-semibold tracking-wider text-brand-500 uppercase">
                Laptop & Gadget
              </span>
            </div>
          </Link>

          {/* Unified Single Search Bar (FR-01, AC-01) */}
          <div className="flex-1 max-w-2xl">
            <SearchBar />
          </div>

          {/* Menu Navigasi Global */}
          <nav className="flex items-center gap-6 flex-shrink-0">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-700 hover:text-brand-500 transition-colors"
            >
              Katalog Produk
            </Link>

            <Link
              href="/compare"
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
            >
              <Scale className="w-4 h-4 text-brand-500" />
              <span>Bandingkan</span>
              {compareList.length > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-brand-500 text-white rounded-full">
                  {compareList.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* Konten Halaman */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-6">
        <div className="max-w-[1440px] mx-auto px-6 flex justify-between items-center text-xs text-slate-500">
          <p>© 2026 Calosa Laptop & Gadget Store. Pengalaman Katalog & Perbandingan Produk.</p>
        </div>
      </footer>
      <FloatingCompareTray />
    </div>
  );
}

// Wrapper utama yang menyertakan FilterProvider
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <CompareProvider>
      <FilterProvider>
        <AppLayoutContent>{children}</AppLayoutContent>
      </FilterProvider>
    </CompareProvider>
  );
}