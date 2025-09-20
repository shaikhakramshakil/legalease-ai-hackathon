"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "@/components/legalease/FileUpload";
import { LoadingState } from "@/components/legalease/LoadingState";
import { AnalysisView, type AnalysisResult } from "@/components/legalease/AnalysisView";
import { analyzeDocumentAction } from "@/app/actions";
import { sampleLegalText } from "@/lib/legal-text";
import { MoreVertical, Upload, FileText, Settings } from "lucide-react";

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

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }
    if (analysisResult) {
      return (
        <div className="bg-background flex-grow">
          <AnalysisView result={analysisResult} onReset={handleReset} />
        </div>
      );
    }
    return (
       <div className="flex-grow">
        <header className="flex items-center p-4 justify-between">
          <div className="w-12"></div>
          <h1 className="text-white text-xl font-bold text-center flex-1">Upload</h1>
          <button className="flex items-center justify-center h-12 w-12 text-white">
            <MoreVertical className="text-3xl" />
          </button>
        </header>
        <main className="px-6 py-10">
           <FileUpload onAnalyze={handleAnalysis} onUseSample={handleUseSample} />
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-gradient-to-br from-[#0c4a6e] to-[#0284c7] justify-between group/design-root">
      {renderContent()}
      {!analysisResult && (
        <nav className="sticky bottom-0 bg-black/30 backdrop-blur-lg px-4 pt-3 pb-5">
            <div className="flex justify-around">
            <a className="flex flex-col items-center justify-end gap-1 text-sky-400" href="#">
                <Upload />
                <p className="text-xs font-medium">Upload</p>
            </a>
            <a className="flex flex-col items-center justify-end gap-1 text-gray-400" href="#">
                <FileText />
                <p className="text-xs font-medium">Summaries</p>
            </a>
            <a className="flex flex-col items-center justify-end gap-1 text-gray-400" href="#">
                <Settings />
                <p className="text-xs font-medium">Settings</p>
            </a>
            </div>
        </nav>
      )}
    </div>
  );
}
