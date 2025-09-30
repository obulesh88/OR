'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { uploadAppAction, type State } from '@/app/upload/actions';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UploadCloud, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        <>
          <UploadCloud className="mr-2 h-4 w-4" />
          Submit App
        </>
      )}
    </Button>
  );
}

export function UploadForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useActionState(uploadAppAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const { pending } = useFormStatus();
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (state?.message && state.errors?._form) {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: state.message,
      });
    }
  }, [state, toast]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (pending) {
      interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + 10;
        });
      }, 50);
    } else {
      setUploadProgress(0);
    }
    return () => clearInterval(interval);
  }, [pending]);

  return (
    <Card>
      <form ref={formRef} action={dispatch}>
        <CardHeader>
          <CardTitle>App Details</CardTitle>
          <CardDescription>
            Fill out the form below to submit your application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">App Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. My Awesome App"
                required
                disabled={pending}
              />
              {state.errors?.title && (
                <p className="text-sm text-destructive">
                  {state.errors.title[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                name="version"
                placeholder="e.g. 1.0.0"
                required
                disabled={pending}
              />
              {state.errors?.version && (
                <p className="text-sm text-destructive">
                  {state.errors.version[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="A brief and engaging description of your app."
                rows={5}
                required
                disabled={pending}
              />
              {state.errors?.description && (
                <p className="text-sm text-destructive">
                  {state.errors.description[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="apk">APK File</Label>
              <Input id="apk" name="apk" type="file" accept=".apk" disabled={pending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">App Icon</Label>
              <Input id="icon" name="icon" type="file" accept="image/*" disabled={pending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="screenshots">Screenshots</Label>
              <Input
                id="screenshots"
                name="screenshots"
                type="file"
                accept="image/*"
                multiple
                disabled={pending}
              />
            </div>

            {pending && (
              <div className="space-y-2">
                <Label>Uploading...</Label>
                <Progress value={uploadProgress} />
                <p className="text-sm text-muted-foreground text-center">{uploadProgress}%</p>
              </div>
            )}

            <div className="flex justify-end">
              <SubmitButton />
            </div>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
