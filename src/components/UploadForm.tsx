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
      setUploadProgress(0); // Reset progress on new submission
      interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95; // Stop at 95% to wait for server response
          }
          return prev + 5; // Slower increment for better visual effect
        });
      }, 100); // Slower interval
    } else {
      setUploadProgress(0);
    }
    return () => clearInterval(interval);
  }, [pending]);

  return (
    <Card>
      <form ref={formRef} action={dispatch}>
        <CardHeader>
          <CardTitle>Upload APK</CardTitle>
          <CardDescription>
            Select your application's APK file to submit it to the store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="apk">APK File</Label>
              <Input id="apk" name="apk" type="file" accept=".apk" disabled={pending} />
            </div>

            {pending && (
              <div className="space-y-2 pt-2">
                <Label>Uploading...</Label>
                <div className="flex items-center gap-4">
                    <Progress value={uploadProgress} className="w-full" />
                    <p className="text-sm text-muted-foreground font-medium w-12 text-right">{uploadProgress}%</p>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-4">
              <SubmitButton />
            </div>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
