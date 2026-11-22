import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Product, Category, BranchLocation, FilterState } from '@/types/product';
import { DUMMY_PRODUCTS } from '@/data/dummyProducts';

interface FilterContextType {
  // State Filter
  filters: FilterState;
  setSearchQuery: (query: string) => void;
  setSelectedCategories: (categories: Category[]) => void;
  toggleCategory: (category: Category) => void;
  setSelectedBranches: (branches: BranchLocation[]) => void;
  toggleBranch: (branch: BranchLocation) => void;
  setSelectedBrands: (brands: string[]) => void;
  toggleBrand: (brand: string) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  resetFilters: () => void;

  // Data Hasil Perhitungan
  filteredProducts: Product[];
  totalResults: number;
  activeFilterCount: number;
  availableBrands: string[];
}

const defaultFilters: FilterState = {
  searchQuery: '',
  selectedCategories: [],
  selectedBranches: [],
  selectedBrands: [],
  minPrice: null,
  maxPrice: null,
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Daftar merek unik dari seluruh data produk
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    DUMMY_PRODUCTS.forEach((p) => brands.add(p.brand));
    return Array.from(brands).sort();
  }, []);

  // Update query pencarian
  const setSearchQuery = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const setSelectedCategories = (categories: Category[]) => {
    setFilters((prev) => ({ ...prev, selectedCategories: categories }));
  };

  const toggleCategory = (category: Category) => {
    setFilters((prev) => {
      const exists = prev.selectedCategories.includes(category);
      return {
        ...prev,
        selectedCategories: exists
          ? prev.selectedCategories.filter((c) => c !== category)
          : [...prev.selectedCategories, category],
      };
    });
  };

  const setSelectedBranches = (branches: BranchLocation[]) => {
    setFilters((prev) => ({ ...prev, selectedBranches: branches }));
  };

  const toggleBranch = (branch: BranchLocation) => {
    setFilters((prev) => {
      const exists = prev.selectedBranches.includes(branch);
      return {
        ...prev,
        selectedBranches: exists
          ? prev.selectedBranches.filter((b) => b !== branch)
          : [...prev.selectedBranches, branch],
      };
    });
  };

  const setSelectedBrands = (brands: string[]) => {
    setFilters((prev) => ({ ...prev, selectedBrands: brands }));
  };

  const toggleBrand = (brand: string) => {
    setFilters((prev) => {
      const exists = prev.selectedBrands.includes(brand);
      return {
        ...prev,
        selectedBrands: exists
          ? prev.selectedBrands.filter((b) => b !== brand)
          : [...prev.selectedBrands, brand],
      };
    });
  };

  const setPriceRange = (min: number | null, max: number | null) => {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  // Logika Penyaringan Realtime Produk
  const filteredProducts = useMemo(() => {
    return DUMMY_PRODUCTS.filter((product) => {
      // 1. Filter Pencarian Teks (FR-01: Nama atau Merek)
      if (filters.searchQuery.trim().length > 0) {
        const q = filters.searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchBrand = product.brand.toLowerCase().includes(q);
        const matchCategory = product.category.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchCategory) {
          return false;
        }
      }

      // 2. Filter Kategori Eksak (FR-02)
      if (
        filters.selectedCategories.length > 0 &&
        !filters.selectedCategories.includes(product.category)
      ) {
        return false;
      }

      // 3. Filter Cabang Toko (FR-03)
      if (filters.selectedBranches.length > 0) {
        const hasBranch = product.branches.some((b) =>
          filters.selectedBranches.includes(b as BranchLocation)
        );
        if (!hasBranch) return false;
      }

      // 4. Filter Merek (FR-03)
      if (
        filters.selectedBrands.length > 0 &&
        !filters.selectedBrands.includes(product.brand)
      ) {
        return false;
      }

      // 5. Filter Rentang Harga (FR-03)
      if (filters.minPrice !== null && product.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== null && product.price > filters.maxPrice) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Hitung jumlah filter aktif (selain kata kunci kosong)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery.trim().length > 0) count++;
    count += filters.selectedCategories.length;
    count += filters.selectedBranches.length;
    count += filters.selectedBrands.length;
    if (filters.minPrice !== null || filters.maxPrice !== null) count++;
    return count;
  }, [filters]);

  return (
    <FilterContext.Provider
      value={{
        filters,
        setSearchQuery,
        setSelectedCategories,
        toggleCategory,
        setSelectedBranches,
        toggleBranch,
        setSelectedBrands,
        toggleBrand,
        setPriceRange,
        resetFilters,
        filteredProducts,
        totalResults: filteredProducts.length,
        activeFilterCount,
        availableBrands,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter harus digunakan di dalam FilterProvider');
  }
  return context;
};