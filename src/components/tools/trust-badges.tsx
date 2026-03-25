interface TrustBadgeProps {
  rating?: number;
  reviewCount?: number;
  lastVerified?: string;
  affiliate?: boolean;
  showRating?: boolean;
  size?: 'sm' | 'md';
}

/**
 * 信任标识组件
 * 显示"已验证"标识、评分、联盟链接标记等信任元素
 */
export function TrustBadge({ rating, reviewCount, lastVerified, affiliate, showRating = true, size = 'sm' }: TrustBadgeProps) {
  const sizeClasses = size === 'sm' ? 'text-xs' : 'text-sm';
  const badgeSize = size === 'sm' ? 'px-2 py-0.5' : 'px-3 py-1';

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* 已验证标识 */}
      {lastVerified && (
        <span className={`inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 rounded-full ${badgeSize} ${sizeClasses}`}>
          <span>✓</span>
          <span>已验证</span>
        </span>
      )}

      {/* 评分 */}
      {showRating && rating && (
        <span className={`inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full ${badgeSize} ${sizeClasses}`}>
          <span>⭐</span>
          <span>{rating.toFixed(1)}</span>
          {reviewCount && <span className="text-amber-500">({reviewCount})</span>}
        </span>
      )}

      {/* 联盟/赞助链接标识 */}
      {affiliate && (
        <span className={`inline-flex items-center gap-1 bg-zinc-100 text-zinc-500 border border-zinc-300 rounded-full ${badgeSize} ${sizeClasses}`}>
          <span>🔗</span>
          <span>联盟链接</span>
        </span>
      )}
    </div>
  );
}

/**
 * 大的信任标识，用于工具详情页
 */
export function TrustBadgeLarge({ rating, reviewCount, lastVerified, affiliate }: Omit<TrustBadgeProps, 'showRating' | 'size'>) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <TrustBadge rating={rating} reviewCount={reviewCount} lastVerified={lastVerified} affiliate={affiliate} size="md" />
    </div>
  );
}
