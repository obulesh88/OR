'use client';

import Link from 'next/link';
import { Search, Store, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
          <Store className="h-6 w-6" />
          APKeasy
        </Link>
        <div className="flex-1 px-8 max-w-md">
            <SearchInput />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/login">
              <User className="h-5 w-5" />
              <span className="sr-only">Sign In</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function SearchInput() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }
        
        // If we are not on the homepage, navigate to it for search
        if (pathname !== '/') {
            replace(`/?${params.toString()}`);
        } else {
            replace(`${pathname}?${params.toString()}`);
        }
    }, 300);

    // Only show search bar on the homepage for now
    if (pathname !== '/') {
        return null;
    }

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search for apps..."
                className="pl-10 w-full"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('search')?.toString()}
            />
        </div>
    );
}
