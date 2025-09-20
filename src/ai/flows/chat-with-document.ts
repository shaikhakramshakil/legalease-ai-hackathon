'use server';

/**
 * @fileOverview A flow for chatting with an AI about a legal document.
 *
 * - chatWithDocument - A function that takes a document and a query and returns an answer.
 * - ChatWithDocumentInput - The input type for the chatWithDocument function.
 * - ChatWithDocumentOutput - The return type for the chatWithDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithDocumentInputSchema = z.object({
  documentText: z.string().describe('The text content of the legal document.'),
  query: z.string().describe('The user\'s question about the document.'),
});

export type ChatWithDocumentInput = z.infer<typeof ChatWithDocumentInputSchema>;

const ChatWithDocumentOutputSchema = z.object({
  answer: z.string().describe('The AI\'s answer to the user\'s question.'),
});

export type ChatWithDocumentOutput = z.infer<typeof ChatWithDocumentOutputSchema>;

export async function chatWithDocument(input: ChatWithDocumentInput): Promise<ChatWithDocumentOutput> {
  return chatWithDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatWithDocumentPrompt',
  input: {schema: ChatWithDocumentInputSchema},
  output: {schema: ChatWithDocumentOutputSchema},
  prompt: `You are an AI legal assistant. You are an expert in Indian law.

  A user has provided a legal document and is asking a question about it.
  
  Your task is to answer the user's question based on the content of the document.
  Provide clear, concise, and easy-to-understand explanations.
  Do not provide legal advice. You should frame your answers as informational and for educational purposes only.

  Document Text:
  {{{documentText}}}

  User's Question:
  {{{query}}}
  `,
});

const chatWithDocumentFlow = ai.defineFlow(
  {
    name: 'chatWithDocumentFlow',
    inputSchema: ChatWithDocumentInputSchema,
    outputSchema: ChatWithDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
