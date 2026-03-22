import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'AI工具箱 - 发现最新AI工具 | AI工具导航',
    template: '%s | AI工具箱',
  },
  description: 'AI工具箱是专业的AI工具导航网站，收录全球优质AI工具，涵盖AI写作、图像生成、视频制作、编程开发等领域，帮助你发现最新AI生产力工具。',
  keywords: ['AI工具', 'AI导航', '人工智能', 'AI写作', 'AI图像', 'AI视频', 'AI编程'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans bg-zinc-50 text-zinc-900 antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
