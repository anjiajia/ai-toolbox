import type { Tool } from '@/types/tool';

import writingData from '@/data/tools/writing.json';
import imageData from '@/data/tools/image.json';
import videoData from '@/data/tools/video.json';
import audioData from '@/data/tools/audio.json';
import codingData from '@/data/tools/coding.json';
import productivityData from '@/data/tools/productivity.json';
import designData from '@/data/tools/design.json';
import marketingData from '@/data/tools/marketing.json';

const toolsMap: Record<string, Tool[]> = {
  writing: writingData as Tool[],
  image: imageData as Tool[],
  video: videoData as Tool[],
  audio: audioData as Tool[],
  coding: codingData as Tool[],
  productivity: productivityData as Tool[],
  design: designData as Tool[],
  marketing: marketingData as Tool[],
};

export function getAllTools(): Tool[] {
  return Object.values(toolsMap).flat();
}

export function getToolsByCategory(category: string): Tool[] {
  return toolsMap[category] || [];
}

export function getToolBySlug(category: string, slug: string): Tool | undefined {
  const tools = toolsMap[category] || [];
  return tools.find((t) => t.slug === slug);
}

export function getFeaturedTools(): Tool[] {
  return getAllTools().filter((t) => t.featured);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return getAllTools().filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.tagline.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}

export function getRelatedTools(tool: Tool, limit = 4): Tool[] {
  return getAllTools()
    .filter((t) => t.id !== tool.id && t.category === tool.category)
    .slice(0, limit);
}
