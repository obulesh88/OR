import Link from 'next/link';
import Image from 'next/image';
import type { App } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { findImage, getCategoryById } from '@/lib/data';
import { Badge } from './ui/badge';

interface AppCardProps {
  app: App;
}

export function AppCard({ app }: AppCardProps) {
  const icon = findImage(app.iconUrl);
  const category = getCategoryById(app.categoryId);

  return (
    <Link href={`/app/${app.slug}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-4 flex flex-col items-center text-center">
          {icon && (
            <div className="relative mb-4 h-24 w-24">
              <Image
                src={icon.imageUrl}
                alt={`${app.title} icon`}
                width={96}
                height={96}
                data-ai-hint={icon.imageHint}
                className="rounded-2xl object-cover shadow-md"
              />
            </div>
          )}
          <h3 className="font-headline font-semibold text-lg leading-tight truncate w-full">{app.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">v{app.version}</p>
          {category && <Badge variant="secondary" className="mt-2">{category.name}</Badge>}
        </CardContent>
      </Card>
    </Link>
  );
}
