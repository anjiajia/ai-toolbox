'use client';

import { useState, useEffect, useCallback } from 'react';
import NewsCard from '@/components/news/news-card';
import type { NewsItem } from '@/components/news/types';

const NEWS_API_URL = process.env.NEXT_PUBLIC_NEWS_API_URL || '';
const ALL_TAGS = ['全部', '大模型', '开源', '产品', '安全', '编程', '视频', '音频', '营销'];

export default function NewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState('全部');

  const fetchNews = useCallback(async (tag: string) => {
    setLoading(true);
    
    // 优先读本地 news.json
    let localItems: NewsItem[] = [];
    try {
      const res = await fetch('/news.json');
      if (res.ok) {
        const data = await res.json();
        localItems = data.items || [];
      }
    } catch {
      // ignore
    }

    // 同时尝试从 API 更新
    let apiItems: NewsItem[] = [];
    if (NEWS_API_URL) {
      try {
        const url = tag === '全部'
          ? `${NEWS_API_URL}/api/news`
          : `${NEWS_API_URL}/api/news?tag=${encodeURIComponent(tag)}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data?.items) {
            apiItems = data.items;
          }
        }
      } catch {
        // ignore
      }
    }

    // API 数据优先，否则用本地数据
    const items = apiItems.length > 0 ? apiItems : localItems;
    const filtered = tag === '全部' ? items : items.filter((item: NewsItem) => item.tags.includes(tag));
    
    setItems(filtered);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNews(activeTag);
  }, [activeTag, fetchNews]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-zinc-900">📰 AI资讯</h1>
          <p className="text-zinc-500 mt-2">每日自动抓取，来源交叉验证</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
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

        {loading ? (
          <div className="grid gap-4">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="h-32 bg-zinc-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-zinc-400">
            <p>暂无「{activeTag}」相关资讯</p>
            <p className="text-sm mt-1">数据将在下次 cron 更新后显示</p>
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
