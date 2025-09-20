"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "@/components/legalease/FileUpload";
import { LoadingState } from "@/components/legalease/LoadingState";
import { AnalysisView, type AnalysisResult } from "@/components/legalease/AnalysisView";
import { analyzeDocumentAction } from "@/app/actions";
import { sampleLegalText } from "@/lib/legal-text";
import { Logo } from "@/components/legalease/Logo";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const { toast } = useToast();

  const handleAnalysis = async (file: File) => {
    setIsLoading(true);
    try {
      // In a real app, you would extract text from the `file` object.
      // For this demo, we are using sample text.
      const result = await analyzeDocumentAction(sampleLegalText);
      setAnalysisResult(result);
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };
  
  const handleUseSample = async () => {
    setIsLoading(true);
    try {
      const result = await analyzeDocumentAction(sampleLegalText);
      setAnalysisResult(result);
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
        </div>
      </header>
      <main className="flex-grow container py-8 md:py-12">
        {isLoading ? (
          <LoadingState />
        ) : analysisResult ? (
          <AnalysisView result={analysisResult} onReset={handleReset} />
        ) : (
          <FileUpload onAnalyze={handleAnalysis} onUseSample={handleUseSample} />
        )}
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            Built with{" "}
            <a
              href="https://firebase.google.com/docs/genkit"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Genkit
            </a>{" "}
            and{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Next.js
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
