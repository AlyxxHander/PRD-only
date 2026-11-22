import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string | null;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  className = 'w-full h-full object-cover',
  aspectRatioClass = 'h-48 w-full',
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  // Jika src null atau terjadi error saat load gambar (FR-07)
  if (!src || hasError) {
    return (
      <div
        className={`${aspectRatioClass} bg-slate-100 flex flex-col items-center justify-center text-slate-400 gap-2 border-b border-slate-100 select-none`}
        role="img"
        aria-label="Gambar belum tersedia"
      >
        <div className="w-10 h-10 rounded-full bg-slate-200/70 flex items-center justify-center text-slate-400">
          <ImageOff className="w-5 h-5" />
        </div>
        <span className="text-[11px] font-medium text-slate-500">
          Gambar belum tersedia
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
}