import { notFound } from 'next/navigation';
import Container from '@/components/layout/container';
import Breadcrumbs from '@/components/common/breadcrumbs';
import Link from 'next/link';
import type { Metadata } from 'next';
import freeToolsData from '@/data/free-tools.json';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return freeToolsData.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = freeToolsData.find((t) => t.slug === slug);
  if (!tool) return {};
  return {
    title: `${tool.name} - 免费工具`,
    description: tool.description,
  };
}

export default async function FreeToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = freeToolsData.find((t) => t.slug === slug);
  if (!tool) notFound();

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs
          items={[
            { label: '免费工具', href: '/free-tools' },
            { label: tool.name },
          ]}
        />

        <div className="bg-white rounded-2xl border border-zinc-200 p-8">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl">{tool.emoji}</span>
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">{tool.name}</h1>
              <p className="text-zinc-500 mt-1">{tool.tagline}</p>
            </div>
          </div>

          <p className="text-zinc-700 leading-relaxed mb-8">{tool.description}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-50 rounded-xl p-6">
              <h2 className="font-semibold text-zinc-900 mb-3">📖 使用方法</h2>
              <p className="text-zinc-600 text-sm leading-relaxed">{tool.howToUse}</p>
            </div>
            {tool.example && (
              <div className="bg-blue-50 rounded-xl p-6">
                <h2 className="font-semibold text-zinc-900 mb-3">💡 使用示例</h2>
                <p className="text-zinc-600 text-sm leading-relaxed">{tool.example}</p>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-200 text-center">
            <p className="text-zinc-500 text-sm mb-4">工具开发中，即将上线...</p>
            <Link href="/free-tools" className="text-blue-600 hover:underline">
              ← 返回免费工具列表
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
