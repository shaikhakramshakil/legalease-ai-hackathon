
'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-legal-document.ts';
import '@/ai/flows/highlight-risky-clauses.ts';
import '@/ai/flows/chat-with-document.ts';
import '@/ai/flows/find-key-risk.ts';
import '@/ai/flows/text-to-speech.ts';
