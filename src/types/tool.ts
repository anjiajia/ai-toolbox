export type Pricing = 'free' | 'freemium' | 'paid' | 'contact';
export type Platform = 'web' | 'ios' | 'android' | 'windows' | 'mac' | 'linux';

export interface Tool {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  useCases: string[];
  pros: string[];
  cons: string[];
  pricing: Pricing;
  website: string;
  logo: string;
  tags: string[];
  platform: Platform[];
  language: string[];
  featured?: boolean;
  updatedAt: string;
  alternatives?: string[];
  bestFor?: string;
  notFor?: string;
  pricingNotes?: string;
  /** 评分 (1-5) */
  rating?: number;
  /** 评价数量 */
  reviewCount?: number;
  /** 最后验证时间 (YYYY-MM-DD) */
  lastVerified?: string;
  /** 是否为联盟/赞助链接 */
  affiliate?: boolean;
}

export interface FreeTool {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  emoji: string;
  category: string;
  howToUse: string;
  example?: string;
  features?: string[];
  useCases?: string[];
  faq?: { q: string; a: string }[];
  /** 评分 (1-5) */
  rating?: number;
  /** 使用次数 */
  usageCount?: number;
  /** 是否精选 */
  featured?: boolean;
}
