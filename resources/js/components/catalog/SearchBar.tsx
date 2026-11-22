import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useFilter } from '@/contexts/FilterContext';
import { DUMMY_PRODUCTS, CATEGORIES } from '@/data/dummyProducts';
import AutocompleteDropdown from '@/components/catalog/AutocompleteDropdown';
import { Search, X, Loader2 } from 'lucide-react';

export default function SearchBar() {
  const { filters, setSearchQuery } = useFilter();
  const [inputValue, setInputValue] = useState(filters.searchQuery);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sinkronkan input lokal saat state global direset dari luar
  useEffect(() => {
    setInputValue(filters.searchQuery);
  }, [filters.searchQuery]);

  // Debounce input pencarian (350ms)
  useEffect(() => {
    if (inputValue.trim().length >= 2) {
      setIsDebouncing(true);
    }

    const timer = setTimeout(() => {
      setIsDebouncing(false);
      // Buka dropdown jika karakter >= 2 (FR-01, AC-01)
      if (inputValue.trim().length >= 2) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [inputValue]);

  // Klik di luar container untuk menutup dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter Produk untuk Pratinjau Autocomplete
  const matchedProducts = useMemo(() => {
    const q = inputValue.trim().toLowerCase();
    if (q.length < 2) return [];

    return DUMMY_PRODUCTS.filter((product) => {
      const matchName = product.name.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      return matchName || matchBrand || matchCategory;
    });
  }, [inputValue]);

  // Filter Kategori yang cocok
  const matchedCategories = useMemo(() => {
    const q = inputValue.trim().toLowerCase();
    if (q.length < 2) return [];
    return CATEGORIES.filter((c) => c.toLowerCase().includes(q));
  }, [inputValue]);

  // Filter Merek yang cocok
  const matchedBrands = useMemo(() => {
    const q = inputValue.trim().toLowerCase();
    if (q.length < 2) return [];

    const brands = new Set<string>();
    DUMMY_PRODUCTS.forEach((p) => {
      if (p.brand.toLowerCase().includes(q)) {
        brands.add(p.brand);
      }
    });
    return Array.from(brands);
  }, [inputValue]);

  // Eksekusi Pencarian ke Halaman Utama
  const handleExecuteSearch = (queryToApply?: string) => {
    const finalQuery = (queryToApply !== undefined ? queryToApply : inputValue).trim();
    setSearchQuery(finalQuery);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecuteSearch();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setInputValue('');
    setSearchQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Form Input Bar */}
      <div className="relative flex items-center">
        <div className="absolute left-4 text-slate-400 pointer-events-none flex items-center">
          {isDebouncing ? (
            <Loader2 className="w-5 h-5 animate-spin text-brand-500" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </div>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => {
            if (inputValue.trim().length >= 2) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="Cari laptop, komponen, aksesoris, atau merek (misal: ASUS, RAM, Logitech)..."
          className="w-full bg-slate-100 hover:bg-slate-200/70 focus:bg-white border border-transparent focus:border-brand-500 rounded-full pl-12 pr-11 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-all outline-none focus:ring-4 focus:ring-brand-500/10 shadow-inner"
        />

        {/* Tombol Clear (X) */}
        {inputValue.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200 transition-colors"
            title="Hapus pencarian"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown Autocomplete (Aktif jika isOpen && input >= 2 karakter) */}
      {isOpen && inputValue.trim().length >= 2 && (
        <AutocompleteDropdown
          query={inputValue.trim()}
          matchedProducts={matchedProducts}
          matchedCategories={matchedCategories}
          matchedBrands={matchedBrands}
          onSelectSuggestion={(val) => {
            setInputValue(val);
            handleExecuteSearch(val);
          }}
          onViewAllResults={() => handleExecuteSearch()}
        />
      )}
    </div>
  );
}