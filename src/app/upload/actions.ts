'use server';

import { z } from 'zod';
import { addApp } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  version: z.string().min(1, 'Version is required.'),
  description: z.string().min(1, 'Description is required.'),
});

export type State = {
  errors?: {
    title?: string[];
    version?: string[];
    description?: string[];
    _form?: string[];
  };
  message?: string | null;
};

export async function uploadAppAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    title: formData.get('title'),
    version: formData.get('version'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input. Please check the fields.',
    };
  }

  try {
    const newApp = addApp(validatedFields.data);
    
    // In a real app, you would handle file uploads here (APK, icon, screenshots)
    // and save them to a file storage, then save the URLs to the database.

  } catch (e: any) {
    return {
      message: `An error occurred: ${e.message}`,
      errors: { _form: [`An error occurred: ${e.message}`] },
    };
  }

  // Revalidate the home page to show the new app
  revalidatePath('/');
  // Redirect to the new app's page
  redirect(`/`);
}
