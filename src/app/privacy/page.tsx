import Container from '@/components/layout/container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '隐私政策',
};

export default function PrivacyPage() {
  return (
    <Container>
      <div className="py-12 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 mb-8">隐私政策</h1>
        <div className="space-y-4 text-zinc-700 leading-relaxed text-sm">
          <p>最后更新：2026年3月22日</p>
          <p>AI工具箱非常重视您的隐私。本网站不收集个人敏感信息。</p>
          <h2 className="text-lg font-semibold text-zinc-900 mt-6">信息收集</h2>
          <p>我们使用Cookie分析访问量，用于改善网站体验。您可以通过浏览器设置禁用Cookie。</p>
          <h2 className="text-lg font-semibold text-zinc-900 mt-6">第三方服务</h2>
          <p>本网站可能使用Google Analytics和Google AdSense，这些服务有其独立的隐私政策。</p>
          <h2 className="text-lg font-semibold text-zinc-900 mt-6">联系我们</h2>
          <p>如有任何隐私相关问题，请通过<a href="/contact" className="text-blue-600 hover:underline">联系我们</a>页面取得联系。</p>
        </div>
      </div>
    </Container>
  );
}
