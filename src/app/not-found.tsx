
"use client";

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Frown } from 'lucide-react'
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SearchQueryDisplay() {
  const searchParams = useSearchParams();
  const query = searchParams.get("search");

  if (!query) {
    return null;
  }

  return (
    <p className="mt-4 text-lg text-muted-foreground">You searched for: {query}</p>
  );
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <Frown className="w-24 h-24 text-muted-foreground/50 mb-4" />
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Page Not Found</h1>
      <p className="mt-4 text-lg text-muted-foreground">Sorry, we couldn’t find the page you’re looking for.</p>
      <Suspense fallback={null}>
        <SearchQueryDisplay />
      </Suspense>
      <Button asChild className="mt-6">
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}
