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

const ALLOWED_TAGS = ['大模型', '开源', '产品', '安全', '编程', '设计', '视频', '音频', '营销'];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // GET /api/news - 读取资讯
    if (request.method === 'GET' && url.pathname === '/api/news') {
      const tag = url.searchParams.get('tag');
      
      const data = await env.AI_NEWS.get('news', 'json') as NewsData | null;
      
      if (!data || !data.items) {
        return json({ updatedAt: null, items: [] });
      }

      let items = data.items;
      if (tag && ALLOWED_TAGS.includes(tag)) {
        items = items.filter(item => item.tags.includes(tag));
      }

      return json({ updatedAt: data.updatedAt, items }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=300',
        }
      });
    }

    // PUT /api/news - 更新资讯（OpenClaw cron 调用）
    if (request.method === 'PUT' && url.pathname === '/api/news') {
      const authHeader = request.headers.get('Authorization');
      if (authHeader !== `Bearer ${env.UPDATE_TOKEN}`) {
        return json({ error: 'Unauthorized' }, { status: 401 });
      }

      const body = await request.json() as NewsData;
      
      // 验证数据结构
      if (!body.items || !Array.isArray(body.items)) {
        return json({ error: 'Invalid data format' }, { status: 400 });
      }

      // 保留最多20条
      body.items = body.items.slice(0, 20);
      body.updatedAt = new Date().toISOString();

      await env.AI_NEWS.put('news', JSON.stringify(body), {
        expirationTtl: 604800 // 7天
      });

      return json({ success: true, count: body.items.length });
    }

    // Health check
    if (request.method === 'GET' && url.pathname === '/health') {
      return json({ status: 'ok', kv: 'ai' });
    }

    return json({ error: 'Not found' }, { status: 404 });
  }
};

function json(data: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });
}

interface Env {
  AI_NEWS: KVNamespace;
  UPDATE_TOKEN: string;
}
