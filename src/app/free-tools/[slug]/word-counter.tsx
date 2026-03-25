'use client';
import { useState, useMemo } from 'react';

export default function WordCounterTool() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    if (!text) return { chars: 0, words: 0, cnChars: 0, enWords: 0, paragraphs: 0, sentences: 0 };
    const chars = text.length;
    const cnChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    const enWords = (text.match(/[a-zA-Z]+/g) || []).length;
    const words = cnChars + enWords;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length || (text.trim() ? 1 : 0);
    const sentences = (text.match(/[.!?。！？]+/g) || []).length || (text.trim() ? 1 : 0);
    const allWords = text.match(/[\u4e00-\u9fa5]+|[a-zA-Z]+/g) || [];
    const freq: Record<string, number> = {};
    allWords.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    const topKeywords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5);
    return { chars, words, cnChars, enWords, paragraphs, sentences, topKeywords };
  }, [text]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">输入文本</label>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="输入或粘贴文本..."
          className="w-full h-40 px-4 py-3 border border-zinc-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none" />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { label: '总字符', value: stats.chars },
          { label: '中文字', value: stats.cnChars },
          { label: '英文词', value: stats.enWords },
          { label: '总词数', value: stats.words },
          { label: '段落', value: stats.paragraphs },
          { label: '句子', value: stats.sentences },
        ].map(s => (
          <div key={s.label} className="bg-zinc-50 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-blue-600">{s.value}</div>
            <div className="text-xs text-zinc-500">{s.label}</div>
          </div>
        ))}
      </div>
      {stats.topKeywords && stats.topKeywords.length > 0 && (
        <div className="bg-zinc-50 rounded-xl p-4">
          <h3 className="font-medium text-zinc-900 mb-2">🔑 高频词 TOP5</h3>
          <div className="flex flex-wrap gap-2">
            {stats.topKeywords.map(([w, c]) => (
              <span key={w} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {w} ×{c}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
