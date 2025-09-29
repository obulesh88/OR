'use client';

import { useActionState, useFormStatus } from 'react';
import { uploadAppAction, type State } from '@/app/upload/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UploadCloud, Loader2 } from "lucide-react";
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

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

    useEffect(() => {
        if (state?.message && state.errors?._form) {
            toast({
                variant: "destructive",
                title: "Submission Failed",
                description: state.message,
            });
        }
    }, [state, toast]);


  return (
    <Card>
      <form ref={formRef} action={dispatch}>
        <CardHeader>
          <CardTitle>App Details</CardTitle>
          <CardDescription>Fill out the form below to submit your application.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">App Title</Label>
              <Input id="title" name="title" placeholder="e.g. My Awesome App" required />
              {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="version">Version</Label>
              <Input id="version" name="version" placeholder="e.g. 1.0.0" required />
              {state.errors?.version && <p className="text-sm text-destructive">{state.errors.version[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="A brief and engaging description of your app." rows={5} required />
              {state.errors?.description && <p className="text-sm text-destructive">{state.errors.description[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="apk">APK File</Label>
              <Input id="apk" name="apk" type="file" accept=".apk" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">App Icon</Label>
              <Input id="icon" name="icon" type="file" accept="image/*" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="screenshots">Screenshots</Label>
              <Input id="screenshots" name="screenshots" type="file" accept="image/*" multiple />
            </div>
            <div className="flex justify-end">
              <SubmitButton />
            </div>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
