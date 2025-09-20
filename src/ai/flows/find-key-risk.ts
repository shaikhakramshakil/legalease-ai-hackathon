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
  documentText: z.string(),
});
export type FindKeyRiskInput = z.infer<typeof FindKeyRiskInputSchema>;

const FindKeyRiskOutputSchema = z.object({
  hasRisk: z.boolean(),
  riskLevel: z.enum(['high', 'medium', 'low', 'none']),
  riskTitle: z.string().optional(),
  riskExplanation: z.string().optional(),
});
export type FindKeyRiskOutput = z.infer<typeof FindKeyRiskOutputSchema>;

export async function findKeyRisk(input: FindKeyRiskInput): Promise<FindKeyRiskOutput> {
  return findKeyRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findKeyRiskPrompt',
  input: {schema: FindKeyRiskInputSchema},
  output: {schema: FindKeyRiskOutputSchema},
  prompt: ``,
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
