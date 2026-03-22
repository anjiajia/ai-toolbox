import Link from 'next/link';

export default function Footer() {
  const categories = [
    { name: 'AI写作', href: '/tools/writing' },
    { name: 'AI图像', href: '/tools/image' },
    { name: 'AI视频', href: '/tools/video' },
    { name: 'AI音频', href: '/tools/audio' },
    { name: 'AI编程', href: '/tools/coding' },
    { name: 'AI办公', href: '/tools/productivity' },
    { name: 'AI设计', href: '/tools/design' },
    { name: 'AI营销', href: '/tools/marketing' },
  ];

  return (
    <footer className="bg-zinc-900 text-zinc-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              <span className="text-2xl">🧰</span>
              <span>AI工具箱</span>
            </Link>
            <p className="text-sm text-zinc-400">
              发现并分享最新AI工具，提升工作效率，创造更多可能。
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">AI工具分类</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href} className="text-sm text-zinc-400 hover:text-white transition">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><Link href="/free-tools" className="text-sm text-zinc-400 hover:text-white transition">免费工具</Link></li>
              <li><Link href="/about" className="text-sm text-zinc-400 hover:text-white transition">关于我们</Link></li>
              <li><Link href="/submit" className="text-sm text-zinc-400 hover:text-white transition">提交工具</Link></li>
              <li><Link href="/contact" className="text-sm text-zinc-400 hover:text-white transition">联系我们</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">法律信息</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-zinc-400 hover:text-white transition">隐私政策</Link></li>
              <li><Link href="/terms" className="text-sm text-zinc-400 hover:text-white transition">服务条款</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-sm text-zinc-500">
          <p>© 2026 AI工具箱 · 发现AI，分享智慧</p>
        </div>
      </div>
    </footer>
  );
}
