'use server';

import { generateAppDescription } from '@/ai/flows/generate-app-description';
import { z } from 'zod';

const FormSchema = z.object({
  metadata: z.string().optional(),
  websiteContent: z.string().optional(),
}).refine(data => data.metadata || data.websiteContent, {
    message: "Please provide either APK metadata or website content.",
    path: ["metadata"], // you can pick one field to show the error on
});

export type State = {
    errors?: {
        metadata?: string[];
        websiteContent?: string[];
        _form?: string[];
    };
    message?: string | null;
    description?: string | null;
};

export async function generateDescriptionAction(prevState: State, formData: FormData): Promise<State> {
    const validatedFields = FormSchema.safeParse({
        metadata: formData.get('metadata'),
        websiteContent: formData.get('websiteContent'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid input. Please check the fields.',
        };
    }
    
    try {
        const result = await generateAppDescription(validatedFields.data);
        if (result.description) {
            return {
                description: result.description,
            };
        } else {
             return {
                message: "Failed to generate description. The AI model didn't return a result.",
                errors: { _form: ["Failed to generate description."] }
            };
        }
    } catch (e: any) {
        return {
            message: `An error occurred: ${e.message}`,
            errors: { _form: [`An error occurred: ${e.message}`] }
        };
    }
}
