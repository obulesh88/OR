"use client";

import { useSearchParams } from "next/navigation";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Frown } from 'lucide-react'

export default function NotFound() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <Frown className="w-24 h-24 text-muted-foreground/50 mb-4" />
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Page Not Found</h1>
      <p className="mt-4 text-lg text-muted-foreground">Sorry, we couldn’t find the page you’re looking for.</p>
      {query && <p className="mt-4 text-lg text-muted-foreground">You searched for: {query}</p>}
      <Button asChild className="mt-6">
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}
