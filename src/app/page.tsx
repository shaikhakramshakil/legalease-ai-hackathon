"use client";

import {
  FileUp,
  Landmark,
  FileText,
  Briefcase,
  MessageSquare,
  History,
  Home as HomeIcon,
  User,
  ChevronRight,
  ShieldCheck,
  Gavel,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/legalease/AppHeader";
import { useState } from "react";
import { FileUpload } from "@/components/legalease/FileUpload";
import { LoadingState } from "@/components/legalease/LoadingState";
import {
  AnalysisView,
  type AnalysisResult,
} from "@/components/legalease/AnalysisView";
import { analyzeDocumentAction } from "./actions";
import { sampleLegalText } from "@/lib/legal-text";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Chatbot } from "@/components/legalease/Chatbot";

type AppState = "initial" | "loading" | "error" | "result";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("initial");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [documentText, setDocumentText] = useState<string>("");
  const { toast } = useToast();

  const handleAnalyze = async (file: File) => {
    setAppState("loading");
    try {
      const text = await file.text();
      setDocumentText(text);
      const result = await analyzeDocumentAction(text);
      setAnalysisResult(result);
      setAppState("result");
    } catch (error) {
      console.error(error);
      setAppState("error");
      toast({
        title: "Analysis Failed",
        description:
          "There was an error analyzing your document. Please try again.",
        variant: "destructive",
      });
      handleReset();
    }
  };

  const handleUseSample = async () => {
    setAppState("loading");
    try {
      setDocumentText(sampleLegalText);
      const result = await analyzeDocumentAction(sampleLegalText);
      setAnalysisResult(result);
      setAppState("result");
    } catch (error) {
      console.error(error);
      setAppState("error");
      toast({
        title: "Analysis Failed",
        description:
          "There was an error analyzing the sample document. Please try again.",
        variant: "destructive",
      });
      handleReset();
    }
  };

  const handleReset = () => {
    setAppState("initial");
    setAnalysisResult(null);
    setDocumentText("");
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-black text-white">
      <div className="flex-grow">
        <AppHeader />
        <main className="px-4 pb-24">
          {appState === "initial" && (
            <div className="animate-in fade-in duration-500">
              <section className="mb-8">
                <FileUpload
                  onAnalyze={handleAnalyze}
                  onUseSample={handleUseSample}
                />
              </section>

              {/* Templates Section */}
              <section className="mb-8">
                <h3 className="mb-4 text-lg font-semibold">
                  Or start with a template
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <button
                    onClick={handleUseSample}
                    className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-900/70 p-4 transition-colors hover:bg-gray-800"
                  >
                    <Landmark className="h-6 w-6" />
                    <span className="text-sm font-medium">NDA</span>
                  </button>
                  <button
                    onClick={handleUseSample}
                    className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-900/70 p-4 transition-colors hover:bg-gray-800"
                  >
                    <FileText className="h-6 w-6" />
                    <span className="text-sm font-medium">Lease</span>
                  </button>
                  <button
                    onClick={handleUseSample}
                    className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-900/70 p-4 transition-colors hover:bg-gray-800"
                  >
                    <Briefcase className="h-6 w-6" />
                    <span className="text-sm font-medium">Contract</span>
                  </button>
                </div>
              </section>

              {/* Recent Documents Section */}
              <section>
                <h3 className="mb-4 text-lg font-semibold">
                  Recent Documents
                </h3>
                <div className="space-y-3">
                  <div className="glass-card flex items-center justify-between rounded-xl p-4 transition-all duration-300 hover:border-white/20 hover:bg-gray-900/70">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 rounded-lg bg-black/40 p-3">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          Tenancy_Agreement_v2.pdf
                        </h4>
                        <p className="text-sm text-white/60">
                          Analyzed 2 days ago
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white/60" />
                  </div>
                  <div className="glass-card flex items-center justify-between rounded-xl p-4 transition-all duration-300 hover:border-white/20 hover:bg-gray-900/70">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 rounded-lg bg-black/40 p-3">
                        <Gavel className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          Freelance_Contract.docx
                        </h4>
                        <p className="text-sm text-white/60">
                          Analyzed 5 days ago
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white/60" />
                  </div>
                  <div className="glass-card flex items-center justify-between rounded-xl p-4 transition-all duration-300 hover:border-white/20 hover:bg-gray-900/70">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 rounded-lg bg-black/40 p-3">
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          NDA_Project_Alpha.pdf
                        </h4>
                        <p className="text-sm text-white/60">
                          Analyzed 1 week ago
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white/60" />
                  </div>
                </div>
              </section>
            </div>
          )}

          {appState === "loading" && <LoadingState />}

          {appState === "result" && analysisResult && (
            <AnalysisView result={analysisResult} onReset={handleReset} />
          )}
        </main>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-6 z-20">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="h-16 w-16 rounded-full bg-white text-black shadow-lg transition-transform hover:scale-105 hover:bg-gray-200"
            >
              <MessageSquare className="h-8 w-8" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-screen w-screen flex flex-col p-0 border-0">
            <Chatbot documentText={documentText} />
          </SheetContent>
        </Sheet>
      </div>

      <nav className="sticky bottom-0 border-t border-white/10 bg-black/50 backdrop-blur-lg">
        <div className="flex justify-around py-2">
          <a
            className="flex w-1/3 flex-col items-center justify-center gap-1 text-white transition-transform duration-200 hover:scale-110"
            href="/"
          >
            <HomeIcon />
            <span className="text-xs font-medium">Home</span>
          </a>
          <a
            className="flex w-1/3 flex-col items-center justify-center gap-1 text-gray-400 transition-transform duration-200 hover:scale-110 hover:text-white"
            href="#"
          >
            <History />
            <span className="text-xs font-medium">History</span>
          </a>
          <a
            className="flex w-1/3 flex-col items-center justify-center gap-1 text-gray-400 transition-transform duration-200 hover:scale-110 hover:text-white"
            href="/profile"
          >
            <User />
            <span className="text-xs font-medium">Profile</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
