import type { Category } from '@/types/category';
import categoriesData from '@/data/categories.json';

export function getAllCategories(): Category[] {
  return categoriesData as Category[];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return (categoriesData as Category[]).find((c) => c.slug === slug);
}
