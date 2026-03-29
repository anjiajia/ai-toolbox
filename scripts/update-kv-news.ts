#!/usr/bin/env npx tsx
/**
 * 推送资讯到 Cloudflare KV
 * 用法: npx tsx scripts/update-kv-news.ts <news.json路径>
 */

import { readFileSync } from 'fs';
import { join } from 'path';

const ACCOUNT_ID = 'ba79d96fd86617e606e07f21e09301d2';
const NAMESPACE_ID = '67f7ddc5afb34290bfa096ed7542c3b1';
const API_TOKEN = 'cfat_B8zPecpWrzb1NoAI2K9MWT3GEg9l4nXBfEmFdQ4m6b8f766d';
const UPDATE_TOKEN = process.env.CF_UPDATE_TOKEN || 'ai-news-secret-2026';

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

async function updateKV(newsData: NewsData): Promise<void> {
  const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${NAMESPACE_ID}/values/news`;
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newsData),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`KV update failed: ${response.status} ${error}`);
  }

  console.log(`✅ 成功推送 ${newsData.items.length} 条资讯到 KV`);
}

async function main() {
  const args = process.argv.slice(2);
  let newsData: NewsData;

  if (args.length > 0) {
    // 从文件读取
    const filePath = join(process.cwd(), args[0]);
    const content = readFileSync(filePath, 'utf-8');
    newsData = JSON.parse(content);
  } else {
    // 从 stdin 读取
    const stdin = await readStdin();
    newsData = JSON.parse(stdin);
  }

  newsData.updatedAt = new Date().toISOString();
  newsData.items = newsData.items.slice(0, 20);

  await updateKV(newsData);
}

function readStdin(): Promise<string> {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.on('data', chunk => data += chunk);
    process.stdin.on('end', () => resolve(data));
  });
}

main().catch(err => {
  console.error('❌ 失败:', err.message);
  process.exit(1);
});
