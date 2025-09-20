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
  documentText: z.string().describe('The text content of the legal document.'),
});

export type HighlightRiskyClausesInput = z.infer<typeof HighlightRiskyClausesInputSchema>;

const HighlightRiskyClausesOutputSchema = z.object({
  highlightedText: z.string().describe('The legal document text with risky clauses highlighted using color-coded tags.'),
});

export type HighlightRiskyClausesOutput = z.infer<typeof HighlightRiskyClausesOutputSchema>;

export async function highlightRiskyClauses(input: HighlightRiskyClausesInput): Promise<HighlightRiskyClausesOutput> {
  return highlightRiskyClausesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'highlightRiskyClausesPrompt',
  input: {schema: HighlightRiskyClausesInputSchema},
  output: {schema: HighlightRiskyClausesOutputSchema},
  prompt: `You are an expert in Indian contract law.

  You will receive the text of a legal document. Your task is to identify and highlight potentially risky or unusual clauses based on Indian contract norms.

  Highlight the risky clauses by wrapping them with HTML-like tags that specify a color. For example:

  <high>This is a risky clause</high>
  <medium>This clause requires further review</medium>
  <low>This is a low-risk clause</low>

  The colors should indicate the severity of the risk:
  - high: High risk - clauses that are likely to be unenforceable or very unfavorable to the user.
  - medium: Medium risk - clauses that require further review or clarification.
  - low: Low risk - clauses that are unusual but not necessarily unfavorable.

  Do not add any explanations or commentary. Only highlight the clauses. Return the entire document with the highlighted clauses.

  Document Text:
  {{{documentText}}}
  `,
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
