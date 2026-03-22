import Container from '@/components/layout/container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '联系我们',
  description: '通过表单联系我们，提出问题或建议。',
};

export default function ContactPage() {
  return (
    <Container>
      <div className="py-12 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 mb-6">联系我们</h1>
        <p className="text-zinc-600 mb-8">有工具要提交，或有问题要反馈？填写下面的表单联系我们。</p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">邮箱</label>
            <input type="email" className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">主题</label>
            <input type="text" className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="工具提交 / 建议反馈" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">内容</label>
            <textarea rows={5} className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none" placeholder="请详细描述..." />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
            发送消息
          </button>
        </form>
      </div>
    </Container>
  );
}
