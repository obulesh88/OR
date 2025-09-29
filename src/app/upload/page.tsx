import { Upload } from 'lucide-react';

export default function UploadPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="text-center mb-8">
        <Upload className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold">Upload Your App</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Submit your application to the store.
        </p>
      </div>
      {/* TODO: Add upload form */}
      <div className="text-center text-muted-foreground">
        <p>Upload form will be here.</p>
      </div>
    </div>
  );
}
