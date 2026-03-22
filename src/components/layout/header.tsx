'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
            <span className="text-2xl">🧰</span>
            <span>AI工具箱</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tools/writing" className="text-zinc-600 hover:text-blue-600 transition">AI写作</Link>
            <Link href="/tools/image" className="text-zinc-600 hover:text-blue-600 transition">AI图像</Link>
            <Link href="/tools/video" className="text-zinc-600 hover:text-blue-600 transition">AI视频</Link>
            <Link href="/tools/coding" className="text-zinc-600 hover:text-blue-600 transition">AI编程</Link>
            <Link href="/free-tools" className="text-zinc-600 hover:text-blue-600 transition">免费工具</Link>
            <Link href="/about" className="text-zinc-600 hover:text-blue-600 transition">关于</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-zinc-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="菜单"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-200">
            <nav className="flex flex-col gap-3">
              <Link href="/tools/writing" className="text-zinc-600 hover:text-blue-600">AI写作</Link>
              <Link href="/tools/image" className="text-zinc-600 hover:text-blue-600">AI图像</Link>
              <Link href="/tools/video" className="text-zinc-600 hover:text-blue-600">AI视频</Link>
              <Link href="/tools/coding" className="text-zinc-600 hover:text-blue-600">AI编程</Link>
              <Link href="/free-tools" className="text-zinc-600 hover:text-blue-600">免费工具</Link>
              <Link href="/about" className="text-zinc-600 hover:text-blue-600">关于</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
