import Container from '@/components/layout/container';
import ToolGrid from '@/components/tools/tool-grid';
import SectionHeading from '@/components/common/section-heading';
import SearchBar from '@/components/common/search-bar';
import { searchTools } from '@/lib/tools';
import type { Metadata } from 'next';

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `搜索：${q}` : '搜索工具',
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q || '';
  const results = query ? searchTools(query) : [];

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-6">搜索AI工具</h1>
        <div className="max-w-xl mb-8">
          <SearchBar defaultValue={query} />
        </div>

        {query ? (
          <>
            <SectionHeading
              title={`"${query}" 的搜索结果`}
              subtitle={`找到${results.length}个相关工具`}
            />
            <ToolGrid
              tools={results}
              emptyMessage={`没有找到与"${query}"相关的工具`}
            />
          </>
        ) : (
          <p className="text-zinc-500 text-center py-12">输入关键词开始搜索...</p>
        )}
      </div>
    </Container>
  );
}
