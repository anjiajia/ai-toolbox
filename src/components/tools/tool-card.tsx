import Link from 'next/link';
import type { Tool } from '@/types/tool';
import { getPricingLabel, getPricingColor } from '@/lib/utils';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${tool.category}/${tool.slug}`}
      className="block bg-white rounded-xl border border-zinc-200 p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-200 group"
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0">{tool.logo}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-zinc-900 group-hover:text-blue-600 transition">
              {tool.name}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${getPricingColor(tool.pricing)}`}>
              {getPricingLabel(tool.pricing)}
            </span>
          </div>
          <p className="text-sm text-zinc-500 mt-1 line-clamp-2">{tool.tagline}</p>
          <div className="flex gap-1.5 mt-3 flex-wrap">
            {tool.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
