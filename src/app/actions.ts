'use server';

import { summarizeLegalDocument } from '@/ai/flows/summarize-legal-document';
import { highlightRiskyClauses } from '@/ai/flows/highlight-risky-clauses';
import { translateLegalSummary } from '@/ai/flows/translate-legal-summary';
import { z } from 'zod';

const AnalyzeDocumentResponseSchema = z.object({
  summary: z.string(),
  highlightedText: z.string(),
});

export async function analyzeDocumentAction(documentText: string) {
  if (!documentText) {
    throw new Error('Document text cannot be empty.');
  }

  try {
    const [summaryResult, riskResult] = await Promise.all([
        summarizeLegalDocument({ documentText }),
        highlightRiskyClauses({ documentText }),
    ]);

    const validatedResult = AnalyzeDocumentResponseSchema.safeParse({
      summary: summaryResult.summary,
      highlightedText: riskResult.highlightedText,
    });

    if (!validatedResult.success) {
      console.error("AI response validation failed:", validatedResult.error);
      throw new Error('Received invalid data from AI service.');
    }
    
    return validatedResult.data;
  } catch(error) {
    console.error("Error in analyzeDocumentAction:", error);
    throw new Error("Failed to analyze document due to a server error.");
  }
}


export async function translateSummaryAction(englishSummary: string) {
    if (!englishSummary) {
        throw new Error('English summary cannot be empty.');
    }

    try {
        const translationResult = await translateLegalSummary({ englishSummary });
        return translationResult.hindiSummary;
    } catch(error) {
        console.error("Error in translateSummaryAction:", error);
        throw new Error("Failed to translate summary due to a server error.");
    }
}
