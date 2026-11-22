import { Head, Link } from '@inertiajs/react';
import { DUMMY_PRODUCTS } from '@/data/dummyProducts';
import { useCompare } from '@/contexts/CompareContext';
import ImageWithFallback from '@/components/catalog/ImageWithFallback';
import SpecTable from '@/components/catalog/SpecTable';
import {
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  MapPin,
  Check,
  Plus,
  ArrowLeft,
  FileText,
  Layers,
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
}

export default function ProductDetailPage({ productId }: ProductDetailPageProps) {
  // Cari produk dari dummy data
  const product = DUMMY_PRODUCTS.find((p) => p.id === productId);

  const { isInCompare, addToCompare, removeFromCompare } = useCompare();
  const selected = product ? isInCompare(product.id) : false;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Jika produk tidak ditemukan
  if (!product) {
    return (
      <>
        <Head title="Produk Tidak Ditemukan — Calosa Store" />
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Produk Tidak Ditemukan
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Produk dengan identitas yang Anda cari tidak tersedia di katalog Calosa.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog</span>
          </Link>
        </div>
      </>
    );
  }

  const handleToggleCompare = () => {
    if (selected) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  return (
    <>
      <Head title={`${product.name} — Calosa Laptop & Gadget Store`} />

      <div className="space-y-8">
        {/* 1. Navigasi Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-brand-500 transition-colors">
            Katalog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-600 font-medium">{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-900 font-semibold truncate max-w-md">
            {product.name}
          </span>
        </nav>

        {/* 2. Ringkasan Atas: Foto & Informasi Utama (2 Kolom Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Area Foto Produk dengan Fallback (FR-07, AC-06) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
              <ImageWithFallback
                src={product.imageUrl}
                alt={product.name}
                aspectRatioClass="h-80 w-full"
                className="w-full h-80 object-cover"
              />
            </div>
            {/* Lencana Kategori */}
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span className="px-3 py-1 rounded-full bg-slate-100 font-semibold text-slate-700">
                {product.category}
              </span>
              <span className="font-semibold text-slate-600 uppercase tracking-wider">
                Merek: {product.brand}
              </span>
            </div>
          </div>

          {/* Area Spesifikasi Cepat & Aksi */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                {product.brand}
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 mt-1 leading-snug">
                {product.name}
              </h1>
            </div>

            {/* Harga Kontras Tinggi (UX-04) */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium block">
                  Harga Resmi Toko
                </span>
                <span className="text-3xl font-extrabold text-brand-600 tracking-tight">
                  {formatRupiah(product.price)}
                </span>
              </div>

              {/* Tombol Perbandingan Sinkron (UX-05, AC-07) */}
              <button
                type="button"
                onClick={handleToggleCompare}
                className={`py-2.5 px-5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${selected
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20'
                  }`}
              >
                {selected ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Terpilih dalam Perbandingan</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Tambah ke Perbandingan</span>
                  </>
                )}
              </button>
            </div>

            {/* Informasi Garansi dengan Graceful Fallback (FR-07, AC-06) */}
            <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              {product.warranty ? (
                <>
                  <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      Garansi Resmi
                    </span>
                    <span className="text-xs text-slate-600">
                      {product.warranty}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      Status Garansi
                    </span>
                    {/* Fallback Eksplisit (FR-07, AC-06) */}
                    <span className="text-xs text-amber-700 italic">
                      Informasi garansi belum dicantumkan
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Ketersediaan Cabang Toko Calosa */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-500" />
                <span>Ketersediaan Stok Cabang</span>
              </h3>
              <div className="space-y-1.5">
                {product.branches.map((branch, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-emerald-50/60 border border-emerald-100 text-xs"
                  >
                    <span className="font-medium text-slate-700">{branch}</span>
                    <span className="text-[11px] font-semibold text-emerald-700">
                      Tersedia ✓
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deskripsi Produk dengan Fallback (FR-07, AC-06) */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Deskripsi Produk</span>
              </h3>
              {product.description ? (
                <p className="text-xs text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              ) : (
                /* Fallback Deskripsi Kosong (FR-07) */
                <p className="text-xs text-slate-400 italic">
                  Deskripsi produk belum tersedia.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 3. Bagian Bawah: Tabel Spesifikasi Lengkap Terstruktur (UX-04) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Layers className="w-5 h-5 text-brand-500" />
            <h2 className="text-lg font-bold text-slate-900">
              Spesifikasi Teknis Lengkap
            </h2>
          </div>

          {/* Tabel Zebra Striping (UX-04) */}
          <SpecTable specs={product.fullSpecs} />
        </div>
      </div>
    </>
  );
}