import { AppShowcase } from '@/components/AppShowcase';
import { getApps } from '@/lib/data';

export default function Home() {
  const apps = getApps();
  return (
    <div className="container mx-auto px-4 py-8">
      <AppShowcase apps={apps} />
    </div>
  );
}
