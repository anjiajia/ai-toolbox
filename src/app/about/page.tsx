import Container from '@/components/layout/container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于我们',
  description: '了解AI工具箱的创立初衷、使命和收录原则。',
};

export default function AboutPage() {
  return (
    <Container>
      <div className="py-12 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 mb-8">关于我们</h1>
        <div className="space-y-6 text-zinc-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">我们的使命</h2>
            <p>AI工具箱致力于成为最实用的AI工具导航平台，帮助用户发现和评估全球最新的AI工具，提升工作和生活效率。</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">收录原则</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>每个工具均经过人工审核，确保信息准确</li>
              <li>优先收录有实质性AI能力的工具</li>
              <li>客观呈现工具的优缺点，不夸大宣传</li>
              <li>持续跟踪工具更新，及时更新信息</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">联系我们</h2>
            <p>如有问题或建议，欢迎通过<a href="/contact" className="text-blue-600 hover:underline ml-1">联系我们</a>页面与我们取得联系。</p>
          </section>
        </div>
      </div>
    </Container>
  );
}
