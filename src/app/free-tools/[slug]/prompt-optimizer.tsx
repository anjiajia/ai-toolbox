'use client';

import { useState } from 'react';
import Container from '@/components/layout/container';
import Breadcrumbs from '@/components/common/breadcrumbs';
import Link from 'next/link';

export default function PromptOptimizerPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const optimizePrompt = (raw: string): string => {
    if (!raw.trim()) return '';
    const trimmed = raw.trim();
    return `请帮我${trimmed}

【任务类型】
[描述你希望AI完成的具体任务类型]

【输入信息】
${trimmed}

【约束条件】
- 输出内容要[具体要求]
- 语气/风格：[描述期望的语气或风格]
- 长度：[期望的字数或详细程度]
- 格式：[期望的输出格式，如列表/段落/表格等]

【上下文背景】
[补充相关的背景信息，帮助AI更好地理解你的需求]

请按照以上要求，生成符合预期的输出。`;
  };

  const handleOptimize = () => setResult(optimizePrompt(input));
  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs items={[{ label: '免费工具', href: '/free-tools' }, { label: 'AI Prompt 优化器' }]} />
        <div className="bg-white rounded-2xl border border-zinc-200 p-8 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">💡</span>
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">AI Prompt 优化器</h1>
              <p className="text-zinc-500 mt-1">输入粗糙想法，输出精准AI提示词</p>
            </div>
          </div>
          <p className="text-zinc-700">将你的模糊想法转化为高质量的AI提示词，提升ChatGPT、Claude等AI工具的输出质量。</p>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-8">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">🧪 工具试用</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">输入你的想法（越简单越好）</label>
              <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="例如：帮我写一封道歉邮件" className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none" rows={4} />
            </div>
            <button onClick={handleOptimize} disabled={!input.trim()} className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 font-medium">
              ✨ 生成优化提示词
            </button>
            {result && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-zinc-700">优化结果</label>
                  <button onClick={handleCopy} className="text-sm text-blue-600 hover:text-blue-700">{copied ? '✅ 已复制！' : '📋 复制'}</button>
                </div>
                <textarea value={result} readOnly className="w-full px-4 py-3 border border-zinc-300 rounded-xl bg-zinc-50 resize-none" rows={14} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/free-tools" className="text-blue-600 hover:underline">← 返回免费工具列表</Link>
        </div>
      </div>
    </Container>
  );
}
