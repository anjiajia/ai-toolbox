'use client';

import { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  items: FAQItem[];
}

export default function FaqSection({ items }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items.length) return null;

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border border-zinc-200 rounded-lg overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-zinc-50 transition"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="font-medium text-zinc-900">{item.q}</span>
            <span className="text-zinc-400 ml-4">{openIndex === i ? '−' : '+'}</span>
          </button>
          {openIndex === i && (
            <div className="p-4 bg-zinc-50 text-zinc-600 text-sm leading-relaxed border-t border-zinc-200">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
