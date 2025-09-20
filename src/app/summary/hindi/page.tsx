
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { textToSpeechAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";


const hindiSummaryText = `यह दस्तावेज़, मानक कुमार और राधिका शर्मा के बीच एक किराये का समझौता है। मानक कुमार संपत्ति के मालिक हैं और राधिका शर्मा किरायेदार हैं। समझौते में देर से भुगतान शुल्क या जमा राशि की वापसी की शर्तों का स्पष्ट रूप से उल्लेख नहीं है, जिससे भविष्य में विवाद हो सकते हैं। हम दोनों पक्षों को सलाह देते हैं कि वे समझौते की शर्तों पर फिर से बातचीत करें ताकि संभावित जोखिमों को कम किया जा सके और एक स्पष्ट समझौता सुनिश्चित हो सके।`

export default function HindiSummaryPage() {
  const [isReading, setIsReading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleReadAloud = async () => {
    if (isReading) {
      audioRef.current?.pause();
      audioRef.current = null;
      setIsReading(false);
      return;
    }
    
    setIsReading(true);
    try {
      const audioDataUri = await textToSpeechAction(hindiSummaryText, 'hi-IN');
      const audio = new Audio(audioDataUri);
      audioRef.current = audio;
      audio.play();
      audio.onended = () => setIsReading(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to Read Aloud",
        description: "Could not generate audio for the summary.",
        variant: "destructive",
      });
      setIsReading(false);
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col justify-between overflow-x-hidden bg-background text-foreground">
      <div className="flex-grow">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center p-4">
            <Link href="/" passHref>
                <Button variant="ghost" size="icon" className="-ml-2">
                    <span className="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
                </Button>
            </Link>
            <h2 className="flex-1 text-center text-lg font-bold tracking-tight">
              Hindi Summary
            </h2>
            <div className="w-10"></div>
          </div>
        </header>
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-noto-sans-devanagari text-3xl font-bold">
              सारांश
            </h1>
            <div className="flex space-x-2 items-center">
              <button onClick={handleReadAloud} className="p-2 -m-2 text-primary flex items-center gap-1" disabled={isReading}>
                  {isReading ? <Loader2 className="animate-spin" size={20}/> :  <span className="material-symbols-outlined"> volume_up </span>}
              </button>
              <Link href="/">
                <Button
                  variant="outline"
                  className="font-display text-sm font-semibold rounded-full px-4 py-2"
                >
                  English
                </Button>
              </Link>
              <Button
                className="font-noto-sans-devanagari text-sm font-semibold rounded-full px-4 py-2"
              >
                हिन्दी
              </Button>
            </div>
          </div>
          <div className="space-y-6">
            <div className="border rounded-xl p-4">
              <h3 className="font-noto-sans-devanagari text-xl font-bold mb-2">
                मुख्य बिंदु
              </h3>
              <p className="font-noto-sans-devanagari text-base font-normal leading-relaxed text-muted-foreground">
                यह दस्तावेज़,{" "}
                <button className="font-bold text-foreground underline decoration-dotted underline-offset-4">
                  मानक कुमार
                </button>{" "}
                और{" "}
                <button className="font-bold text-foreground underline decoration-dotted underline-offset-4">
                  राधिका शर्मा
                </button>{" "}
                के बीच एक किराये का समझौता है। मानक कुमार संपत्ति के मालिक हैं और
                राधिका शर्मा किरायेदार हैं।
              </p>
            </div>
            <div className="border rounded-xl p-4">
              <h3 className="font-noto-sans-devanagari text-xl font-bold mb-2">
                जोखिम
              </h3>
              <p className="font-noto-sans-devanagari text-base font-normal leading-relaxed text-muted-foreground">
                समझौते में{" "}
                <button className="font-bold text-foreground underline decoration-dotted underline-offset-4">
                  देर से भुगतान शुल्क
                </button>{" "}
                या{" "}
                <button className="font-bold text-foreground underline decoration-dotted underline-offset-4">
                  जमा राशि की वापसी
                </button>{" "}
                की शर्तों का स्पष्ट रूप से उल्लेख नहीं है, जिससे भविष्य में
                विवाद हो सकते हैं।
              </p>
            </div>
            <div className="border rounded-xl p-4">
              <h3 className="font-noto-sans-devanagari text-xl font-bold mb-2">
                सिफ़ारिशें
              </h3>
              <p className="font-noto-sans-devanagari text-base font-normal leading-relaxed text-muted-foreground">
                हम दोनों पक्षों को सलाह देते हैं कि वे{" "}
                <button className="font-bold text-foreground underline decoration-dotted underline-offset-4">
                  समझौते की शर्तों
                </button>{" "}
                पर फिर से बातचीत करें ताकि संभावित जोखिमों को कम किया जा सके और
                एक स्पष्ट समझौता सुनिश्चित हो सके।
              </p>
            </div>
          </div>
        </main>
      </div>
      <footer className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t">
        <nav className="flex justify-around p-2">
          <a
            className="flex flex-1 flex-col items-center justify-end gap-1 text-muted-foreground hover:text-primary transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">upload_file</span>
            <span className="text-xs font-medium">Upload</span>
          </a>
          <a
            className="flex flex-1 flex-col items-center justify-end gap-1 text-primary"
            href="#"
          >
            <div className="relative">
              <span className="material-symbols-outlined">description</span>
            </div>
            <span className="text-xs font-medium">Summaries</span>
          </a>
          <a
            className="flex flex-1 flex-col items-center justify-end gap-1 text-muted-foreground hover:text-primary transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="text-xs font-medium">Account</span>
          </a>
        </nav>
      </footer>
    </div>
  );
}
