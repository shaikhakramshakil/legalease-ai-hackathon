'use server';

import { summarizeLegalDocument } from '@/ai/flows/summarize-legal-document';
import { highlightRiskyClauses } from '@/ai/flows/highlight-risky-clauses';
import { translateLegalSummary } from '@/ai/flows/translate-legal-summary';
import { chatWithDocument } from '@/ai/flows/chat-with-document';
import { findKeyRisk } from '@/ai/flows/find-key-risk';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { z } from 'zod';

const AnalyzeDocumentResponseSchema = z.object({
  summary: z.string(),
  highlightedText: z.string(),
  keyRisk: z.object({
    hasRisk: z.boolean(),
    riskLevel: z.enum(['high', 'medium', 'low', 'none']),
    riskTitle: z.string().optional(),
    riskExplanation: z.string().optional(),
  }),
});

export async function analyzeDocumentAction(documentText: string) {
  if (!documentText) {
    throw new Error('Document text cannot be empty.');
  }

  try {
    const [summaryResult, riskResult, keyRiskResult] = await Promise.all([
        summarizeLegalDocument({ documentText }),
        highlightRiskyClauses({ documentText }),
        findKeyRisk({ documentText }),
    ]);

    const validatedResult = AnalyzeDocumentResponseSchema.safeParse({
      summary: summaryResult.summary,
      highlightedText: riskResult.highlightedText,
      keyRisk: keyRiskResult,
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

export async function chatAction(documentText: string, query: string) {
  if (!documentText) {
    throw new Error("Document text cannot be empty.");
  }
  if (!query) {
    throw new Error("Query cannot be empty.");
  }

  try {
    const result = await chatWithDocument({ documentText, query });
    return result.answer;
  } catch (error) {
    console.error("Error in chatAction:", error);
    throw new Error("Failed to get chat response due to a server error.");
  }
}

export async function textToSpeechAction(text: string, language: 'en-US' | 'hi-IN') {
    if (!text) {
        throw new Error('Text for speech cannot be empty.');
    }

    try {
        const result = await textToSpeech({ text, language });
        return result.audioDataUri;
    } catch(error) {
        console.error("Error in textToSpeechAction:", error);
        throw new Error("Failed to generate audio due to a server error.");
    }
}
