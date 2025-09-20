import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-legal-document.ts';
import '@/ai/flows/highlight-risky-clauses.ts';
import '@/ai/flows/translate-legal-summary.ts';