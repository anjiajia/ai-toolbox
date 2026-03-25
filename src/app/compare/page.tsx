import Container from '@/components/layout/container';
import Link from 'next/link';
import ToolGrid from '@/components/tools/tool-grid';
import { getAllTools } from '@/lib/tools';
import { getAllCategories } from '@/lib/categories';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '工具对比',
  description: '将多个AI工具进行横向对比，了解它们的功能、价格、优缺点，选择最适合你的工具。',
};

export default function ComparePage() {
  const categories = getAllCategories();
  const allTools = getAllTools();

  return (
    <Container>
      <div className="py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-zinc-900 mb-3">🔍 AI工具对比</h1>
          <p className="text-zinc-600 max-w-xl mx-auto">
            选择分类，对比同类工具的功能、价格、优缺点，快速找到最适合你的AI工具。
          </p>
        </div>

        {/* Category Selection */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">选择分类</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/compare/${cat.slug}`}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-full text-sm hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="text-zinc-400">({cat.count})</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Compare by Category */}
        <div className="space-y-8">
          {categories.map((cat) => {
            const catTools = allTools.filter((t) => t.category === cat.slug);
            if (catTools.length < 2) return null;

            return (
              <div key={cat.slug} className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-zinc-200 bg-zinc-50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <h3 className="font-semibold text-zinc-900">{cat.name}</h3>
                      <p className="text-sm text-zinc-500">{catTools.length} 个工具</p>
                    </div>
                  </div>
                  <Link
                    href={`/compare/${cat.slug}`}
                    className="text-sm text-blue-600 hover:underline font-medium"
                  >
                    详细对比 →
                  </Link>
                </div>

                {/* Comparison Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-100">
                        <th className="text-left p-3 font-medium text-zinc-500 w-32">对比项</th>
                        {catTools.map((t) => (
                          <th key={t.id} className="text-left p-3 font-medium text-zinc-900 min-w-40">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{t.logo}</span>
                              <span>{t.name}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      <tr>
                        <td className="p-3 text-zinc-500">定价</td>
                        {catTools.map((t) => (
                          <td key={t.id} className="p-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${t.pricing === 'free' ? 'bg-green-100 text-green-700' : t.pricing === 'freemium' ? 'bg-blue-100 text-blue-700' : 'bg-zinc-100 text-zinc-700'}`}>
                              {t.pricing === 'free' ? '免费' : t.pricing === 'freemium' ? '免费+付费' : '付费'}
                            </span>
                            {t.pricingNotes && <p className="text-xs text-zinc-500 mt-1">{t.pricingNotes.split('(')[0]}</p>}
                          </td>
                        ))}
                      </tr>
                      <tr className="bg-zinc-50">
                        <td className="p-3 text-zinc-500">平台</td>
                        {catTools.map((t) => (
                          <td key={t.id} className="p-3">
                            <div className="flex flex-wrap gap-1">
                              {t.platform.map((p) => (
                                <span key={p} className="text-xs bg-zinc-200 text-zinc-600 px-1.5 py-0.5 rounded">{p}</span>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 text-zinc-500">语言</td>
                        {catTools.map((t) => (
                          <td key={t.id} className="p-3 text-zinc-600">
                            {t.language.slice(0, 2).join('、')}
                            {t.language.length > 2 && `等${t.language.length}种`}
                          </td>
                        ))}
                      </tr>
                      <tr className="bg-zinc-50">
                        <td className="p-3 text-zinc-500">核心功能</td>
                        {catTools.map((t) => (
                          <td key={t.id} className="p-3">
                            <ul className="space-y-1">
                              {t.features.slice(0, 2).map((f, i) => (
                                <li key={i} className="text-zinc-600 text-xs">• {f}</li>
                              ))}
                              {t.features.length > 2 && (
                                <li className="text-zinc-400 text-xs">+{t.features.length - 2}更多</li>
                              )}
                            </ul>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 text-zinc-500">最佳场景</td>
                        {catTools.map((t) => (
                          <td key={t.id} className="p-3 text-zinc-600 text-xs">
                            {t.bestFor ? t.bestFor.split(',')[0] : '-'}
                          </td>
                        ))}
                      </tr>
                      <tr className="bg-zinc-50">
                        <td className="p-3 text-zinc-500">操作</td>
                        {catTools.map((t) => (
                          <td key={t.id} className="p-3">
                            <Link
                              href={`/tools/${t.category}/${t.slug}`}
                              className="text-xs text-blue-600 hover:underline"
                            >
                              查看详情 →
                            </Link>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-blue-50 rounded-2xl border border-blue-200 p-8">
          <h2 className="text-xl font-bold text-blue-900 mb-2">没找到想要的工具？</h2>
          <p className="text-blue-700 mb-4">告诉我们你需要的工具类型，我们会帮你找到合适的选项。</p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            提交工具建议
          </Link>
        </div>
      </div>
    </Container>
  );
}
