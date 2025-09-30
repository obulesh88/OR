'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { uploadAppAction, type State } from '@/app/upload/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UploadCloud, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
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

  useEffect(() => {
    if (state?.message && (state.errors?._form || state.errors?.apk)) {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: state.message,
      });
    }
  }, [state, toast]);

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
          <div className="space-y-2">
            <Label htmlFor="apk">APK File</Label>
            <Input id="apk" name="apk" type="file" accept=".apk" />
            {state?.errors?.apk && (
              <p className="text-sm text-destructive">{state.errors.apk[0]}</p>
            )}
          </div>
          <div className="flex justify-end pt-4">
            <SubmitButton />
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
