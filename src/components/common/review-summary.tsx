interface ReviewSummaryProps {
  rating?: number;
  reviewCount?: number;
  toolName: string;
}

/**
 * 评价摘要组件
 * 显示工具的评分概览
 */
export function ReviewSummary({ rating, reviewCount, toolName }: ReviewSummaryProps) {
  if (!rating) return null;

  const stars = Math.round(rating);
  const fullStars = Array.from({ length: stars }, (_, i) => i);
  const emptyStars = Array.from({ length: 5 - stars }, (_, i) => i);

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-zinc-200">
      {/* 评分 */}
      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold text-zinc-900">{rating.toFixed(1)}</span>
        <div className="flex gap-0.5 mt-1">
          {fullStars.map((i) => (
            <span key={`full-${i}`} className="text-amber-400 text-sm">★</span>
          ))}
          {emptyStars.map((i) => (
            <span key={`empty-${i}`} className="text-zinc-300 text-sm">★</span>
          ))}
        </div>
        {reviewCount && (
          <span className="text-xs text-zinc-500 mt-1">{reviewCount} 条评价</span>
        )}
      </div>

      {/* 分隔线 */}
      <div className="w-px h-10 bg-zinc-200" />

      {/* 描述 */}
      <div className="flex-1">
        <p className="text-sm font-medium text-zinc-700">{toolName} 的用户评价</p>
        <p className="text-xs text-zinc-500 mt-1">
          基于 {reviewCount || '多个'} 位用户的真实反馈
        </p>
      </div>
    </div>
  );
}
