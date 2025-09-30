
"use client";

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Frown } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Suspense } from 'react';

const SearchQueryDisplay = dynamic(
  () => import('@/components/SearchQueryDisplay'),
  { ssr: false }
)

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
