import Container from '@/components/layout/container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '服务条款',
};

export default function TermsPage() {
  return (
    <Container>
      <div className="py-12 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 mb-8">服务条款</h1>
        <div className="space-y-4 text-zinc-700 leading-relaxed text-sm">
          <p>最后更新：2026年3月22日</p>
          <p>使用AI工具箱即表示您同意以下条款：</p>
          <h2 className="text-lg font-semibold text-zinc-900 mt-6">免责声明</h2>
          <p>我们尽力保证工具信息的准确性，但不对工具的实际表现、功能变化或可用性做任何保证。使用工具前请查阅官方最新信息。</p>
          <h2 className="text-lg font-semibold text-zinc-900 mt-6">知识产权</h2>
          <p>网站内容和结构受版权保护。禁止未经授权的复制和分发。</p>
          <h2 className="text-lg font-semibold text-zinc-900 mt-6">链接</h2>
          <p>本网站包含指向第三方网站的链接，我们不对第三方网站的内容和隐私实践负责。</p>
        </div>
      </div>
    </Container>
  );
}
