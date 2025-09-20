'use server';

/**
 * @fileOverview This flow finds the single most critical risk in a legal document.
 *
 * - findKeyRisk - A function that takes document text and returns the key risk.
 * - FindKeyRiskInput - The input type for the findKeyRisk function.
 * - FindKeyRiskOutput - The return type for the findKeyRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindKeyRiskInputSchema = z.object({
  documentText: z.string().describe('The text content of the legal document.'),
});
export type FindKeyRiskInput = z.infer<typeof FindKeyRiskInputSchema>;

const FindKeyRiskOutputSchema = z.object({
  hasRisk: z.boolean().describe('Whether any risk was identified.'),
  riskLevel: z.enum(['high', 'medium', 'low', 'none']).describe('The level of the most critical risk found.'),
  riskTitle: z.string().optional().describe('A short title for the key risk (e.g., "Termination Clause").'),
  riskExplanation: z.string().optional().describe('A simple, one-sentence explanation of the key risk.'),
});
export type FindKeyRiskOutput = z.infer<typeof FindKeyRiskOutputSchema>;

export async function findKeyRisk(input: FindKeyRiskInput): Promise<FindKeyRiskOutput> {
  return findKeyRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findKeyRiskPrompt',
  input: {schema: FindKeyRiskInputSchema},
  output: {schema: FindKeyRiskOutputSchema},
  prompt: `You are an expert in Indian contract law.

  Review the following legal document and identify the single most critical or unfavorable clause for a user.
  Determine if the document contains any risk.
  If a risk is found, classify its severity as 'high', 'medium', or 'low'.
  Provide a short title for the risk (e.g., "Termination Clause", "Liability Cap").
  Provide a concise, one-sentence explanation of why it is a risk.
  If no significant risks are found, set hasRisk to false and riskLevel to 'none'.

  Document Text:
  {{{documentText}}}
  `,
});

const findKeyRiskFlow = ai.defineFlow(
  {
    name: 'findKeyRiskFlow',
    inputSchema: FindKeyRiskInputSchema,
    outputSchema: FindKeyRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
