'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { App } from '@/lib/types';
import { AppCard } from './AppCard';
import { Button } from './ui/button';

interface AppShowcaseProps {
  apps: App[];
}

export function AppShowcase({ apps }: AppShowcaseProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');

  const filteredApps = apps.filter((app) => {
    const searchMatch =
      !searchQuery ||
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    return searchMatch;
  });

  return (
    <div>
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
                Try adjusting your search.
            </p>
            <Button asChild variant="link" className="mt-4">
                <Link href="/">Clear search</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
