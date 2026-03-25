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

// Detect environment
const isProduction = process.env.NODE_ENV === 'production';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const BASE_URL = siteUrl || 'https://ai-toolbox.example.com';

// Warn in production if NEXT_PUBLIC_SITE_URL is not configured
if (isProduction && !siteUrl) {
  console.warn('[AI工具箱] 警告: 生产环境未配置 NEXT_PUBLIC_SITE_URL，请在 .env.local 中设置。');
}

export const metadata: Metadata = {
  metadataBase: BASE_URL,
  title: {
    default: 'AI工具箱 - 发现最新AI工具 | AI工具导航',
    template: '%s | AI工具箱',
  },
  description: 'AI工具箱是专业的AI工具导航网站，收录全球优质AI工具，涵盖AI写作、图像生成、视频制作、编程开发等领域，帮助你发现最新AI生产力工具。',
  keywords: ['AI工具', 'AI导航', '人工智能', 'AI写作', 'AI图像', 'AI视频', 'AI编程', 'AI办公', 'AI营销', 'AI设计'],
  authors: [{ name: 'AI工具箱' }],
  creator: 'AI工具箱',
  publisher: 'AI工具箱',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: BASE_URL,
    siteName: 'AI工具箱',
    title: 'AI工具箱 - 发现最新AI工具 | AI工具导航',
    description: 'AI工具箱是专业的AI工具导航网站，收录全球优质AI工具，涵盖AI写作、图像生成、视频制作、编程开发等领域。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI工具箱 - AI工具导航',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI工具箱 - 发现最新AI工具',
    description: '收录全球优质AI工具，涵盖AI写作、图像生成、视频制作、编程开发等领域。',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'zh-CN': BASE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
