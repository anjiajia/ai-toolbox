import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/layout/container';
import Breadcrumbs from '@/components/common/breadcrumbs';
import TagPill from '@/components/common/tag-pill';
import ToolGrid from '@/components/tools/tool-grid';
import SectionHeading from '@/components/common/section-heading';
import AdSlot from '@/components/common/ad-slot';
import FaqSection from '@/components/common/faq-section';
import {
  BreadcrumbJsonLd,
  SoftwareAppJsonLd,
  FAQJsonLd,
} from '@/components/common/json-ld';
import { HowToJsonLd, generateHowToSteps } from '@/components/common/howto-schema';
import { getToolBySlug, getRelatedTools, getAllTools } from '@/lib/tools';
import { getCategoryBySlug } from '@/lib/categories';
import { getPricingLabel, getPricingColor } from '@/lib/utils';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-toolbox.example.com';

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((t) => ({ category: t.category, slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const tool = getToolBySlug(category, slug);
  const cat = getCategoryBySlug(category);
  if (!tool) return {};

  return {
    title: `${tool.name} 评测：功能、价格、优缺点、替代工具${cat ? ` | ${cat.name}` : ''}`,
    description: `${tool.name}怎么样？${tool.tagline}。本文深度评测${tool.name}的核心功能、优缺点、最佳适用场景、定价方案及替代工具，帮你做出选择。`,
    keywords: [
      tool.name,
      `${tool.name} 评测`,
      `${tool.name} 价格`,
      `${tool.name} 替代`,
      `${tool.name} vs`,
      cat?.name || "",
      `best ${cat?.name || ''} tools`,
      ...tool.tags,
    ],
    openGraph: {
      title: `${tool.name} 深度评测 | AI工具箱`,
      description: `${tool.tagline}。了解${tool.name}的核心功能、优缺点和定价。`,
      type: 'article',
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: `${BASE_URL}/tools/${category}/${slug}`,
    },
  };
}

export default async function ToolDetailPage({ params }: Props) {
  const { category, slug } = await params;
  const tool = getToolBySlug(category, slug);
  if (!tool) notFound();

  const cat = getCategoryBySlug(category);
  const relatedTools = getRelatedTools(tool, 3);

  const faqItems = [
    { q: `${tool.name}是免费的吗？`, a: `该工具提供${getPricingLabel(tool.pricing)}模式${tool.pricingNotes ? '。' + tool.pricingNotes : '，具体免费额度请访问官网了解。'}` },
    { q: `${tool.name}支持中文吗？`, a: `支持语言：${tool.language.join('、')}` },
    { q: `如何使用${tool.name}？`, a: `访问官网${tool.website}，注册账号后即可开始使用。` },
    { q: `${tool.name}适合谁用？`, a: tool.bestFor ? `最适合：${tool.bestFor}` : '适合需要AI辅助写作、设计、编程等场景的用户。' },
    { q: `${tool.name}的最佳替代工具有哪些？`, a: tool.alternatives ? `主要替代工具包括：${tool.alternatives.join('、')}` : '可以关注同类型的其他AI工具。' },
  ];

  const pros = tool.pros?.length ? tool.pros : ['功能强大', '使用便捷', '更新频繁'];
  const cons = tool.cons?.length ? tool.cons : ['部分功能需要付费', '学习成本'];

  return (
    <Container>
      <BreadcrumbJsonLd
        baseUrl={BASE_URL}
        items={[
          { name: '首页', url: '/' },
          { name: cat?.name || category, url: `/tools/${category}` },
          { name: tool.name, url: `/tools/${category}/${slug}` },
        ]}
      />
      <SoftwareAppJsonLd tool={tool} baseUrl={BASE_URL} />
      <FAQJsonLd questions={faqItems} />
      <HowToJsonLd
        name={`如何使用${tool.name}`}
        description={`${tool.tagline} - ${tool.description.slice(0, 100)}`}
        steps={generateHowToSteps(tool)}
        baseUrl={BASE_URL}
      />

      <div className="py-8">
        <Breadcrumbs
          items={[
            { label: cat?.name || category, href: `/tools/${category}` },
            { label: tool.name },
          ]}
        />

        {/* Hero */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className="text-6xl flex-shrink-0">{tool.logo}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-3">
                <h1 className="text-3xl font-bold text-zinc-900">{tool.name}</h1>
                <span className={`text-sm px-3 py-1 rounded-full ${getPricingColor(tool.pricing)}`}>
                  {getPricingLabel(tool.pricing)}
                </span>
              </div>
              <p className="text-lg text-zinc-600 mb-4">{tool.tagline}</p>
              <p className="text-zinc-700 leading-relaxed mb-6">{tool.description}</p>
              <div className="flex gap-3 flex-wrap mb-4">
                {tool.tags.map((tag) => (
                  <TagPill key={tag} label={tag} variant="blue" />
                ))}
              </div>
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                访问官网 →
              </a>
            </div>
          </div>
        </div>

        <AdSlot className="h-24 mb-8" />

        {/* Best For / Not For */}
        {(tool.bestFor || tool.notFor) && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {tool.bestFor && (
              <div className="bg-green-50 rounded-xl border border-green-200 p-6">
                <h2 className="text-lg font-bold text-green-800 mb-3">✅ 最佳适用场景</h2>
                <p className="text-green-700">{tool.bestFor}</p>
              </div>
            )}
            {tool.notFor && (
              <div className="bg-red-50 rounded-xl border border-red-200 p-6">
                <h2 className="text-lg font-bold text-red-800 mb-3">⚠️ 不适合场景</h2>
                <p className="text-red-700">{tool.notFor}</p>
              </div>
            )}
          </div>
        )}

        {/* Pros & Cons */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl border border-zinc-200 p-6">
            <h2 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <span className="text-green-600">💚</span> 优点
            </h2>
            <ul className="space-y-2">
              {pros.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-zinc-700">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-zinc-200 p-6">
            <h2 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <span className="text-red-500">💔</span> 缺点
            </h2>
            <ul className="space-y-2">
              {cons.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-zinc-700">
                  <span className="text-red-500 mt-0.5">−</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing Notes */}
        {tool.pricingNotes && (
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 mb-8">
            <h2 className="text-lg font-bold text-blue-800 mb-2">💰 定价说明</h2>
            <p className="text-blue-700">{tool.pricingNotes}</p>
          </div>
        )}

        {/* Features & UseCases */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl border border-zinc-200 p-6">
            <h2 className="text-xl font-bold text-zinc-900 mb-4">⚡ 核心功能</h2>
            <ul className="space-y-2">
              {tool.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-zinc-700">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-zinc-200 p-6">
            <h2 className="text-xl font-bold text-zinc-900 mb-4">🎯 适用场景</h2>
            <ul className="space-y-2">
              {tool.useCases.map((uc, i) => (
                <li key={i} className="flex items-start gap-2 text-zinc-700">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>{uc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Platform & Language */}
        <div className="bg-white rounded-xl border border-zinc-200 p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-zinc-900 mb-3">📱 支持平台</h3>
              <div className="flex gap-2 flex-wrap">
                {tool.platform.map((p) => (
                  <span key={p} className="text-sm bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full">{p}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 mb-3">🌐 支持语言</h3>
              <div className="flex gap-2 flex-wrap">
                {tool.language.map((l) => (
                  <span key={l} className="text-sm bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full">{l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Alternatives */}
        {tool.alternatives && tool.alternatives.length > 0 && (
          <div className="bg-white rounded-xl border border-zinc-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-zinc-900 mb-4">🔄 替代工具</h2>
            <div className="flex flex-wrap gap-3">
              {tool.alternatives.map((alt) => (
                <span key={alt} className="text-sm bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full">
                  {alt}
                </span>
              ))}
            </div>
          </div>
        )}

        <AdSlot className="h-24 mb-8" />

        {/* FAQ */}
        <div className="bg-white rounded-xl border border-zinc-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">❓ 常见问题</h2>
          <FaqSection items={faqItems} />
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mb-8">
            <SectionHeading title="🔗 相关工具推荐" />
            <ToolGrid tools={relatedTools} />
          </div>
        )}

        {/* Back to category */}
        <div className="text-center">
          <Link href={`/tools/${category}`} className="text-blue-600 hover:underline">
            ← 返回{cat?.name}分类
          </Link>
        </div>
      </div>
    </Container>
  );
}
