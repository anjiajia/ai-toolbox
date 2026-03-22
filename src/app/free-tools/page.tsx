import Link from 'next/link';
import Container from '@/components/layout/container';
import SectionHeading from '@/components/common/section-heading';
import type { Metadata } from 'next';
import freeToolsData from '@/data/free-tools.json';

export const metadata: Metadata = {
  title: '免费在线工具 - 无需注册直接用',
  description: '收录实用的免费在线AI工具，包括Prompt优化器、JSON格式化器、Markdown转换器等，打开浏览器即可使用。',
};

export default function FreeToolsPage() {
  const tools = freeToolsData;

  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-3">🆓 免费在线工具</h1>
          <p className="text-zinc-600">无需注册，打开浏览器即可使用。持续更新中...</p>
        </div>

        <SectionHeading title="所有工具" subtitle={`共${tools.length}个工具`} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/free-tools/${tool.slug}`}
              className="bg-white rounded-xl border border-zinc-200 p-6 hover:shadow-lg hover:border-blue-200 transition group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{tool.emoji}</span>
                <div>
                  <h3 className="font-semibold text-zinc-900 group-hover:text-blue-600 transition">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-zinc-500">{tool.category}</p>
                </div>
              </div>
              <p className="text-sm text-zinc-600 line-clamp-2">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
