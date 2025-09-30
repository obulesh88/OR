import { AppShowcase } from "@/components/AppShowcase";
import { getApps } from "@/lib/data";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) {
  const apps = getApps();
  const searchQuery = searchParams?.search || '';

  return (
    <div className="container mx-auto px-4 py-8">
      <AppShowcase apps={apps} searchQuery={searchQuery} />
    </div>
  );
}
