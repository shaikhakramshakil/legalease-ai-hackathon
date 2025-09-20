
"use client";

import { Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FileUpload } from "@/components/legalease/FileUpload";
import { LoadingState } from "@/components/legalease/LoadingState";
import {
  AnalysisView,
} from "@/components/legalease/AnalysisView";
import { RiskAlertView, type KeyRisk } from "@/components/legalease/RiskAlertView";
import { analyzeDocumentAction } from "./actions";
import { sampleLegalText } from "@/lib/legal-text";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Chatbot } from "@/components/legalease/Chatbot";
import { AppSidebar } from "@/components/legalease/AppSidebar";
import Link from "next/link";
import { Logo } from "@/components/legalease/Logo";


type AppState = "initial" | "loading" | "error" | "result" | "risk-alert";
type AnalysisResult = {
  summary: string;
  highlightedText: string;
  keyRisk: KeyRisk;
};


export default function Home() {
  const [appState, setAppState] = useState<AppState>("initial");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [documentText, setDocumentText] = useState<string>("");
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAnalyze = async (file: File) => {
    setAppState("loading");
    try {
      const text = await file.text();
      setDocumentText(text);
      const result = await analyzeDocumentAction(text);
      setAnalysisResult(result);
      if (result.keyRisk.hasRisk && (result.keyRisk.riskLevel === 'high' || result.keyRisk.riskLevel === 'medium')) {
        setAppState("risk-alert");
      } else {
        setAppState("result");
      }
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
       if (result.keyRisk.hasRisk && (result.keyRisk.riskLevel === 'high' || result.keyRisk.riskLevel === 'medium')) {
        setAppState("risk-alert");
      } else {
        setAppState("result");
      }
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
  
  const proceedToResults = () => {
    setAppState("result");
  };

  const handleReset = () => {
    setAppState("initial");
    setAnalysisResult(null);
    setDocumentText("");
  };

  const renderInitialState = () => (
    <div className="w-full max-w-md mx-auto">
      <FileUpload
        onAnalyze={handleAnalyze}
        onUseSample={handleUseSample}
      />

      <div className="my-8">
        <h3 className="text-lg font-semibold mb-3">Or start with a template</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <button onClick={handleUseSample} className="flex flex-col items-center p-3 glass-card hover:bg-white/20 transition-colors">
            <span className="material-symbols-outlined text-3xl mb-1">
              gavel
            </span>
            <span className="text-xs font-medium">NDA</span>
          </button>
          <button onClick={handleUseSample} className="flex flex-col items-center p-3 glass-card hover:bg-white/20 transition-colors">
            <span className="material-symbols-outlined text-3xl mb-1">
              real_estate_agent
            </span>
            <span className="text-xs font-medium">Lease</span>
          </button>
          <button onClick={handleUseSample} className="flex flex-col items-center p-3 glass-card hover:bg-white/20 transition-colors">
            <span className="material-symbols-outlined text-3xl mb-1">
              work
            </span>
            <span className="text-xs font-medium">Contract</span>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Documents</h3>
        <div className="space-y-3">
          <div className="flex items-center p-3 glass-card">
            <span className="material-symbols-outlined text-2xl mr-4 text-green-500">
              check_circle
            </span>
            <div className="flex-1">
              <p className="font-medium">Rental_Agreement_Final.pdf</p>
              <p className="text-xs text-white/60">
                Analyzed 2 days ago
              </p>
            </div>
            <button className="p-2 text-white/60">
              <span className="material-symbols-outlined text-xl">
                more_vert
              </span>
            </button>
          </div>
          <div className="flex items-center p-3 glass-card">
            <span className="material-symbols-outlined text-2xl mr-4 text-red-500">
              cancel
            </span>
            <div className="flex-1">
              <p className="font-medium">Freelance_Gig_Terms.txt</p>
              <p className="text-xs text-white/60">
                Analysis failed
              </p>
            </div>
            <button className="p-2 text-white/60">
              <span className="material-symbols-outlined text-xl">
                more_vert
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen justify-between text-foreground">
     {appState !== 'risk-alert' && appState !== 'result' && (
      <header className="flex items-center justify-between p-4 glass-card rounded-b-none">
         <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] p-0 bg-transparent border-0">
                <AppSidebar />
            </SheetContent>
        </Sheet>
        <Logo />
        <Link href="/notifications" passHref>
          <Button variant="ghost" size="icon" asChild>
            <div className="relative">
                <Bell className="h-6 w-6" />
              <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></div>
            </div>
          </Button>
        </Link>
      </header>
      )}

      <main className={`flex-1 flex flex-col overflow-y-auto ${appState === 'initial' ? 'p-6': ''}`}>
        {appState === "initial" && renderInitialState()}
        {appState === "loading" && <LoadingState />}
        {appState === "risk-alert" && analysisResult && (
          <RiskAlertView 
            keyRisk={analysisResult.keyRisk}
            onLearnMore={proceedToResults}
            onOk={proceedToResults}
          />
        )}
        {appState === "result" && analysisResult && (
          <AnalysisView result={analysisResult} onReset={handleReset} />
        )}
      </main>

       {(appState === 'initial' || appState === 'result') && (
        <>
          <div className="fixed bottom-24 right-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="glass-card rounded-full p-4 shadow-lg hover:bg-white/20 transition-transform transform hover:scale-105">
                    <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48"}}>forum</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-screen w-screen flex flex-col p-0 border-0" hideClose={true}>
                <Chatbot documentText={documentText} />
              </SheetContent>
            </Sheet>
          </div>

          <footer className="glass-card sticky bottom-0 rounded-t-none">
            <nav className="flex justify-around p-2">
              <Link
                href="/"
                className="flex flex-col items-center gap-1 p-2 rounded-lg text-primary"
              >
                <span className="material-symbols-outlined">home</span>
                <span className="text-xs font-medium">Home</span>
              </Link>
              <Link
                href="/summaries"
                className="flex flex-col items-center gap-1 p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">description</span>
                <span className="text-xs font-medium">Summaries</span>
              </Link>
              <Link
                href="/profile"
                className="flex flex-col items-center gap-1 p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">person</span>
                <span className="text-xs font-medium">Account</span>
              </Link>
            </nav>
          </footer>
        </>
       )}
    </div>
  );
}
