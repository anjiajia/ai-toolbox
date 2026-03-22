import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
      <Link href="/" className="hover:text-blue-600 transition">首页</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <span>›</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-blue-600 transition">{item.label}</Link>
          ) : (
            <span className="text-zinc-900">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
