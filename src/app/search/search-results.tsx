'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, Suspense } from 'react';
import { searchTools } from '@/lib/tools';
import ToolGrid from '@/components/tools/tool-grid';
import SectionHeading from '@/components/common/section-heading';

function SearchResultsInner() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    return query ? searchTools(query) : [];
  }, [query]);

  if (!query) {
    return <p className="text-zinc-500 text-center py-12">输入关键词开始搜索...</p>;
  }

  return (
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
  );
}

export default function SearchResults() {
  return (
    <Suspense fallback={<p className="text-zinc-500 text-center py-12">加载中...</p>}>
      <SearchResultsInner />
    </Suspense>
  );
}
