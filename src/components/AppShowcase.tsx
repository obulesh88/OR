'use client';

import { App } from '@/lib/types';
import { AppCard } from './AppCard';

interface AppShowcaseProps {
  apps: App[];
}

export function AppShowcase({ apps }: AppShowcaseProps) {

  return (
    <div>
      {apps.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <h2 className="text-2xl font-semibold">No apps found</h2>
        </div>
      )}
    </div>
  );
}
