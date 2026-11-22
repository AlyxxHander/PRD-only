import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';

interface CompareContextType {
  compareList: Product[];
  addToCompare: (product: Product) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  toastMessage: string | null;
  dismissToast: () => void;
}

const STORAGE_KEY = 'calosa_compare_items';

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inisialisasi state dari localStorage jika ada
  const [compareList, setCompareList] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
      } catch (err) {
        console.error('Gagal membaca localStorage compare list:', err);
        return [];
      }
    }
    return [];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Simpan setiap perubahan compareList ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compareList));
    } catch (err) {
      console.error('Gagal menyimpan compare list ke localStorage:', err);
    }
  }, [compareList]);

  const addToCompare = (product: Product): boolean => {
    if (compareList.some((item) => item.id === product.id)) {
      return false;
    }
    // Batasan maksimal 3 produk sesuai FR-08 & AC-08
    if (compareList.length >= 3) {
      setToastMessage('Maksimal 3 produk dapat dibandingkan sekaligus.');
      return false;
    }
    setCompareList((prev) => [...prev, product]);
    return true;
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (productId: string): boolean => {
    return compareList.some((item) => item.id === productId);
  };

  const dismissToast = () => {
    setToastMessage(null);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        toastMessage,
        dismissToast,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare harus digunakan di dalam CompareProvider');
  }
  return context;
};