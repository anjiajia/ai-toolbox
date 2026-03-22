'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/layout/container';
import Breadcrumbs from '@/components/common/breadcrumbs';
import Link from 'next/link';

// ==================== AI Prompt Optimizer ====================
function PromptOptimizer() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const optimize = (raw: string) => {
    if (!raw.trim()) return '';
    return `请帮我${raw.trim()}

【任务类型】
[描述你希望AI完成的具体任务类型]

【输入信息】
${raw.trim()}

【约束条件】
- 输出内容要[具体要求]
- 语气/风格：[描述期望的语气或风格]
- 长度：[期望的字数或详细程度]
- 格式：[期望的输出格式，如列表/段落/表格等]

【上下文背景】
[补充相关的背景信息，帮助AI更好地理解你的需求]

请按照以上要求，生成符合预期的输出。`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">输入你的想法（越简单越好）</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="例如：帮我写一封道歉邮件" className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none" rows={4} />
      </div>
      <button onClick={() => setResult(optimize(input))} disabled={!input.trim()} className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 font-medium">
        ✨ 生成优化提示词
      </button>
      {result && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-zinc-700">优化结果</span>
            <button onClick={handleCopy} className="text-sm text-blue-600 hover:text-blue-700">{copied ? '✅ 已复制！' : '📋 复制到剪贴板'}</button>
          </div>
          <textarea value={result} readOnly className="w-full px-4 py-3 border border-zinc-300 rounded-xl bg-zinc-50 resize-none" rows={14} />
        </div>
      )}
    </div>
  );
}

// ==================== JSON Formatter ====================
function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'format' | 'compress' | 'validate'>('format');

  const handleProcess = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      if (mode === 'format') {
        setOutput(JSON.stringify(parsed, null, 2));
      } else if (mode === 'compress') {
        setOutput(JSON.stringify(parsed));
      } else {
        setOutput('✅ JSON格式有效！');
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(`❌ JSON解析错误: ${e.message}`);
        setOutput('');
      }
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['format', 'compress', 'validate'] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${mode === m ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}>
            {m === 'format' ? '📄 格式化' : m === 'compress' ? '🗜️ 压缩' : '✅ 校验'}
          </button>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">输入JSON</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"name": "test", "value": 123}' className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none font-mono text-sm" rows={6} />
      </div>
      <button onClick={handleProcess} disabled={!input.trim()} className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 font-medium">
        ▶️ 处理
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {output && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-zinc-700">结果 {mode !== 'validate' && `(${output.length}字符)`}</span>
            {mode !== 'validate' && <button onClick={handleCopy} className="text-sm text-blue-600 hover:text-blue-700">📋 复制</button>}
          </div>
          <textarea value={output} readOnly className="w-full px-4 py-3 border border-zinc-300 rounded-xl bg-zinc-50 resize-none font-mono text-sm" rows={mode === 'validate' ? 2 : 8} />
        </div>
      )}
    </div>
  );
}

// ==================== Markdown to HTML ====================
function MarkdownToHtml() {
  const [input, setInput] = useState('');
  const [html, setHtml] = useState('');

  const toHtml = (md: string): string => {
    return md
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^\* (.*$)/gm, '<li>$1</li>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Markdown 输入</label>
          <textarea value={input} onChange={(e) => { setInput(e.target.value); setHtml(toHtml(e.target.value)); }} placeholder="# 标题&#10;**粗体** *斜体*&#10;- 列表项1&#10;- 列表项2" className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none font-mono text-sm" rows={10} />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">HTML 输出</label>
          <textarea value={html} readOnly className="w-full px-4 py-3 border border-zinc-300 rounded-xl bg-zinc-50 resize-none font-mono text-sm" rows={10} />
        </div>
      </div>
      <div className="bg-zinc-50 rounded-xl p-4">
        <label className="block text-sm font-medium text-zinc-700 mb-2">预览</label>
        <div className="prose max-w-none text-sm" dangerouslySetInnerHTML={{ __html: html || '<span class="text-zinc-400">左侧输入Markdown预览...</span>' }} />
      </div>
    </div>
  );
}

