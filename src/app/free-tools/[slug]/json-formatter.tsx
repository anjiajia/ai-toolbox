'use client';
import { useState } from 'react';

export default function JsonFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'format' | 'compress' | 'validate'>('format');

  const handleProcess = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      if (mode === 'format') {
        setOutput(JSON.stringify(parsed, null, 2));
      } else if (mode === 'compress') {
        setOutput(JSON.stringify(parsed));
      } else {
        setOutput('✅ JSON格式正确！');
      }
    } catch (e) {
      setError(`❌ JSON错误: ${(e as Error).message}`);
      setOutput('');
    }
  };

  const handleCopy = () => navigator.clipboard.writeText(output || input);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-2">
        {(['format', 'compress', 'validate'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${mode === m ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}>
            {m === 'format' ? '🔧 格式化' : m === 'compress' ? '🗜️ 压缩' : '✅ 校验'}
          </button>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">输入JSON</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='{"name":"test","value":123}'
          className="w-full h-40 px-4 py-3 border border-zinc-300 rounded-xl font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none" />
      </div>
      <button onClick={handleProcess} className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium">
        处理
      </button>
      {error && <div className="text-red-600 text-sm bg-red-50 rounded-lg p-3">{error}</div>}
      {output && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-zinc-700">输出结果</label>
            <button onClick={handleCopy} className="text-sm text-blue-600 hover:text-blue-700">📋 复制</button>
          </div>
          <textarea value={output} readOnly className="w-full h-40 px-4 py-3 border border-zinc-300 rounded-xl font-mono text-sm bg-zinc-50 resize-none" />
        </div>
      )}
    </div>
  );
}
