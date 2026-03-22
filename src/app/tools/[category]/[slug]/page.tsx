import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/layout/container';
import Breadcrumbs from '@/components/common/breadcrumbs';
import TagPill from '@/components/common/tag-pill';
import ToolGrid from '@/components/tools/tool-grid';
import SectionHeading from '@/components/common/section-heading';
import AdSlot from '@/components/common/ad-slot';
import FaqSection from '@/components/common/faq-section';
import { getToolBySlug, getRelatedTools, getAllTools } from '@/lib/tools';
import { getCategoryBySlug } from '@/lib/categories';
import { getPricingLabel, getPricingColor } from '@/lib/utils';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((t) => ({ category: t.category, slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const tool = getToolBySlug(category, slug);
  if (!tool) return {};
  return {
    title: `${tool.name} - AI工具详情`,
    description: tool.tagline,
  };
}

export default async function ToolDetailPage({ params }: Props) {
  const { category, slug } = await params;
  const tool = getToolBySlug(category, slug);
  if (!tool) notFound();

  const cat = getCategoryBySlug(category);
  const relatedTools = getRelatedTools(tool, 3);

  const faqItems = [
    { q: `${tool.name}是免费的吗？`, a: `该工具提供${getPricingLabel(tool.pricing)}模式，具体免费额度请访问官网了解。` },
    { q: `${tool.name}支持中文吗？`, a: `支持语言：${tool.language.join('、')}` },
    { q: `如何使用${tool.name}？`, a: `访问官网${tool.website}，注册账号后即可开始使用。` },
  ];

  return (
    <Container>
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

        {/* Features & UseCases */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl border border-zinc-200 p-6">
            <h2 className="text-xl font-bold text-zinc-900 mb-4">核心功能</h2>
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
            <h2 className="text-xl font-bold text-zinc-900 mb-4">适用场景</h2>
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
              <h3 className="font-semibold text-zinc-900 mb-3">支持平台</h3>
              <div className="flex gap-2 flex-wrap">
                {tool.platform.map((p) => (
                  <span key={p} className="text-sm bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full">
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 mb-3">支持语言</h3>
              <div className="flex gap-2 flex-wrap">
                {tool.language.map((l) => (
                  <span key={l} className="text-sm bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <AdSlot className="h-24 mb-8" />

        {/* FAQ */}
        <div className="bg-white rounded-xl border border-zinc-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">常见问题</h2>
          <FaqSection items={faqItems} />
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mb-8">
            <SectionHeading title="相关工具" />
            <ToolGrid tools={relatedTools} />
          </div>
        )}

        {/* Back to category */}
        <div className="text-center">
          <Link
            href={`/tools/${category}`}
            className="text-blue-600 hover:underline"
          >
            ← 返回{cat?.name}分类
          </Link>
        </div>
      </div>
    </Container>
  );
}
