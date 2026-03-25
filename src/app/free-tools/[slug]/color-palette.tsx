'use client';
import { useState } from 'react';

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

const rgbToHex = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('');

const adjust = (hex: string, amount: number) => {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(r + amount, g + amount, b + amount);
};

const getContrastColor = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128 ? '#000000' : '#FFFFFF';
};

export default function ColorPaletteTool() {
  const [color, setColor] = useState('#3B82F6');

  const palette = {
    primary: color,
    dark: adjust(color, -40),
    light: adjust(color, 60),
    bg: adjust(color, 120),
    text: adjust(color, -80),
    accent: adjust(color, 20),
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">输入颜色代码（HEX格式）</label>
        <div className="flex gap-3 items-center">
          <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-14 h-12 rounded-lg cursor-pointer border-0" />
          <input type="text" value={color} onChange={e => setColor(e.target.value)} placeholder="#3B82F6"
            className="flex-1 px-4 py-3 border border-zinc-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none font-mono" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Object.entries(palette).map(([name, hex]) => (
          <div key={name}>
            <div className="h-16 rounded-xl mb-1 flex items-center justify-center" style={{ backgroundColor: hex }}>
              <span className="text-xs font-mono px-2 py-1 rounded" style={{ color: getContrastColor(hex), backgroundColor: adjust(hex, -60) }}>
                {hex.toUpperCase()}
              </span>
            </div>
            <div className="text-xs text-zinc-500 text-center capitalize">{name}</div>
            <button onClick={() => navigator.clipboard.writeText(hex)} className="w-full text-xs text-blue-600 hover:text-blue-700 mt-1">📋 复制</button>
          </div>
        ))}
      </div>
      <div className="bg-zinc-50 rounded-xl p-4">
        <h3 className="font-medium text-zinc-900 mb-3">配色预览条</h3>
        <div className="h-12 rounded-lg overflow-hidden flex">
          {Object.values(palette).map((hex, i) => (
            <div key={i} style={{ backgroundColor: hex, flex: 1 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