// ==================== Word Counter ====================
function WordCounter() {
  const [text, setText] = useState('');

  const stats = {
    chars: text.length,
    charsNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    chineseChars: (text.match(/[\u4e00-\u9fa5]/g) || []).length,
    sentences: text.split(/[.!?。！？]+/).filter(Boolean).length,
    paragraphs: text.split(/\n\n+/).filter(Boolean).length,
  };

  const countWords = (w: string) => ((w.match(/[a-zA-Z0-9]+/g) || []).length);
  const keywords = text.trim()
    ? Array.from(new Set(text.toLowerCase().match(/[a-zA-Z]{4,}/g) || []))
        .filter(w => !['this','that','with','from','have','been'].includes(w))
        .slice(0, 10)
    : [];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">输入文本</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="在此输入或粘贴文本进行统计..." className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none" rows={8} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: '总字符数', value: stats.chars },
          { label: '字符（去空格）', value: stats.charsNoSpaces },
          { label: '英文词数', value: countWords(text) },
          { label: '中文字数', value: stats.chineseChars },
          { label: '句子数', value: stats.sentences },
          { label: '段落数', value: stats.paragraphs },
        ].map(({ label, value }) => (
          <div key={label} className="bg-zinc-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{value}</div>
            <div className="text-xs text-zinc-500 mt-1">{label}</div>
          </div>
        ))}
      </div>
      {keywords.length > 0 && (
        <div className="bg-zinc-50 rounded-xl p-4">
          <label className="block text-sm font-medium text-zinc-700 mb-2">关键词（SEO参考）</label>
          <div className="flex flex-wrap gap-2">
            {keywords.map((k) => (
              <span key={k} className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">{k}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== Title Generator ====================
function TitleGenerator() {
  const [keyword, setKeyword] = useState('');
  const [style, setStyle] = useState<'list' | 'growth' | 'news'>('list');
  const [results, setResults] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const templates: Record<string, string[]> = {
    list: [
      `【关键词】Top10榜单 | 2026年最新整理`,
      `【关键词】哪个最好用？实测对比来了`,
      `2026年【关键词】大全，一次看完`,
      `【关键词】合集 | 建议收藏`,
      `全网最全【关键词】测评（收藏）`,
    ],
    growth: [
      `用了【关键词】，效率提升3倍！`,
      `你不知道的【关键词】隐藏用法`,
      `【关键词】如何改变我们的生活`,
      `强烈推荐！【关键词】使用心得`,
      `普通人如何用【关键词】赚钱`,
    ],
    news: [
      `2026年【关键词】最新动态，速看！`,
      `【关键词】突发更新，这几点必须知道`,
      `刚刚！2026【关键词】行业报告出炉`,
      `【关键词】最新消息，一文看懂`,
      `深度解析：2026【关键词】发展趋势`,
  ]};

  const handleGenerate = () => {
    if (!keyword.trim()) return;
    const titles = templates[style].map(t => t.replace(/【关键词】/g, keyword.trim()));
    setResults(titles);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(results.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">输入主题关键词</label>
        <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="例如：AI写作工具" className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
      </div>
      <div className="flex gap-2 flex-wrap">
        {([
          { key: 'list', label: '📋 列表型', desc: 'Top10/测评/合集' },
          { key: 'growth', label: '🚀 增长型', desc: '效率提升/赚钱' },
          { key: 'news', label: '📰 新闻型', desc: '最新/突发/深度' },
        ] as const).map(({ key, label, desc }) => (
          <button key={key} onClick={() => setStyle(key)} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${style === key ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}>
            {label} <span className="text-xs opacity-70">{desc}</span>
          </button>
        ))}
      </div>
      <button onClick={handleGenerate} disabled={!keyword.trim()} className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 font-medium">
        ✨ 生成标题
      </button>
      {results.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-zinc-700">生成结果</span>
            <button onClick={handleCopy} className="text-sm text-blue-600 hover:text-blue-700">{copied ? '✅ 已复制！' : '📋 复制全部'}</button>
          </div>
          <div className="space-y-2">
            {results.map((title, i) => (
              <div key={i} className="bg-zinc-50 rounded-xl p-4 text-zinc-800">
                {title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== Color Palette Generator ====================
function ColorPaletteGenerator() {
  const [color, setColor] = useState('#3B82F6');
  const [palette, setPalette] = useState<Record<string, string>>({});

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgbToHex = (r: number, g: number, b: number) =>
    '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');

  const generatePalette = (hex: string) => {
    if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return;
    const { r, g, b } = hexToRgb(hex);
    setPalette({
      '主色': hex.toUpperCase(),
      '深色': rgbToHex(r * 0.6, g * 0.6, b * 0.6),
      '浅色': rgbToHex(r + (255 - r) * 0.5, g + (255 - g) * 0.5, b + (255 - b) * 0.5),
      '背景': rgbToHex(r + (255 - r) * 0.92, g + (255 - g) * 0.92, b + (255 - b) * 0.92),
      '文字': rgbToHex(r * 0.2, g * 0.2, b * 0.2),
      '边框': rgbToHex(r * 0.8, g * 0.8, b * 0.8),
    });
  };

  const handleCopy = async (c: string) => {
    await navigator.clipboard.writeText(c);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">输入主色（HEX）</label>
        <div className="flex gap-3">
          <input type="color" value={color} onChange={(e) => { setColor(e.target.value); generatePalette(e.target.value); }} className="w-14 h-12 rounded-xl border border-zinc-300 cursor-pointer" />
          <input type="text" value={color} onChange={(e) => { setColor(e.target.value); generatePalette(e.target.value); }} placeholder="#3B82F6" className="flex-1 px-4 py-3 border border-zinc-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none font-mono" />
          <button onClick={() => generatePalette(color)} className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium">
            🎨 生成
          </button>
        </div>
      </div>
      {Object.keys(palette).length > 0 && (
        <div className="space-y-3">
          {Object.entries(palette).map(([name, hex]) => (
            <div key={name} className="flex items-center gap-3 bg-zinc-50 rounded-xl p-3">
              <button onClick={() => handleCopy(hex)} className="w-12 h-12 rounded-lg border border-zinc-200 cursor-pointer flex-shrink-0" style={{ backgroundColor: hex }} />
              <div className="flex-1">
                <div className="font-medium text-zinc-900">{name}</div>
                <div className="text-sm text-zinc-500 font-mono">{hex.toUpperCase()}</div>
              </div>
              <button onClick={() => handleCopy(hex)} className="text-sm text-blue-600 hover:text-blue-700">📋 复制</button>
            </div>
          ))}
          <div className="flex gap-2 mt-2">
            {Object.values(palette).map((hex, i) => (
              <div key={i} className="h-16 flex-1 rounded-xl border border-zinc-200" style={{ backgroundColor: hex }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== Tool Registry ====================
const TOOLS: Record<string, { name: string; emoji: string; tagline: string; description: string; howToUse: string; example?: string; component: React.ComponentType }> = {
  'prompt-optimizer': {
    name: 'AI Prompt 优化器',
    emoji: '💡',
    tagline: '输入粗糙想法，输出精准AI提示词',
    description: '将你的模糊想法转化为高质量的AI提示词，提升ChatGPT、Claude等AI工具的输出质量。',
    howToUse: '在输入框中描述你想让AI帮你完成的任务或问题，点击生成按钮获得优化后的提示词。',
    example: '输入：帮我写一封道歉邮件 → 输出结构化的提示词模板',
    component: PromptOptimizer,
  },
  'json-formatter': {
    name: 'JSON 格式化器',
    emoji: '🔧',
    tagline: '粘贴JSON代码，自动格式化高亮显示',
    description: '在线格式化JSON代码，支持美化、压缩、校验和语法高亮。',
    howToUse: '粘贴任意JSON代码，选择格式化/压缩/校验模式，点击处理按钮。',
    component: JsonFormatter,
  },
  'markdown-to-html': {
    name: 'Markdown → HTML 转换器',
    emoji: '📄',
    tagline: 'Markdown语法实时转HTML代码',
    description: '实时将Markdown语法转换为HTML代码，支持预览。',
    howToUse: '在左侧输入Markdown文本，右侧实时显示HTML输出和预览效果。',
    component: MarkdownToHtml,
  },
  'word-counter': {
    name: '字数统计器',
    emoji: '📝',
    tagline: '中英文分开统计，支持SEO分析',
    description: '统计文本字数、字符数、段落数、句子数，同时给出SEO关键词分析。',
    howToUse: '输入或粘贴文本，实时显示各类统计指标和关键词。',
    component: WordCounter,
  },
  'title-generator': {
    name: '标题生成器',
    emoji: '✍️',
    tagline: '输入关键词，生成吸引眼球的文章标题',
    description: '为博客文章、社交媒体、视频等场景生成多种风格的标题选项。',
    howToUse: '输入文章主题或关键词，选择标题风格，点击生成多个标题选项。',
    component: TitleGenerator,
  },
  'color-palette': {
    name: '配色方案生成器',
    emoji: '🎨',
    tagline: '输入品牌色，自动生成完整配色方案',
    description: '基于一个主色自动生成完整的配色方案，包括主色、辅色、背景色、文字色等。',
    howToUse: '输入颜色代码（HEX）或使用取色器选择主色，点击生成获取完整配色方案。',
    component: ColorPaletteGenerator,
  },
};

// ==================== Page Component ====================
interface Props {
  params: Promise<{ slug: string }>;
}

export default function FreeToolDetailPage({ params }: Props) {
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    params.then(p => setSlug(p.slug));
  }, [params]);

  if (!slug) return null;

  const tool = TOOLS[slug];
  if (!tool) {
    return (
      <Container>
        <div className="py-8">
          <Breadcrumbs items={[{ label: '免费工具', href: '/free-tools' }, { label: '未找到' }]} />
          <div className="text-center py-20">
            <p className="text-zinc-500">工具未找到</p>
            <Link href="/free-tools" className="text-blue-600 hover:underline mt-4 inline-block">← 返回</Link>
          </div>
        </div>
      </Container>
    );
  }

  const ToolComponent = tool.component;

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs items={[{ label: '免费工具', href: '/free-tools' }, { label: tool.name }]} />
        <div className="bg-white rounded-2xl border border-zinc-200 p-8 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{tool.emoji}</span>
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">{tool.name}</h1>
              <p className="text-zinc-500 mt-1">{tool.tagline}</p>
            </div>
          </div>
          <p className="text-zinc-700 leading-relaxed mb-4">{tool.description}</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-zinc-50 rounded-xl p-4">
              <h3 className="font-medium text-zinc-900 mb-2">📖 使用方法</h3>
              <p className="text-zinc-600 text-sm">{tool.howToUse}</p>
            </div>
            {tool.example && (
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="font-medium text-zinc-900 mb-2">💡 示例</h3>
                <p className="text-zinc-600 text-sm">{tool.example}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-8">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">🧪 工具试用</h2>
          <ToolComponent />
        </div>

        <div className="mt-8 text-center">
          <Link href="/free-tools" className="text-blue-600 hover:underline">← 返回免费工具列表</Link>
        </div>
      </div>
    </Container>
  );
}
