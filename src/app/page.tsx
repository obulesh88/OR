import { AppShowcase } from "@/components/AppShowcase";
import { getApps, getCategories } from "@/lib/data";

export default function Home() {
  const apps = getApps();
  const categories = getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <AppShowcase apps={apps} categories={categories} />
    </div>
  );
}
