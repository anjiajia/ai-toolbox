import Container from '@/components/layout/container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '提交工具',
  description: '向我们提交你发现的优质AI工具，丰富我们的工具库。我们会审核后尽快添加。',
};

const CATEGORIES = [
  { value: 'writing', label: 'AI写作' },
  { value: 'image', label: 'AI图像' },
  { value: 'video', label: 'AI视频' },
  { value: 'audio', label: 'AI音频' },
  { value: 'coding', label: 'AI编程' },
  { value: 'productivity', label: 'AI办公' },
  { value: 'design', label: 'AI设计' },
  { value: 'marketing', label: 'AI营销' },
];

const PRICING_OPTIONS = [
  { value: 'free', label: '完全免费' },
  { value: 'freemium', label: '免费+付费版' },
  { value: 'paid', label: '付费为主' },
  { value: 'contact', label: '需要联系获取报价' },
];

export default function SubmitPage() {
  return (
    <Container>
      <div className="py-12 max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-zinc-900 mb-3">提交AI工具</h1>
          <p className="text-zinc-600">
            如果你发现了优质的AI工具，欢迎提交给我们。审核通过后会添加到网站，通常在3-5个工作日内完成。
          </p>
        </div>

        <form className="space-y-6 bg-white rounded-2xl border border-zinc-200 p-8">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                工具名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                placeholder="例如：ChatGPT"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                官网链接 <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                required
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Category & Pricing */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                工具分类 <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition bg-white"
              >
                <option value="">选择分类...</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                定价模式 <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition bg-white"
              >
                <option value="">选择定价模式...</option>
                {PRICING_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              一句话描述 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={100}
              className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
              placeholder="用一句话概括这个工具的核心价值（不超过100字）"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              详细描述 <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              maxLength={500}
              className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none transition"
              placeholder="描述这个工具的特点、主要功能、适用场景等（不超过500字）"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              核心功能
            </label>
            <textarea
              rows={3}
              maxLength={300}
              className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none transition"
              placeholder="列出主要功能，每行一个（如：AI写作、图像生成、视频剪辑）"
            />
            <p className="text-xs text-zinc-500 mt-1">每行一个功能</p>
          </div>

          {/* Contact */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                你的邮箱
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                placeholder="审核结果会通知你（选填）"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                你是谁？
              </label>
              <select className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition bg-white">
                <option value="">选择...</option>
                <option value="user">普通用户</option>
                <option value="developer">工具开发者</option>
                <option value="marketer">营销人员</option>
                <option value="other">其他</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            提交工具
          </button>

          <p className="text-xs text-zinc-500 text-center">
            提交表示你同意我们可以在网站上展示该工具信息。请确保提交的信息准确无误。
          </p>
        </form>
      </div>
    </Container>
  );
}
