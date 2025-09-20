'use server';

/**
 * @fileOverview Converts text to speech using the Google Cloud Text-to-Speech API.
 *
 * - googleCloudTextToSpeech - A function that takes text and returns audio data.
 * - GoogleCloudTextToSpeechInput - The input type.
 * - GoogleCloudTextToSpeechOutput - The return type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {TextToSpeechClient} from '@google-cloud/text-to-speech';

const GoogleCloudTextToSpeechInputSchema = z.object({
  text: z.string().describe('The text to be converted to speech.'),
  languageCode: z.enum(['en-US', 'hi-IN']).default('en-US').describe('The language of the text.'),
});
export type GoogleCloudTextToSpeechInput = z.infer<
  typeof GoogleCloudTextToSpeechInputSchema
>;

const GoogleCloudTextToSpeechOutputSchema = z.object({
  audioDataUri: z
    .string()
    .describe('The synthesized audio as a base64 data URI.'),
});
export type GoogleCloudTextToSpeechOutput = z.infer<
  typeof GoogleCloudTextToSpeechOutputSchema
>;

export async function googleCloudTextToSpeech(
  input: GoogleCloudTextToSpeechInput
): Promise<GoogleCloudTextToSpeechOutput> {
  return googleCloudTtsFlow(input);
}

const googleCloudTtsFlow = ai.defineFlow(
  {
    name: 'googleCloudTtsFlow',
    inputSchema: GoogleCloudTextToSpeechInputSchema,
    outputSchema: GoogleCloudTextToSpeechOutputSchema,
  },
  async (input) => {
    const {text, languageCode} = input;

    // Creates a client
    const client = new TextToSpeechClient();

    let voiceName = '';
    if (languageCode === 'hi-IN') {
        voiceName = 'hi-IN-Wavenet-A'; // A high-quality female voice for Hindi
    } else {
        voiceName = 'en-US-Wavenet-F'; // A high-quality female voice for English
    }


    const request = {
      input: {text},
      // Select the language and SSML voice gender (optional)
      voice: {languageCode: languageCode, name: voiceName},
      // select the type of audio encoding
      audioConfig: {audioEncoding: 'MP3' as const},
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    
    if (!response.audioContent) {
        throw new Error('No audio content was generated.');
    }

    // The audio content is a Buffer, convert it to a base64 string
    const audioBase64 = Buffer.from(response.audioContent).toString('base64');
    
    return {
      audioDataUri: `data:audio/mp3;base64,${audioBase64}`,
    };
  }
);
