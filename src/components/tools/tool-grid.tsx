import type { Tool } from '@/types/tool';
import ToolCard from './tool-card';

interface ToolGridProps {
  tools: Tool[];
  emptyMessage?: string;
}

export default function ToolGrid({ tools, emptyMessage = '暂无工具' }: ToolGridProps) {
  if (tools.length === 0) {
    return <p className="text-center text-zinc-500 py-12">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
