'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { App, Category } from '@/lib/types';
import { AppCard } from './AppCard';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface AppShowcaseProps {
  apps: App[];
  categories: Category[];
}

export function AppShowcase({ apps, categories }: AppShowcaseProps) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  const filteredApps = apps.filter((app) => {
    const categoryMatch = !selectedCategory || app.categoryId === selectedCategory;
    const searchMatch =
      !searchQuery ||
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-center flex-wrap gap-2">
        <Button asChild variant={!selectedCategory ? 'default' : 'outline'} size="sm">
            <Link href="/">All</Link>
        </Button>
        {categories.map((category) => (
          <Button asChild key={category.id} variant={selectedCategory === category.id ? 'default' : 'outline'} size="sm">
            <Link href={`/?category=${category.id}`}>{category.name}</Link>
          </Button>
        ))}
      </div>

      {filteredApps.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {filteredApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <h2 className="text-2xl font-semibold">No apps found</h2>
            <p className="text-muted-foreground mt-2">
                Try adjusting your search or filters.
            </p>
            <Button asChild variant="link" className="mt-4">
                <Link href="/">Clear filters</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
