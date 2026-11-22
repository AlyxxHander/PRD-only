import React, { useState, useEffect } from 'react';
import { useFilter } from '@/contexts/FilterContext';
import { Check } from 'lucide-react';

export default function PriceRangeFilter() {
  const { filters, setPriceRange } = useFilter();

  const [minInput, setMinInput] = useState<string>(
    filters.minPrice !== null ? filters.minPrice.toString() : ''
  );
  const [maxInput, setMaxInput] = useState<string>(
    filters.maxPrice !== null ? filters.maxPrice.toString() : ''
  );

  // Sinkronisasi dengan FilterContext jika filter direset dari luar
  useEffect(() => {
    setMinInput(filters.minPrice !== null ? filters.minPrice.toString() : '');
    setMaxInput(filters.maxPrice !== null ? filters.maxPrice.toString() : '');
  }, [filters.minPrice, filters.maxPrice]);

  // Debounce otomatis (400ms) saat pengguna mengetik harga (FR-03)
  useEffect(() => {
    const timer = setTimeout(() => {
      const minVal = minInput ? parseInt(minInput.replace(/\D/g, ''), 10) : null;
      const maxVal = maxInput ? parseInt(maxInput.replace(/\D/g, ''), 10) : null;

      // Hanya update jika nilai berbeda dari state saat ini
      if (minVal !== filters.minPrice || maxVal !== filters.maxPrice) {
        setPriceRange(
          isNaN(minVal as number) ? null : minVal,
          isNaN(maxVal as number) ? null : maxVal
        );
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [minInput, maxInput]);

  // Terapkan harga secara manual / via tombol Enter
  const handleApply = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const minVal = minInput ? parseInt(minInput.replace(/\D/g, ''), 10) : null;
    const maxVal = maxInput ? parseInt(maxInput.replace(/\D/g, ''), 10) : null;

    setPriceRange(
      isNaN(minVal as number) ? null : minVal,
      isNaN(maxVal as number) ? null : maxVal
    );
  };

  // Format angka ribuan untuk kenyamanan visual
  const formatNumber = (val: string) => {
    const raw = val.replace(/\D/g, '');
    if (!raw) return '';
    return new Intl.NumberFormat('id-ID').format(parseInt(raw, 10));
  };

  return (
    <form onSubmit={handleApply} className="space-y-3">
      {/* Input Harga Minimum (AC-04) */}
      <div>
        <label
          htmlFor="min-price"
          className="block text-xs font-semibold text-slate-600 mb-1"
        >
          Harga Minimum
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
            Rp
          </span>
          <input
            id="min-price"
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={formatNumber(minInput)}
            onChange={(e) => setMinInput(e.target.value.replace(/\D/g, ''))}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all outline-none"
          />
        </div>
      </div>

      {/* Input Harga Maksimum (AC-04) */}
      <div>
        <label
          htmlFor="max-price"
          className="block text-xs font-semibold text-slate-600 mb-1"
        >
          Harga Maksimum
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
            Rp
          </span>
          <input
            id="max-price"
            type="text"
            inputMode="numeric"
            placeholder="Tanpa batas"
            value={formatNumber(maxInput)}
            onChange={(e) => setMaxInput(e.target.value.replace(/\D/g, ''))}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all outline-none"
          />
        </div>
      </div>

      {/* Tombol Terapkan Harga Cepat */}
      {(minInput || maxInput) && (
        <button
          type="submit"
          className="w-full py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-600 border border-brand-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Terapkan Harga</span>
        </button>
      )}
    </form>
  );
}