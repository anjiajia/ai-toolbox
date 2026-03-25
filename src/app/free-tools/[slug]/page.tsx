import { notFound } from 'next/navigation';
import Container from '@/components/layout/container';
import Breadcrumbs from '@/components/common/breadcrumbs';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/common/json-ld';
import type { FreeTool } from '@/types/tool';
import freeToolsData from '@/data/free-tools.json';
import PromptOptimizerTool from './prompt-optimizer';
import JsonFormatterTool from './json-formatter';
import MarkdownToHtmlTool from './markdown-to-html';
import WordCounterTool from './word-counter';
import TitleGeneratorTool from './title-generator';
import ColorPaletteTool from './color-palette';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-toolbox.example.com';

const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  'prompt-optimizer': PromptOptimizerTool,
  'json-formatter': JsonFormatterTool,
  'markdown-to-html': MarkdownToHtmlTool,
  'word-counter': WordCounterTool,
  'title-generator': TitleGeneratorTool,
  'color-palette': ColorPaletteTool,
};

export async function generateStaticParams() {
  return freeToolsData.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = (freeToolsData as FreeTool[]).find((t) => t.slug === slug);
  if (!tool) return {};
  return {
    title: `${tool.name} - 免费在线工具 | AI工具箱`,
    description: `${tool.description} 立即免费使用，无需注册。`,
    keywords: [tool.name, '免费工具', '在线工具', 'AI工具', tool.category],
    openGraph: {
      title: `${tool.name} | AI工具箱免费工具`,
      description: tool.tagline,
    },
    alternates: {
      canonical: `${BASE_URL}/free-tools/${slug}`,
    },
  };
}

export default async function FreeToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = (freeToolsData as FreeTool[]).find((t) => t.slug === slug);
  if (!tool) notFound();

  const ToolComponent = TOOL_COMPONENTS[slug];

  const faqs = tool.faq || [
    { q: `${tool.name}是完全免费的吗？`, a: '是的，本工具完全免费使用，无需注册账号。' },
    { q: `使用${tool.name}需要安装什么吗？`, a: '不需要。直接在浏览器中打开即可使用，无需下载或安装任何软件。' },
    { q: `${tool.name}支持移动端吗？`, a: '支持的。我们的工具完全响应式设计，支持手机，平板，电脑等各类设备。' },
  ];

  return (
    <Container>
      <BreadcrumbJsonLd
        baseUrl={BASE_URL}
        items={[
          { name: '首页', url: '/' },
          { name: '免费工具', url: '/free-tools' },
          { name: tool.name, url: `/free-tools/${slug}` },
        ]}
      />

      <div className="py-8">
        <Breadcrumbs
          items={[
            { label: '免费工具', href: '/free-tools' },
            { label: tool.name },
          ]}
        />

        {/* Header */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-8 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{tool.emoji}</span>
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">{tool.name}</h1>
              <p className="text-zinc-500 mt-1">{tool.tagline}</p>
            </div>
          </div>
          <p className="text-zinc-700 leading-relaxed mb-6">{tool.description}</p>

          {/* Stats */}
          <div className="flex gap-6 text-sm">
            <span className="text-zinc-500">⭐ {tool.rating} 分</span>
            <span className="text-zinc-500">👤 {tool.usageCount?.toLocaleString()} 次使用</span>
          </div>
        </div>

        {/* Feature & Use Cases */}
        {(tool.features || tool.useCases) && (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {tool.features && tool.features.length > 0 && (
              <div className="bg-white rounded-2xl border border-zinc-200 p-6">
                <h3 className="font-medium text-zinc-900 mb-3">✨ 功能特点</h3>
                <ul className="text-sm text-zinc-600 space-y-2">
                  {tool.features.map((f, i) => <li key={i}>• {f}</li>)}
                </ul>
              </div>
            )}
            {tool.useCases && tool.useCases.length > 0 && (
              <div className="bg-white rounded-2xl border border-zinc-200 p-6">
                <h3 className="font-medium text-zinc-900 mb-3">🎯 适用场景</h3>
                <ul className="text-sm text-zinc-600 space-y-2">
                  {tool.useCases.map((uc, i) => <li key={i}>• {uc}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Interactive Tool */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-8 mb-6">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">🧪 立即使用</h2>
          {ToolComponent ? (
            <ToolComponent />
          ) : (
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 text-center">
              <p className="text-zinc-600">🔜 功能开发中，敬请期待...</p>
            </div>
          )}
        </div>

        {/* FAQ */}
        {faqs.length > 0 && (
          <div className="bg-white rounded-2xl border border-zinc-200 p-8 mb-6">
            <h3 className="font-semibold text-zinc-900 mb-4">❓ 常见问题</h3>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="bg-zinc-50 rounded-xl p-4">
                  <summary className="font-medium text-zinc-800 cursor-pointer">{faq.q}</summary>
                  <p className="text-zinc-600 text-sm mt-2">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/free-tools" className="text-blue-600 hover:underline">← 返回免费工具列表</Link>
        </div>
      </div>
    </Container>
  );
}
