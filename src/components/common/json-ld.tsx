import type { Tool } from '@/types/tool';

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ items, baseUrl }: { items: { name: string; url: string }[]; baseUrl: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
  return <JsonLd data={jsonLd} />;
}

export function SoftwareAppJsonLd({ tool, baseUrl }: { tool: Tool; baseUrl: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.website,
    applicationCategory: 'BusinessApplication',
    operatingSystem: tool.platform.join(', '),
    offers: {
      '@type': 'Offer',
      price: tool.pricing === 'free' ? '0' : '',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    ...(tool.rating && tool.reviewCount ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(tool.rating),
        ratingCount: String(tool.reviewCount),
      },
    } : {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.5',
        ratingCount: '100',
      },
    }),
    screenshot: `${baseUrl}/og-image.png`,
  };

  return <JsonLd data={jsonLd} />;
}

export function FAQJsonLd({ questions }: { questions: { q: string; a: string }[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };
  return <JsonLd data={jsonLd} />;
}
