export type Category =
  | 'Notebook'
  | 'Smartphone'
  | 'Printer'
  | 'Projector'
  | 'Flashdisk'
  | 'Tablet'
  | 'Webcam'
  | 'Smartwatch'
  | 'Accessories'
  | 'Mouse'
  | 'Keyboard'
  | 'Monitor'
  | 'Camera'
  | 'Keyboard Mouse'
  | 'Mousepad';

export type BranchLocation =
  | 'Calosa Laptop & Gadget Store Gajayana'
  | 'Calosa Laptop & Gadget Store Panjaitan'
  | 'Calosa Laptop & Gadget Store Dharmahusada'

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