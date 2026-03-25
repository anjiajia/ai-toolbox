'use client';
import { useState } from 'react';

function parseMarkdown(md: string): string {
  const lines = md.split('\n');
  const result: string[] = [];
  let inUl = false;
  let inPre = false;

  const closeUl = () => { if (inUl) { result.push('</ul>'); inUl = false; } };

  for (const raw of lines) {
    const line = raw.trim();

    // code fence open
    if (line.startsWith('```')) {
      closeUl();
      if (inPre) { result.push('</code></pre>'); inPre = false; }
      else { result.push(`<pre><code>${line.slice(3)}`); inPre = true; }
      continue;
    }
    if (inPre) { result.push(line); continue; }

    // hr
    if (line === '---') { closeUl(); result.push('<hr>'); continue; }

    // headings
    if (line.startsWith('### ')) { closeUl(); result.push(`<h3>${line.slice(4)}</h3>`); continue; }
    if (line.startsWith('## ')) { closeUl(); result.push(`<h2>${line.slice(3)}</h2>`); continue; }
    if (line.startsWith('# ')) { closeUl(); result.push(`<h1>${line.slice(2)}</h1>`); continue; }

    // list
    if (line.startsWith('- ')) {
      if (!inUl) { result.push('<ul>'); inUl = true; }
      result.push(`<li>${inline(line.slice(2))}</li>`);
      continue;
    }

    // blank
    if (!line) { closeUl(); continue; }

    // paragraph
    closeUl();
    result.push(`<p>${inline(line)}</p>`);
  }

  if (inUl) result.push('</ul>');
  if (inPre) result.push('</code></pre>');
  return result.join('\n');
}

function inline(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

export default function MarkdownToHtmlTool() {
  const [input, setInput] = useState('');
  const [html, setHtml] = useState('');

  const handleConvert = () => setHtml(parseMarkdown(input));

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">Markdown 输入</label>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          placeholder="# 标题&#10;**粗体**&#10;- 列表项"
          className="w-full h-64 px-4 py-3 border border-zinc-300 rounded-xl font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none" />
        <button onClick={handleConvert}
          className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium text-sm">
          转换 →
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">HTML 输出</label>
        <textarea value={html} readOnly placeholder="HTML结果..."
          className="w-full h-64 px-4 py-3 border border-zinc-300 rounded-xl font-mono text-sm bg-zinc-50 resize-none" />
        <button onClick={() => navigator.clipboard.writeText(html)}
          className="mt-2 px-4 py-2 bg-zinc-100 text-zinc-700 rounded-xl hover:bg-zinc-200 transition text-sm">
          📋 复制HTML
        </button>
      </div>
    </div>
  );
}
