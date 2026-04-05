#!/usr/bin/env npx tsx
/**
 * 构建时抓取资讯数据，保存到 public/news.json
 * Next.js 构建前运行: npm run prebuild
 */

const API_URL = process.env.NEXT_PUBLIC_NEWS_API_URL || 'https://api.ai.491520.xyz';

async function fetchNews(): Promise<void> {
  console.log('📡 Fetching news from:', API_URL);
  
  try {
    const res = await fetch(`${API_URL}/api/news`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const data = await res.json();
    
    const fs = await import('fs');
    const path = await import('path');
    const outputPath = path.join(process.cwd(), 'public', 'news.json');
    
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`✅ Saved ${data.items?.length || 0} news items to public/news.json`);
  } catch (err) {
    console.warn('⚠️  Failed to fetch news, using empty data:', (err as Error).message);
    
    // Write empty data so build doesn't fail
    const fs = await import('fs');
    const path = await import('path');
    fs.writeFileSync(
      path.join(process.cwd(), 'public', 'news.json'),
      JSON.stringify({ updatedAt: null, items: [] })
    );
  }
}

fetchNews();
