import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/layout/container';
import ToolGrid from '@/components/tools/tool-grid';
import SectionHeading from '@/components/common/section-heading';
import AdSlot from '@/components/common/ad-slot';
import { getToolsByCategory } from '@/lib/tools';
import { getAllCategories, getCategoryBySlug } from '@/lib/categories';
import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/common/json-ld';

interface Props {
  params: Promise<{ category: string }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-toolbox.example.com';

// Category SEO content - 300-600 words per category
const categoryContent: Record<string, { intro: string; howToChoose: string; bestFree: string; faqs: string[] }> = {
  writing: {
    intro: 'AI写作工具正在彻底改变内容创作方式。从博客文章到营销文案，从学术论文到社交媒体帖子，AI写作助手可以帮助你将创作效率提升数倍。本站收录的AI写作工具覆盖了从免费基础版到专业企业级的各类解决方案，适用于个人博主、内容创作者、营销团队和企业用户。',
    howToChoose: '选择AI写作工具时，建议考虑以下几个维度：首先是语言支持，中文用户应优先选择对中文支持良好的工具；其次是内容质量，高质量输出往往需要付费版本；第三是定制化能力，能否学习你的品牌调性很重要；最后是价格，免费工具适合试用，专业使用建议选择付费方案。',
    bestFree: '目前最适合入门的免费AI写作工具是ChatGPT和Claude，它们都提供强大的免费版本，支持中文写作，可以满足大部分日常写作需求。进阶用户可以考虑Jasper或Copy.ai的付费计划，它们提供更多专业模板和品牌声音定制功能。',
    faqs: [
      'AI写作工具会取代人类作家吗？AI是辅助工具，不是替代品。',
      'AI生成的内容可以直接发表吗？建议人工审核和润色。',
      '免费AI写作工具够用吗？对大多数用户来说，免费版本已经足够。',
    ],
  },
  image: {
    intro: 'AI图像生成工具让创意表达变得更加简单。无论你需要产品图、社交媒体配图、概念艺术还是营销素材，这些工具都能帮你快速生成高质量图像。从Midjourney到DALL-E，从Leonardo AI到Ideogram，市场上有众多AI绘图工具可供选择。',
    howToChoose: '选择AI图像工具时，考虑以下因素：画质质量（Midjourney和DALL-E画质最佳）、操作门槛（新手建议从Canva AI或Ideogram开始）、是否需要精准文字渲染（Ideogram最擅长）、价格预算（各工具定价差异大）。',
    bestFree: '免费选项中，Adobe Firefly提供免费额度，Leonardo AI有免费积分，Ideogram每天免费生成一定数量。DALL-E每月有免费额度。',
    faqs: ['AI生成的图片有版权吗？大多数平台允许商用，但需仔细阅读条款。', '哪个AI绘图工具最适合新手？Canva AI和Ideogram操作最简单。'],
  },
  video: {
    intro: 'AI视频工具让视频制作不再是专业团队的专利。从文本生成视频到AI数字人，从自动剪辑到特效制作，这些工具大大降低了视频内容生产的门槛。无论是短视频创作者、企业营销团队还是教育工作者，都能找到适合自己的AI视频解决方案。',
    howToChoose: '选择AI视频工具时，考虑你的主要需求：短视频创作（Runway、Pika最适合）、企业培训视频（Synthesia数字人是最佳选择）、跨境营销（HeyGen支持多语言配音）。同时要考虑输出质量和渲染速度。',
    bestFree: 'Runway和Pika都提供免费版本，Kling作为国产工具有免费额度。Synthesia和HeyGen的免费体验有限。',
    faqs: ['AI生成视频需要多长时间？几秒到几分钟不等，取决于工具和复杂度。', '哪个AI视频工具最适合TikTok？Runway和Pika最适合短视频创作。'],
  },
  audio: {
    intro: 'AI音频工具涵盖语音合成、音乐生成、音频编辑等多个领域。ElevenLabs的逼真语音克隆、Suno的音乐创作、Descript的革新性音频编辑，都在重新定义音频内容的生产方式。',
    howToChoose: '语音合成工具的选择关键在于音质和克隆自然度；音乐生成工具适合需要背景音乐的内容创作者；音频编辑工具则适合播客和视频制作者。',
    bestFree: 'ElevenLabs有免费积分，Suno免费额度足够体验，Descript提供免费版本。',
    faqs: ['AI语音合成可以用作商业配音吗？需要查看各平台商用条款。', 'Suno生成的音乐有版权吗？可以商用，但需遵守平台规则。'],
  },
  coding: {
    intro: 'AI编程工具正在改变软件开发的方式。GitHub Copilot、Cursor、Windsurf等工具可以大幅提升编码效率，从代码补全到整个函数生成，从Bug检测到代码审查，AI正在成为程序员的得力助手。',
    howToChoose: '新手建议从Cursor或Codeium开始（免费），专业开发者可以考虑GitHub Copilot（付费）。选择时要考虑IDE兼容性和语言支持范围。',
    bestFree: 'Codeium完全免费且功能强大，Cursor有免费版本，Windsurf免费版已足够日常使用。',
    faqs: ['AI编程工具会取代程序员吗？不会，它们是提升效率的工具。', '免费AI编程工具哪个最好用？Codeium免费且支持70+语言。'],
  },
  productivity: {
    intro: 'AI办公工具帮助职场人士处理文档、会议记录、信息整理等工作，大幅提升日常办公效率。从Notion AI的知识管理到Otter.ai的会议转录，从Grammarly的写作检查到Perplexity的智能搜索，这些工具正在成为现代办公的标配。',
    howToChoose: '根据工作场景选择：文档处理优先Notion AI和Grammarly；会议记录选Otter.ai；信息检索选Perplexity。团队协作选Notion，个人使用可选轻量级工具。',
    bestFree: 'Grammarly免费版已足够日常使用，Perplexity免费版强大，Otter.ai有基础免费版。',
    faqs: ['Notion AI值得付费吗？经常写文档的用户很值得。', '哪个AI工具最适合会议记录？Otter.ai是首选。'],
  },
  design: {
    intro: 'AI设计工具让非设计师也能创建专业级视觉内容。Canva AI让设计变得简单，Gamma和Tome让PPT制作智能化，Uizard可以将手绘草图直接转为UI设计稿。这些工具正在 democratize 设计能力。',
    howToChoose: 'PPT制作选Gamma或Tome；社交媒体设计选Canva AI；UI/UX设计选Uizard；原型制作选Figma AI。考虑团队协作需求和输出格式。',
    bestFree: 'Canva有强大的免费版本，Gamma和Tome有免费额度，Uizard可以免费试用。',
    faqs: ['Canva AI和Photoshop如何选择？Canva AI更适合非设计师快速出图。', 'Gamma生成的PPT可以直接用吗？需要适当调整，但大幅节省时间。'],
  },
  marketing: {
    intro: 'AI营销工具帮助营销人员优化SEO、制作广告素材、管理社交媒体内容。Surfer SEO指导内容优化，AdCreative.ai生成高转化广告，Ocoya让社媒运营自动化。这些工具是数字营销人的效率利器。',
    howToChoose: 'SEO优化选Surfer SEO或Frase；广告素材选AdCreative.ai；社媒管理选Ocoya；文案优化选Anyword。考虑与现有工作流的集成程度。',
    bestFree: 'Ocoya有免费版本，Anyword提供试用，AdCreative.ai有免费试用。',
    faqs: ['Surfer SEO值得投资吗？对认真做SEO的内容团队很有价值。', 'AI生成的广告素材转化率如何？通常高于人工设计，但需测试优化。'],
  },
};

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: `${cat.name}工具推荐${cat.description ? ` | ${cat.description.split('。')[0]}` : ''} - AI工具箱`,
    description: `${cat.description} 了解各工具的功能、价格、优缺点，找到最适合你的${cat.name}工具。`,
    keywords: [cat.name, `best ${cat.name}`, `${cat.name} free`, `${cat.name} comparison`, ...cat.description.split('、')],
    openGraph: {
      title: `最佳${cat.name}工具推荐 | AI工具箱`,
      description: cat.description,
    },
    alternates: {
      canonical: `${BASE_URL}/tools/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const tools = getToolsByCategory(category);
  const content = categoryContent[category] || {
    intro: `${cat.name}是当下最热门的AI应用领域之一。`,
    howToChoose: '选择工具时建议先试用免费版本，再根据需求升级。',
    bestFree: '免费版本适合入门体验。',
    faqs: [],
  };

  return (
    <Container>
      <BreadcrumbJsonLd
        baseUrl={BASE_URL}
        items={[
          { name: '首页', url: '/' },
          { name: cat.name, url: `/tools/${category}` },
        ]}
      />

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

        {/* SEO Content */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-8 mb-8">
          <div className="prose prose-zinc max-w-none">
            <h2 className="text-xl font-bold text-zinc-900 mb-4">📖 {cat.name}工具介绍</h2>
            <p className="text-zinc-700 leading-relaxed mb-6">{content.intro}</p>

            <h2 className="text-xl font-bold text-zinc-900 mb-4">🎯 如何选择{cat.name}工具</h2>
            <p className="text-zinc-700 leading-relaxed mb-6">{content.howToChoose}</p>

            <h2 className="text-xl font-bold text-zinc-900 mb-4">🆓 {cat.name}免费工具推荐</h2>
            <p className="text-zinc-700 leading-relaxed mb-6">{content.bestFree}</p>

            {content.faqs.length > 0 && (
              <>
                <h2 className="text-xl font-bold text-zinc-900 mb-4">❓ 常见问题</h2>
                <ul className="space-y-2 mb-6">
                  {content.faqs.map((faq, i) => (
                    <li key={i} className="text-zinc-700">• {faq}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <AdSlot className="h-24 mb-8" />

        {/* Tools Grid */}
        <SectionHeading title={`${cat.name}工具`} subtitle={`共${tools.length}个工具`} />
        <ToolGrid tools={tools} />

        {/* Other Categories */}
        <div className="mt-12 pt-8 border-t border-zinc-200">
          <SectionHeading title="📚 其他分类" />
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
