export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(dateStr: string): string {
  return dateStr;
}

export function getPricingLabel(pricing: string): string {
  const map: Record<string, string> = {
    free: '免费',
    freemium: '免费+付费',
    paid: '付费',
    contact: '联系获取',
  };
  return map[pricing] || pricing;
}

export function getPricingColor(pricing: string): string {
  const map: Record<string, string> = {
    free: 'bg-green-100 text-green-700',
    freemium: 'bg-blue-100 text-blue-700',
    paid: 'bg-purple-100 text-purple-700',
    contact: 'bg-gray-100 text-gray-700',
  };
  return map[pricing] || 'bg-gray-100 text-gray-700';
}
