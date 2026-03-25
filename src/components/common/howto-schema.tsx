import { JsonLd } from './json-ld';
import type { Tool } from '@/types/tool';

interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

interface HowToJsonLdProps {
  name: string;
  description: string;
  steps: HowToStep[];
  baseUrl?: string;
}

/**
 * HowTo schema for Generative Engine Optimization.
 * Used on tool detail pages to help LLMs understand how to use tools.
 */
export function HowToJsonLd({ name, description, steps, baseUrl }: HowToJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}/og-image.png`,
    },
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image ? { image: { '@type': 'ImageObject', url: step.image } } : {}),
    })),
    totalTime: `PT${steps.length * 2}M`,
  };

  return <JsonLd data={jsonLd} />;
}

/**
 * Generate HowTo steps from a tool's features and useCases.
 * Returns structured steps for HowTo schema.
 */
export function generateHowToSteps(tool: Tool): HowToStep[] {
  const steps: HowToStep[] = [
    {
      name: '访问官网',
      text: `前往 ${tool.name} 官网 ${tool.website}，点击注册或登录按钮。`,
    },
    {
      name: '创建账号',
      text: `使用邮箱、Google账号或其他方式完成账号注册。${tool.pricing === 'free' ? '该工具提供免费版本，可以直接使用。' : tool.pricing === 'freemium' ? '该工具提供免费版本，建议先体验免费功能。' : '该工具为付费工具，建议先查看免费试用选项。'}`,
    },
    {
      name: '开始使用核心功能',
      text: tool.features.length > 0
        ? `了解主要功能：${tool.features.slice(0, 3).join('、')}。建议从 ${tool.features[0]} 开始体验。`
        : '登录后即可开始使用该工具的各项功能。',
    },
    {
      name: '探索高级功能',
      text: tool.features.length > 3
        ? `进阶使用：${tool.features.slice(3).join('、')}。这些功能可以帮助你更高效地完成任务。`
        : '探索工具的其他功能，找到最适合你使用场景的功能组合。',
    },
    {
      name: '查看替代工具（如需）',
      text: tool.alternatives && tool.alternatives.length > 0
        ? `如果 ${tool.name} 不符合你的需求，可以考虑：${tool.alternatives.slice(0, 3).join('、')}。`
        : '如果需要其他选择，可以浏览同类型工具进行比较。',
    },
  ];

  return steps;
}
