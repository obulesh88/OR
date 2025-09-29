import { GenerateDescriptionForm } from "@/components/GenerateDescriptionForm";
import { Sparkles } from "lucide-react";

export default function GenerateDescriptionPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="text-center mb-8">
        <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold">AI App Description Generator</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Let AI help you craft the perfect description for your app.
        </p>
      </div>
      <GenerateDescriptionForm />
    </div>
  );
}
