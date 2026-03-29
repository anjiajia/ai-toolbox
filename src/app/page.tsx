import Link from 'next/link';
import SearchBar from '@/components/common/search-bar';
import SectionHeading from '@/components/common/section-heading';
import ToolGrid from '@/components/tools/tool-grid';
import Container from '@/components/layout/container';
import AdSlot from '@/components/common/ad-slot';
import NewsSection from '@/components/news/news-section';
import { getFeaturedTools, getAllTools } from '@/lib/tools';
import { getAllCategories } from '@/lib/categories';
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-toolbox.example.com';

export const metadata: Metadata = {
  title: {
    absolute: 'AI工具箱 - 发现最新AI工具 | AI工具导航',
  },
  description: 'AI工具箱收录全球优质AI工具，涵盖AI写作、图像生成、视频制作、编程开发、办公效率等8大分类。每日更新，帮助你发现最新AI生产力工具，提升工作效率。',
  keywords: [
    'AI工具', 'AI导航', 'AI工具箱', '人工智能', 'AI写作', 'AI图像', 'AI视频',
    'AI编程', 'AI办公', 'AI营销', 'AI设计', 'AI音频', 'AI工具推荐',
    'best AI tools', 'AI tools free', 'AI软件', '人工智能软件',
  ],
  openGraph: {
    title: 'AI工具箱 - 发现最新AI工具 | AI工具导航',
    description: '收录全球优质AI工具，涵盖写作、图像、视频、编程等领域。每日更新，完全免费使用。',
    type: 'website',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

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

      {/* SEO Content Block */}
      <section className="py-12 bg-white border-b border-zinc-200">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">为什么选择AI工具箱？</h2>
            <p className="text-zinc-600 leading-relaxed mb-6">
              AI工具箱致力于为你筛选全球最优质的AI工具。我们对每个工具进行深度评测，
              涵盖功能、价格、优缺点和适用场景，帮助你在众多选择中找到最适合自己的解决方案。
              无论是AI写作、图像生成、视频制作还是编程开发，这里都能找到提升效率的最佳工具。
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
              <span>✅ 40+ 收录工具</span>
              <span>✅ 8 大分类</span>
              <span>✅ 每日更新</span>
              <span>✅ 免费使用</span>
              <span>✅ 6 大免费工具</span>
            </div>
          </div>
        </Container>
      </section>

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
        <div className="my-4">
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

      {/* News Section */}
      <NewsSection limit={5} showHeading={true} />

      {/* Ad Slot */}
      <Container>
        <div className="my-4">
          <AdSlot className="h-24" />
        </div>
      </Container>

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

      {/* SEO Content */}
      <section className="py-12 border-t border-zinc-200">
        <Container>
          <div className="max-w-3xl mx-auto prose prose-zinc">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4 text-center">如何使用AI工具箱找到适合自己的AI工具</h2>
            <div className="text-zinc-700 leading-relaxed space-y-4">
              <p>
                AI工具箱收录了涵盖8大分类的优质AI工具，包括AI写作（如ChatGPT、Claude、Jasper）、
                AI图像（Midjourney、DALL-E、Leonardo AI）、AI视频（Runway、Synthesia、Kling）、
                AI音频（ElevenLabs、Suno、Descript）、AI编程（GitHub Copilot、Cursor、Codeium）、
                AI办公（Notion AI、Grammarly、Perplexity）、AI设计（Canva AI、Gamma、Uizard）、
                AI营销（Surfer SEO、AdCreative.ai、Ocoya）。
              </p>
              <p>
                每个工具详情页都包含详细的功能介绍、优缺点分析、价格说明和替代工具推荐，
                帮助你全面了解后再做决定。我们还提供6个完全免费的在线工具，
                包括Prompt优化器、JSON格式化器、Markdown转换器等，无需注册，打开即可使用。
              </p>
              <p>
                持续关注AI工具箱，我们会不断收录最新的AI工具，更新产品评测，
                帮助你在AI浪潮中始终站在前沿。
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Final Ad */}
      <Container>
        <div className="my-4">
          <AdSlot className="h-24" />
        </div>
      </Container>
    </>
  );
}
