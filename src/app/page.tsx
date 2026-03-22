import Link from 'next/link';
import SearchBar from '@/components/common/search-bar';
import SectionHeading from '@/components/common/section-heading';
import ToolGrid from '@/components/tools/tool-grid';
import Container from '@/components/layout/container';
import AdSlot from '@/components/common/ad-slot';
import { getFeaturedTools, getAllTools } from '@/lib/tools';
import { getAllCategories } from '@/lib/categories';

export default function HomePage() {
  const featuredTools = getFeaturedTools().slice(0, 6);
  const allTools = getAllTools().slice(0, 9);
  const categories = getAllCategories();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
              🧰 发现最新AI工具
            </h1>
            <p className="text-lg text-zinc-600 mb-8">
              收录全球优质AI工具，涵盖写作、图像、视频、编程等领域<br />
              提升工作效率，从找到对的工具开始
            </p>
            <SearchBar />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/tools/${cat.slug}`}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-full text-sm text-zinc-700 hover:border-blue-300 hover:text-blue-600 hover:shadow-sm transition"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Ad Slot */}
      <Container>
        <div className="my-8">
          <AdSlot className="h-24" />
        </div>
      </Container>

      {/* Featured Tools */}
      <section className="py-12">
        <Container>
          <SectionHeading
            title="⭐ 编辑推荐"
            subtitle="精选热门AI工具，助你先人一步"
          />
          <ToolGrid tools={featuredTools} />
        </Container>
      </section>

      {/* Ad Slot */}
      <Container>
        <div className="my-8">
          <AdSlot className="h-24" />
        </div>
      </Container>

      {/* All Tools */}
      <section className="py-12 bg-white">
        <Container>
          <SectionHeading
            title="🔥 热门工具"
            subtitle="最受欢迎的AI工具集合"
          />
          <ToolGrid tools={allTools} />
          <div className="text-center mt-8">
            <Link
              href="/tools/writing"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              查看全部工具
              <span>→</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Free Tools Section */}
      <section className="py-12">
        <Container>
          <SectionHeading
            title="🆓 免费在线工具"
            subtitle="无需注册，打开浏览器即可使用"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'AI Prompt优化器', emoji: '💡', slug: 'prompt-optimizer' },
              { name: 'JSON格式化器', emoji: '🔧', slug: 'json-formatter' },
              { name: 'Markdown转HTML', emoji: '📄', slug: 'markdown-to-html' },
              { name: '字数统计器', emoji: '📝', slug: 'word-counter' },
              { name: '标题生成器', emoji: '✍️', slug: 'title-generator' },
              { name: '配色方案生成', emoji: '🎨', slug: 'color-palette' },
            ].map((tool) => (
              <Link
                key={tool.slug}
                href={`/free-tools/${tool.slug}`}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-zinc-200 hover:shadow-md hover:border-blue-200 transition text-center"
              >
                <span className="text-3xl">{tool.emoji}</span>
                <span className="text-sm text-zinc-700">{tool.name}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Categories Overview */}
      <section className="py-12 bg-white">
        <Container>
          <SectionHeading
            title="📚 AI工具分类"
            subtitle="按领域探索你需要的AI工具"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/tools/${cat.slug}`}
                className="p-5 bg-zinc-50 rounded-xl border border-zinc-200 hover:border-blue-200 hover:shadow-md transition"
              >
                <span className="text-3xl">{cat.icon}</span>
                <h3 className="font-semibold text-zinc-900 mt-3">{cat.name}</h3>
                <p className="text-sm text-zinc-500 mt-1">{cat.count}个工具</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Final Ad */}
      <Container>
        <div className="my-8">
          <AdSlot className="h-24" />
        </div>
      </Container>
    </>
  );
}
