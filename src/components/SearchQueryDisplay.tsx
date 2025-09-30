"use client";

import { useSearchParams } from "next/navigation";

export function SearchQueryDisplay() {
  const searchParams = useSearchParams();
  const query = searchParams.get("search");

  if (!query) {
    return null;
  }

  return (
    <p className="mt-4 text-lg text-muted-foreground">You searched for: {query}</p>
  );
}
