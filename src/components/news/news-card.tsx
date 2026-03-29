import { NewsItem } from './types';

interface NewsCardProps {
  item: NewsItem;
  compact?: boolean;
}

export default function NewsCard({ item, compact = false }: NewsCardProps) {
  const timeAgo = formatTimeAgo(item.publishedAt);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-4 bg-white rounded-xl border border-zinc-200 hover:shadow-md hover:border-blue-200 transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-zinc-900 group-hover:text-blue-600 transition line-clamp-2">
            {item.title}
          </h3>
          {!compact && (
            <p className="text-sm text-zinc-500 mt-1 line-clamp-2">{item.summary}</p>
          )}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {item.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-right shrink-0">
          <span className="text-xs text-zinc-400">{timeAgo}</span>
          <span className="text-xs text-zinc-400">{item.source}</span>
        </div>
      </div>
    </a>
  );
}

function formatTimeAgo(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}分钟前`;
  if (diffHours < 24) return `${diffHours}小时前`;
  if (diffDays < 7) return `${diffDays}天前`;
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
}
