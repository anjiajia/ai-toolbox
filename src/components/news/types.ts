export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  tags: string[];
  publishedAt: string;
  fetchedAt: string;
}

export interface NewsData {
  updatedAt: string;
  items: NewsItem[];
}
