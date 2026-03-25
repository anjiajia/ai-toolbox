#!/usr/bin/env npx ts-node
/**
 * scripts/update-check.ts
 *
 * 检查工具网站是否还活着（HEAD请求检查website字段是否返回200）
 * 用法: npx ts-node scripts/update-check.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';

const DATA_DIR = path.join(__dirname, '../src/data/tools');
const LOG_FILE = path.join(DATA_DIR, 'UPDATE_LOG.json');

interface Tool {
  id: string;
  name: string;
  slug: string;
  category: string;
  website: string;
  lastVerified?: string;
}

interface UpdateLog {
  lastFullCheck: string;
  totalTools: number;
  checkedTools: { id: string; name: string; slug: string; category: string; status: number; checkedAt: string }[];
  failedTools: { id: string; name: string; slug: string; category: string; status: number; url: string }[];
  notes: string;
}

const TOOL_FILES = ['writing.json', 'image.json', 'video.json', 'audio.json', 'coding.json', 'productivity.json', 'design.json', 'marketing.json'];

function httpHead(url: string): Promise<{ status: number; ok: boolean }> {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.request(url, { method: 'HEAD', timeout: 10000 }, (res) => {
      resolve({ status: res.statusCode || 0, ok: res.statusCode === 200 });
    });
    req.on('error', () => resolve({ status: 0, ok: false }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 0, ok: false });
    });
    req.end();
  });
}

async function checkTool(tool: Tool): Promise<{ id: string; name: string; slug: string; category: string; status: number; checkedAt: string }> {
  const result = await httpHead(tool.website);
  return {
    id: tool.id,
    name: tool.name,
    slug: tool.slug,
    category: tool.category,
    status: result.status,
    checkedAt: new Date().toISOString().split('T')[0],
  };
}

async function main() {
  console.log('🔍 开始检查工具网站可用性...\n');

  const allTools: Tool[] = [];
  for (const file of TOOL_FILES) {
    const filePath = path.join(DATA_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    allTools.push(...data);
  }

  const checkedTools: UpdateLog['checkedTools'] = [];
  const failedTools: UpdateLog['failedTools'] = [];

  for (const tool of allTools) {
    process.stdout.write(`检查: ${tool.name} (${tool.website}) ... `);
    const result = await checkTool(tool);
    if (result.status === 200) {
      console.log(`✅ ${result.status}`);
      checkedTools.push(result);
    } else {
      console.log(`❌ ${result.status || '超时'}`);
      failedTools.push({ ...result, url: tool.website });
    }
  }

  const log: UpdateLog = {
    lastFullCheck: new Date().toISOString().split('T')[0],
    totalTools: allTools.length,
    checkedTools,
    failedTools,
    notes: `检查完成。成功: ${checkedTools.length}, 失败: ${failedTools.length}`,
  };

  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));

  console.log(`\n📊 检查完成！`);
  console.log(`✅ 正常: ${checkedTools.length}/${allTools.length}`);
  if (failedTools.length > 0) {
    console.log(`❌ 失效: ${failedTools.length}`);
    console.log('\n失效工具:');
    for (const t of failedTools) {
      console.log(`  - ${t.name} (${t.category}/${t.slug}): ${t.url} → HTTP ${t.status}`);
    }
  }
}

main().catch(console.error);
