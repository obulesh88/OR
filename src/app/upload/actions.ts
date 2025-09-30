'use server';

import { z } from 'zod';
import { addApp } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  apk: z
    .any()
    .refine((file) => file?.size > 0, 'Please select a file.')
});

export type State = {
  errors?: {
    apk?: string[];
    _form?: string[];
  };
  message?: string | null;
};

// Helper function to simulate a delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function uploadAppAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    apk: formData.get('apk'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input. Please select a file.',
    };
  }

  try {
    // In a real app, you would parse the APK here to get app details.
    // For now, we'll use some placeholder data.
    const newApp = addApp({
        title: `New Transaction ${Date.now()}`,
        version: '1.0.0',
        description: 'This is a newly uploaded transaction.',
    });
    
    // Simulate processing time so the progress bar is visible
    await sleep(2000);

  } catch (e: any) {
    return {
      message: `An error occurred: ${e.message}`,
      errors: { _form: [`An error occurred: ${e.message}`] },
    };
  }

  revalidatePath('/');
  redirect(`/`);
}
