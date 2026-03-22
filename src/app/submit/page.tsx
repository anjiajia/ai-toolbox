import Container from '@/components/layout/container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '提交工具',
  description: '向我们提交你发现的优质AI工具，丰富我们的工具库。',
};

export default function SubmitPage() {
  return (
    <Container>
      <div className="py-12 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 mb-6">提交AI工具</h1>
        <p className="text-zinc-600 mb-8">如果你发现了优质的AI工具，欢迎提交给我们。审核通过后会添加到网站。</p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">工具名称</label>
            <input type="text" className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="例如：ChatGPT" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">官网链接</label>
            <input type="url" className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">工具分类</label>
            <select className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none">
              <option>AI写作</option>
              <option>AI图像</option>
              <option>AI视频</option>
              <option>AI音频</option>
              <option>AI编程</option>
              <option>AI办公</option>
              <option>AI设计</option>
              <option>AI营销</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">工具简介</label>
            <textarea rows={4} className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none" placeholder="简要描述这个工具的特点..." />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
            提交工具
          </button>
        </form>
      </div>
    </Container>
  );
}
