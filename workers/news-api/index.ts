const ALLOWED_TAGS = ['大模型', '开源', '产品', '安全', '编程', '设计', '视频', '音频', '营销'];

function json(data: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });
}

async function handleRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);

  if (request.method === 'GET' && url.pathname === '/api/news') {
    const tag = url.searchParams.get('tag');
    const data = await env.AI_NEWS.get('news', 'json') as { updatedAt: string; items: unknown[] } | null;

    if (!data || !data.items) {
      return json({ updatedAt: null, items: [] });
    }

    let items = data.items;
    if (tag && ALLOWED_TAGS.includes(tag)) {
      items = items.filter(item => (item as { tags: string[] }).tags.includes(tag));
    }

    return json({ updatedAt: data.updatedAt, items }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      }
    });
  }

  if (request.method === 'PUT' && url.pathname === '/api/news') {
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== `Bearer ${env.UPDATE_TOKEN}`) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json() as { items?: unknown[] };

    if (!body.items || !Array.isArray(body.items)) {
      return json({ error: 'Invalid data format' }, { status: 400 });
    }

    const newsData = {
      updatedAt: new Date().toISOString(),
      items: body.items.slice(0, 20),
    };

    await env.AI_NEWS.put('news', JSON.stringify(newsData), {
      expirationTtl: 604800
    });

    return json({ success: true, count: newsData.items.length });
  }

  if (request.method === 'GET' && url.pathname === '/health') {
    return json({ status: 'ok', kv: 'ai' });
  }

  return json({ error: 'Not found' }, { status: 404 });
}

interface Env {
  AI_NEWS: KVNamespace;
  UPDATE_TOKEN: string;
}

const worker: ExportedHandler<Env> = {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return handleRequest(request, env);
  }
};

export default worker;
