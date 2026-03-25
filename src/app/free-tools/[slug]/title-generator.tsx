'use client';
import { useState } from 'react';

const TEMPLATES = {
  list: (topic: string) => [
    `${topic}Top10测评（2026最新版）`,
    `${topic}排行榜：2026年度前10强`,
    `关于${topic}，我想推荐这10款`,
    `${topic}横评：哪款最适合你？`,
    `2026${topic}榜单，每一款都值得试试`,
  ],
  growth: (topic: string) => [
    `用了${topic}后，我的工作效率提升了3倍`,
    `为什么越来越多人开始用${topic}？`,
    `${topic}如何改变了我的日常生活`,
    `从0到1：${topic}使用指南`,
    `${topic}的5个隐藏用法，99%的人不知道`,
  ],
  news: (topic: string) => [
    `${topic}是什么？一文读懂`,
    `2026年${topic}发展趋势分析`,
    `深度解析${topic}的核心原理`,
    `${topic}最新消息：行业动态一览`,
    `关于${topic}，你需要知道的5件事`,
  ],
};

export default function TitleGeneratorTool() {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState<'list' | 'growth' | 'news'>('list');
  const [results, setResults] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setResults(TEMPLATES[style](topic.trim()));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-2">
        {([
          { key: 'list', label: '📊 列表型' },
          { key: 'growth', label: '📈 增长型' },
          { key: 'news', label: '📰 新闻型' },
        ] as const).map(s => (
          <button key={s.key} onClick={() => setStyle(s.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${style === s.key ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}>
            {s.label}
          </button>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">输入文章主题或关键词</label>
        <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="例如：AI写作工具"
          className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
      </div>
      <button onClick={handleGenerate} disabled={!topic.trim()}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 font-medium">
        ✨ 生成5个标题
      </button>
      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((title, i) => (
            <div key={i} className="flex items-center justify-between bg-zinc-50 rounded-xl p-4">
              <span className="text-zinc-800">{title}</span>
              <button onClick={() => navigator.clipboard.writeText(title)} className="text-sm text-blue-600 hover:text-blue-700 ml-4">📋</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
