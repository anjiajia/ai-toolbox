'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import NewsCard from './news-card';
import type { NewsItem } from './types';

const NEWS_API_URL = process.env.NEXT_PUBLIC_NEWS_API_URL || '';

const TAG_MAP: Record<string, string> = {
  '大模型': 'llm',
  '开源': 'open-source',
  '产品': 'product',
  '安全': 'security',
  '编程': 'coding',
};

const ALL_TAGS = ['全部', '大模型', '开源', '产品', '安全', '编程'];

interface NewsSectionProps {
  /** 展示条数，默认5 */
  limit?: number;
  /** 是否显示标题区域 */
  showHeading?: boolean;
}

export default function NewsSection({ limit = 5, showHeading = true }: NewsSectionProps) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!NEWS_API_URL) {
      setLoading(false);
      setError('未配置资讯API');
      return;
    }

    fetch(`${NEWS_API_URL}/api/news`)
      .then(res => {
        if (!res.ok) throw new Error('获取失败');
        return res.json();
      })
      .then(data => {
        setItems(data.items || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (!NEWS_API_URL) {
    return null;
  }

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
        ) : error ? (
          <div className="text-center py-8 text-zinc-400">
            <p>资讯加载失败，请稍后刷新</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-8 text-zinc-400">
            <p>暂无资讯</p>
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
