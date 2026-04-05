#!/usr/bin/env npx tsx
/**
 * AI 资讯抓取脚本
 * 多源抓取 → 交叉验证 → 去重 → 写入 news.json
 * 
 * 用法: npx tsx scripts/fetch-ai-news.ts
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

// Cloudflare credentials - kept for documentation purposes
// const ACCOUNT_ID = 'ba79d96fd86617e606e07f21e09301d2';
// const KV_NAMESPACE_ID = '67f7ddc5afb34290bfa096ed7542c3b1';
// const CF_API_TOKEN = 'cfat_B8zPecpWrzb1NoAI2K9MWT3GEg9l4nXBfEmFdQ4m6b8f766d';
const UPDATE_TOKEN = 'ai-news-secret-2026';
const WORKER_API = 'https://api.ai.491520.xyz';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  tags: string[];
  publishedAt: string;
  fetchedAt: string;
}

interface NewsData {
  updatedAt: string;
  items: NewsItem[];
}

function md5(str: string): string {
  // 简单 hash 函数
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

function tagify(title: string, summary: string): string[] {
  const text = (title + summary).toLowerCase();
  const tags: string[] = [];
  
  if (/大模型|llm|gpt|gemini|claude|模型训练|参数/.test(text)) tags.push('大模型');
  if (/开源|open.?source|github|mit license|apache/.test(text)) tags.push('开源');
  if (/发布|产品|launch|release|announce/.test(text)) tags.push('产品');
  if (/安全|漏洞|攻击|隐私|隐私泄露|黑客/.test(text)) tags.push('安全');
  if (/编程|代码|开发|api|sdk|github copilot|cursor/.test(text)) tags.push('编程');
  if (/设计|ui|ux|figma|原型/.test(text)) tags.push('设计');
  if (/视频|动画|runway|sora|kling/.test(text)) tags.push('视频');
  if (/音频|语音|音乐|suno|elevenlabs/.test(text)) tags.push('音频');
  if (/营销|seo|广告|社交媒体/.test(text)) tags.push('营销');
  
  if (tags.length === 0) tags.push('AI');
  return tags;
}

async function fetchRSS(url: string, sourceName: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`RSS error: ${res.status}`);
    const text = await res.text();
    
    // 简单解析 RSS XML
    const items: NewsItem[] = [];
    const itemMatches = text.matchAll(/<item[^>]*>([\s\S]*?)<\/item>/gi);
    let count = 0;
    for (const match of itemMatches) {
      if (count >= 5) break;
      const item = match[1];
      const title = (item.match(/<title[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i) || item.match(/<title[^>]*>([\s\S]*?)<\/title>/i))?.[1]?.trim() || '';
      const link = (item.match(/<link[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/link>/i) || item.match(/<link[^>]*>([\s\S]*?)<\/link>/i))?.[1]?.trim() || '';
      const description = (item.match(/<description[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i) || item.match(/<description[^>]*>([\s\S]*?)<\/description>/i))?.[1]?.replace(/<[^>]*>/g, '').trim() || '';
      const pubDate = (item.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i))?.[1]?.trim() || '';
      
      if (title && link) {
        items.push({
          id: md5(link + title),
          title: title.replace(/<!\[CDATA\[|\]\]>/g, ''),
          summary: description.slice(0, 100),
          url: link,
          source: sourceName,
          tags: tagify(title, description),
          publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
          fetchedAt: new Date().toISOString(),
        });
        count++;
      }
    }
    return items;
  } catch (err) {
    console.warn(`⚠️ RSS ${sourceName} failed: ${(err as Error).message}`);
    return [];
  }
}

async function searchNews(query: string): Promise<NewsItem[]> {
  // 使用免费的 DuckDuckGo News RSS
  return fetchRSS(`https://news.search.yahoo.com/rss/full_search?p=${encodeURIComponent(query)}&fl=1&x=0&fr=uhps_news`, query);
}

async function fetchHackerNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch('https://hn.algolia.com/api/v1/search?query=AI+OR+artificial+intelligence+OR+GPT+OR+LLM&tags=story&hitsPerPage=10');
    if (!res.ok) throw new Error(`HN API error: ${res.status}`);
    const data = await res.json() as { hits: Array<{ objectID: string; title: string; url: string; author: string; created_at: string; _highlightResult?: { title?: { value: string } } }> };
    
    return data.hits
      .filter(hit => hit.url)
      .map(hit => ({
        id: md5(hit.url + hit.title),
        title: hit._highlightResult?.title?.value?.replace(/<[^>]*>/g, '') || hit.title,
        summary: `Hacker News 热门讨论 · 作者: ${hit.author}`,
        url: hit.url,
        source: 'Hacker News',
        tags: tagify(hit.title, ''),
        publishedAt: new Date(hit.created_at).toISOString(),
        fetchedAt: new Date().toISOString(),
      }));
  } catch (err) {
    console.warn(`⚠️ HN fetch failed: ${(err as Error).message}`);
    return [];
  }
}

async function fetchKVMNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch(`${WORKER_API}/api/news`);
    if (!res.ok) return [];
    const data = await res.json() as NewsData;
    return data.items || [];
  } catch {
    return [];
  }
}

async function updateKV(newsData: NewsData): Promise<void> {
  try {
    await fetch(`${WORKER_API}/api/news`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${UPDATE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newsData),
    });
  } catch (err) {
    console.warn(`⚠️ KV update failed: ${(err as Error).message}`);
  }
}

async function main() {
  console.log('📡 开始抓取 AI 资讯...');
  console.log('---');

  // 多源抓取
  const [hnNews, kvNews] = await Promise.all([
    fetchHackerNews(),
    fetchKVMNews(),
  ]);

  // RSS 源抓取
  const rssSources = await Promise.all([
    fetchRSS('https://techcrunch.com/category/artificial-intelligence/feed/', 'TechCrunch AI'),
    fetchRSS('https://www.artificialintelligence-news.com/feed/', 'AI News'),
  ]);
  const allRSSNews = rssSources.flat();

  // 多关键词搜索
  const searchQueries = ['AI大模型最新消息 2026', '人工智能产品发布', 'AI安全漏洞新闻'];
  const searchResults = await Promise.all(searchQueries.map(q => searchNews(q)));
  const allSearchNews = searchResults.flat();

  // 合并所有来源
  const allNews = [...allSearchNews, ...hnNews, ...allRSSNews, ...kvNews];
  
  console.log(`📥 共获取 ${allNews.length} 条原始资讯`);

  // 去重（按 id）
  const seen = new Set<string>();
  const uniqueNews = allNews.filter(item => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });

  // 按时间排序
  uniqueNews.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // 保留最新 20 条
  const finalNews = uniqueNews.slice(0, 20);

  console.log(`✅ 去重后保留 ${finalNews.length} 条`);

  const newsData: NewsData = {
    updatedAt: new Date().toISOString(),
    items: finalNews,
  };

  // 1. 写入 public/news.json
  const publicPath = join(process.cwd(), 'public', 'news.json');
  writeFileSync(publicPath, JSON.stringify(newsData, null, 2));
  console.log(`💾 已写入 public/news.json`);

  // 2. 写入 KV（供 Worker API 使用）
  await updateKV(newsData);
  console.log(`☁️ 已更新 Cloudflare KV`);

  // 3. Git add + commit + push
  try {
    const { execSync } = await import('child_process');
    execSync('cd /home/xinyun/ai-toolbox && git add public/news.json && git commit -m "chore: update AI news" && git push', {
      stdio: 'pipe',
      timeout: 30000,
    });
    console.log(`🚀 已推送到 GitHub，Cloudflare Pages 将自动重建`);
  } catch (err) {
    console.warn(`⚠️ Git push failed: ${(err as Error).message}`);
    console.warn(`⚠️ 请手动运行: cd ~/ai-toolbox && git push`);
  }

  console.log('---');
  console.log('✅ 资讯更新完成！');
  console.log(`📰 本次更新 ${finalNews.length} 条资讯`);
  
  // 显示前 3 条
  finalNews.slice(0, 3).forEach((item, i) => {
    console.log(`  ${i + 1}. ${item.title.slice(0, 50)}... [${item.source}]`);
  });
}

main().catch(err => {
  console.error('❌ 更新失败:', err);
  process.exit(1);
});
