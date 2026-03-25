#!/usr/bin/env node
/**
 * 生成 sitemap.xml - 用于静态导出 (output: 'export')
 * 运行时机: build 之前
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-toolbox.example.com';

const dataDir = path.join(__dirname, '../src/data/tools');
const freeToolsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/free-tools.json'), 'utf-8'));

// 读取所有分类的工具数据
function getAllTools() {
  const tools = [];
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf-8'));
    tools.push(...data);
  }
  return tools;
}

const categories = ['writing', 'image', 'video', 'audio', 'coding', 'productivity', 'design', 'marketing'];
const tools = getAllTools();
const today = new Date().toISOString().split('T')[0];

let urls = [
  `<url><loc>${BASE_URL}/</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>`,
  `<url><loc>${BASE_URL}/free-tools</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
  `<url><loc>${BASE_URL}/about</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>`,
  `<url><loc>${BASE_URL}/contact</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>`,
  `<url><loc>${BASE_URL}/privacy</loc><lastmod>${today}</lastmod><changefreq>yearly</changefreq><priority>0.3</priority></url>`,
  `<url><loc>${BASE_URL}/terms</loc><lastmod>${today}</lastmod><changefreq>yearly</changefreq><priority>0.3</priority></url>`,
  `<url><loc>${BASE_URL}/submit</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`,
  `<url><loc>${BASE_URL}/search</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
];

for (const cat of categories) {
  urls.push(`<url><loc>${BASE_URL}/tools/${cat}</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`);
}

for (const tool of tools) {
  urls.push(`<url><loc>${BASE_URL}/tools/${tool.category}/${tool.slug}</loc><lastmod>${tool.updatedAt || today}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
}

for (const tool of freeToolsData) {
  urls.push(`<url><loc>${BASE_URL}/free-tools/${tool.slug}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml);
console.log(`Sitemap generated: ${BASE_URL} (${urls.length} URLs)`);
