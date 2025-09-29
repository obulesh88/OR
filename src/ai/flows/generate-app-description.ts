'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating app descriptions using AI.
 *
 * The flow takes either APK metadata or app website content as input and generates a description.
 * @fileOverview
 * - `generateAppDescription`: Asynchronously generates an app description based on provided input.
 * - `GenerateAppDescriptionInput`: Interface for the input schema, including metadata and website content.
 * - `GenerateAppDescriptionOutput`: Interface for the output schema, which contains the generated app description.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAppDescriptionInputSchema = z.object({
  metadata: z.string().optional().describe('APK metadata.'),
  websiteContent: z.string().optional().describe('App website content.'),
});
export type GenerateAppDescriptionInput = z.infer<typeof GenerateAppDescriptionInputSchema>;

const GenerateAppDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated app description.'),
});
export type GenerateAppDescriptionOutput = z.infer<typeof GenerateAppDescriptionOutputSchema>;

export async function generateAppDescription(input: GenerateAppDescriptionInput): Promise<GenerateAppDescriptionOutput> {
  return generateAppDescriptionFlow(input);
}

const generateAppDescriptionPrompt = ai.definePrompt({
  name: 'generateAppDescriptionPrompt',
  input: {schema: GenerateAppDescriptionInputSchema},
  output: {schema: GenerateAppDescriptionOutputSchema},
  prompt: `You are an expert app description writer.

  Generate an engaging and informative app description based on the following information:

  {{#if metadata}}
  APK Metadata:
  {{metadata}}
  {{/if}}

  {{#if websiteContent}}
  Website Content:
  {{websiteContent}}
  {{/if}}

  The description should be concise and highlight the key features and benefits of the app.`,
});

const generateAppDescriptionFlow = ai.defineFlow(
  {
    name: 'generateAppDescriptionFlow',
    inputSchema: GenerateAppDescriptionInputSchema,
    outputSchema: GenerateAppDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateAppDescriptionPrompt(input);
    return output!;
  }
);
