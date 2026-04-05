'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import NewsCard from './news-card';
import type { NewsItem } from './types';

const NEWS_API_URL = process.env.NEXT_PUBLIC_NEWS_API_URL || '';

interface NewsSectionProps {
  limit?: number;
  showHeading?: boolean;
}

export default function NewsSection({ limit = 5, showHeading = true }: NewsSectionProps) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 优先读本地 news.json（构建时生成）
    fetch('/news.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.items?.length) {
          setItems(data.items);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // 同时尝试从 API 更新（运行时）
    if (NEWS_API_URL) {
      fetch(`${NEWS_API_URL}/api/news`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data?.items?.length) {
            setItems(data.items);
            setLoading(false);
          }
        })
        .catch(() => {});
    }
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        {showHeading && (
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">📰 最新AI资讯</h2>
              <p className="text-sm text-zinc-500 mt-1">每日自动更新 · 来源验证</p>
            </div>
            <Link
              href="/news"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              查看全部 →
            </Link>
          </div>
        )}

        {loading ? (
          <div className="grid gap-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-24 bg-zinc-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-8 text-zinc-400">
            <p>暂无资讯（数据将在下次 cron 更新后显示）</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {items.slice(0, limit).map(item => (
              <NewsCard key={item.id} item={item} compact />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
