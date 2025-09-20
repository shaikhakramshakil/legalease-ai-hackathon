'use server';

/**
 * @fileOverview This flow translates a legal summary from English to Hindi.
 *
 * - translateLegalSummary - A function that translates the legal summary.
 * - TranslateLegalSummaryInput - The input type for the translateLegalSummary function.
 * - TranslateLegalSummaryOutput - The return type for the translateLegalSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateLegalSummaryInputSchema = z.object({
  englishSummary: z.string().describe('The legal summary in English.'),
});
export type TranslateLegalSummaryInput = z.infer<
  typeof TranslateLegalSummaryInputSchema
>;

const TranslateLegalSummaryOutputSchema = z.object({
  hindiSummary: z.string().describe('The legal summary in Hindi.'),
});
export type TranslateLegalSummaryOutput = z.infer<
  typeof TranslateLegalSummaryOutputSchema
>;

export async function translateLegalSummary(
  input: TranslateLegalSummaryInput
): Promise<TranslateLegalSummaryOutput> {
  return translateLegalSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateLegalSummaryPrompt',
  input: {schema: TranslateLegalSummaryInputSchema},
  output: {schema: TranslateLegalSummaryOutputSchema},
  prompt: ``,
});

const translateLegalSummaryFlow = ai.defineFlow(
  {
    name: 'translateLegalSummaryFlow',
    inputSchema: TranslateLegalSummaryInputSchema,
    outputSchema: TranslateLegalSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
