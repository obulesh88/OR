import { Upload } from 'lucide-react';
import { UploadForm } from '@/components/UploadForm';
import { Suspense } from 'react';

export default function UploadPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="text-center mb-8">
        <Upload className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold">Add Transaction</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Upload a receipt for your transaction.
        </p>
      </div>
      <Suspense>
        <UploadForm />
      </Suspense>
    </div>
  );
}
