import React from 'react';

interface SpecTableProps {
  specs: Record<string, string>;
}

export default function SpecTable({ specs }: SpecTableProps) {
  const specEntries = Object.entries(specs);

  if (specEntries.length === 0) {
    return (
      <p className="text-xs text-slate-400 italic py-4">
        Spesifikasi teknis belum dicantumkan.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <table className="w-full text-left border-collapse text-xs">
        <tbody>
          {specEntries.map(([key, value], idx) => (
            <tr
              key={key}
              className={`border-b border-slate-100 last:border-b-0 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/80' // Zebra Striping (UX-04)
                }`}
            >
              <td className="w-1/3 py-3 px-4 font-semibold text-slate-600 align-top">
                {key}
              </td>
              <td className="w-2/3 py-3 px-4 text-slate-800 font-medium leading-relaxed align-top">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}