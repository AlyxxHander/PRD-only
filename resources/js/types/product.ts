export type Category =
  | 'Laptop'
  | 'Komponen PC'
  | 'Aksesoris'
  | 'Tablet & Wearable';

export type BranchLocation =
  | 'Calosa Malang (Pusat - Jl. Mayjen Panjaitan)'
  | 'Calosa Malang (Soekarno Hatta)'
  | 'Calosa Surabaya (Hi-Tech Mall)';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  branches: BranchLocation[];
  imageUrl: string | null;         // Nullable untuk skenario missing image
  warranty: string | null;         // Nullable untuk skenario missing warranty
  description: string | null;      // Nullable untuk skenario missing description
  highlightSpecs: string[];        // 2-3 spesifikasi ringkas untuk kartu katalog
  fullSpecs: Record<string, string>; // Pasangan key-value untuk detail & perbandingan
}

export interface FilterState {
  searchQuery: string;
  selectedCategories: Category[];
  selectedBranches: BranchLocation[];
  selectedBrands: string[];
  minPrice: number | null;
  maxPrice: number | null;
}