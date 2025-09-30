import Link from 'next/link';
import Image from 'next/image';
import type { App } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { findImage } from '@/lib/data';
import { IndianRupee } from 'lucide-react';

interface AppCardProps {
  app: App;
}

export function AppCard({ app }: AppCardProps) {
  const icon = app.iconUrl ? findImage(app.iconUrl) : null;

  return (
    <Link href={`/app/${app.slug}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="relative mb-4 h-24 w-24 rounded-2xl shadow-md bg-primary/10 flex items-center justify-center">
            <IndianRupee className="w-14 h-14 text-primary" />
          </div>
          <h3 className="font-headline font-semibold text-lg leading-tight truncate w-full">{app.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">v{app.version}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
