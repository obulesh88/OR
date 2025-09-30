import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Download, IndianRupee } from 'lucide-react';
import { getAppBySlug, findImage } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function generateStaticParams() {
  const { getApps } = require('@/lib/data');
  const apps = getApps();
  return apps.map((app: any) => ({
    slug: app.slug,
  }));
}

export default function AppDetailPage({ params }: { params: { slug: string } }) {
  const app = getAppBySlug(params.slug);

  if (!app) {
    notFound();
  }

  const icon = app.iconUrl ? findImage(app.iconUrl) : null;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Card>
        <CardContent className="p-6 md:p-8">
          <header className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 mx-auto sm:mx-0 rounded-3xl shadow-lg bg-primary/10 flex items-center justify-center">
                 <IndianRupee className="w-20 h-20 text-primary" />
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
              <h1 className="text-4xl font-headline font-bold">{app.title}</h1>
              <p className="text-lg text-muted-foreground mt-1">Version {app.version}</p>
              <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  <span>{app.downloadCount.toLocaleString()} downloads</span>
                </div>
              </div>
              <a href="https://drive.google.com/uc?export=download&id=17mFofQmYmqTEeVBSW5efMtnHEPj2pcJP" download>
                <Button size="lg" className="mt-6 w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 self-center sm:self-start">
                  <Download className="mr-2 h-5 w-5" />
                  Download APK
                </Button>
              </a>
            </div>
          </header>
        </CardContent>
      </Card>
    </div>
  );
}
