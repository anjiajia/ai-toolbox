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
}
