import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/layout/container';
import ToolGrid from '@/components/tools/tool-grid';
import SectionHeading from '@/components/common/section-heading';
import AdSlot from '@/components/common/ad-slot';
import { getToolsByCategory } from '@/lib/tools';
import { getAllCategories, getCategoryBySlug } from '@/lib/categories';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: `${cat.name}工具 - AI工具导航`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const tools = getToolsByCategory(category);

  return (
    <Container>
      <div className="py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{cat.icon}</span>
            <h1 className="text-3xl font-bold text-zinc-900">{cat.name}</h1>
          </div>
          <p className="text-zinc-600 max-w-2xl">{cat.description}</p>
        </div>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span>›</span>
          <span className="text-zinc-900">{cat.name}</span>
        </div>

        <AdSlot className="h-24 mb-8" />

        {/* Tools Grid */}
        <SectionHeading title={`${cat.name}工具`} subtitle={`共${tools.length}个工具`} />
        <ToolGrid tools={tools} />

        {/* Other Categories */}
        <div className="mt-12 pt-8 border-t border-zinc-200">
          <SectionHeading title="其他分类" />
          <div className="flex flex-wrap gap-3">
            {getAllCategories()
              .filter((c) => c.slug !== category)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/tools/${c.slug}`}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-full text-sm hover:border-blue-300 hover:text-blue-600 transition"
                >
                  <span>{c.icon}</span>
                  <span>{c.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
