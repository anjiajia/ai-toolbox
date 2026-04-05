import Container from '@/components/layout/container';
import SearchBar from '@/components/common/search-bar';
import SearchResults from './search-results';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '搜索工具',
};

export default function SearchPage() {
  return (
    <Container>
      <div className="py-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-6">搜索AI工具</h1>
        <div className="max-w-xl mb-8">
          <SearchBar />
        </div>
        <SearchResults />
      </div>
    </Container>
  );
}
