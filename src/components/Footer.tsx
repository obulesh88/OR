import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} APKeasy. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
            <Link href="/generate-description" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                AI Description Generator
            </Link>
        </div>
      </div>
    </footer>
  );
}
