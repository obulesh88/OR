'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateDescriptionAction, type State } from '@/app/generate-description/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Description
        </>
      )}
    </Button>
  );
}

export function GenerateDescriptionForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(generateDescriptionAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message && !state.description) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: state.message,
      });
    }
    if (state.description) {
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <Card className="w-full">
      <form ref={formRef} action={dispatch}>
        <CardHeader>
          <CardTitle>Provide App Details</CardTitle>
          <CardDescription>
            Enter your app's metadata or website content. The more detail you provide, the better the result.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metadata">APK Metadata</Label>
            <Textarea
              id="metadata"
              name="metadata"
              placeholder="Paste your APK's manifest or other metadata here..."
              rows={8}
            />
            {state?.errors?.metadata && <p className="text-sm text-destructive">{state.errors.metadata[0]}</p>}
          </div>
          <div className="relative flex items-center">
            <div className="flex-grow border-t"></div>
            <span className="flex-shrink mx-4 text-muted-foreground text-sm">OR</span>
            <div className="flex-grow border-t"></div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="websiteContent">Website Content</Label>
            <Textarea
              id="websiteContent"
              name="websiteContent"
              placeholder="Paste content from your app's website or landing page..."
              rows={8}
            />
            {state?.errors?.websiteContent && <p className="text-sm text-destructive">{state.errors.websiteContent[0]}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <SubmitButton />
        </CardFooter>
      </form>
       {state?.description && (
        <div className="p-6 pt-0">
            <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary"><Sparkles className="h-5 w-5"/> Generated Description</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="whitespace-pre-wrap">{state.description}</p>
                </CardContent>
            </Card>
        </div>
      )}
    </Card>
  );
}
