'use client';

import { useState, useEffect, useCallback } from 'react';
import NewsCard from '@/components/news/news-card';
import type { NewsItem, NewsData } from '@/components/news/types';
import type { Metadata } from 'next';

const NEWS_API_URL = process.env.NEXT_PUBLIC_NEWS_API_URL || '';
const ALL_TAGS = ['全部', '大模型', '开源', '产品', '安全', '编程', '视频', '音频', '营销'];

export default function NewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState('全部');

  const fetchNews = useCallback((tag: string) => {
    if (!NEWS_API_URL) {
      setError('未配置资讯API');
      setLoading(false);
      return;
    }

    setLoading(true);
    const url = tag === '全部'
      ? `${NEWS_API_URL}/api/news`
      : `${NEWS_API_URL}/api/news?tag=${encodeURIComponent(tag)}`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('获取失败');
        return res.json();
      })
      .then((data: NewsData) => {
        setItems(data.items || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchNews(activeTag);
  }, [activeTag, fetchNews]);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-zinc-900">📰 AI资讯</h1>
          <p className="text-zinc-500 mt-2">每日自动抓取，来源交叉验证</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tag Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-1.5 rounded-full text-sm transition ${
                activeTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:border-blue-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* News List */}
        {loading ? (
          <div className="grid gap-4">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="h-32 bg-zinc-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-zinc-400">❌ {error}</p>
            <button
              onClick={() => fetchNews(activeTag)}
              className="mt-4 text-blue-600 hover:underline"
            >
              重试
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-zinc-400">暂无「{activeTag}」相关资讯</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {items.map(item => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
