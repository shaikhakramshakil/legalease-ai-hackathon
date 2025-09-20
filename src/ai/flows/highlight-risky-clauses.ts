'use server';

/**
 * @fileOverview Highlights potentially risky or unusual clauses in a legal document based on Indian contract norms.
 *
 * - highlightRiskyClauses - A function that takes legal document text and returns the text with risky clauses highlighted.
 * - HighlightRiskyClausesInput - The input type for the highlightRiskyClauses function.
 * - HighlightRiskyClausesOutput - The return type for the highlightRiskyClauses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HighlightRiskyClausesInputSchema = z.object({
  documentText: z.string(),
});

export type HighlightRiskyClausesInput = z.infer<typeof HighlightRiskyClausesInputSchema>;

const HighlightRiskyClausesOutputSchema = z.object({
  highlightedText: z.string(),
});

export type HighlightRiskyClausesOutput = z.infer<typeof HighlightRiskyClausesOutputSchema>;

export async function highlightRiskyClauses(input: HighlightRiskyClausesInput): Promise<HighlightRiskyClausesOutput> {
  return highlightRiskyClausesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'highlightRiskyClausesPrompt',
  input: {schema: HighlightRiskyClausesInputSchema},
  output: {schema: HighlightRiskyClausesOutputSchema},
  prompt: ``,
});

const highlightRiskyClausesFlow = ai.defineFlow(
  {
    name: 'highlightRiskyClausesFlow',
    inputSchema: HighlightRiskyClausesInputSchema,
    outputSchema: HighlightRiskyClausesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
