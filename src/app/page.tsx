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
  Menu,
  Bell,
  UploadFile,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/legalease/AppHeader";
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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Chatbot } from "@/components/legalease/Chatbot";

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
          <button onClick={handleUseSample} className="flex flex-col items-center p-3 bg-black/5 dark:bg-white/10 rounded-xl hover:bg-black/10 dark:hover:bg-white/20 transition-colors">
            <span className="material-symbols-outlined text-3xl mb-1">
              gavel
            </span>
            <span className="text-xs font-medium">NDA</span>
          </button>
          <button onClick={handleUseSample} className="flex flex-col items-center p-3 bg-black/5 dark:bg-white/10 rounded-xl hover:bg-black/10 dark:hover:bg-white/20 transition-colors">
            <span className="material-symbols-outlined text-3xl mb-1">
              real_estate_agent
            </span>
            <span className="text-xs font-medium">Lease</span>
          </button>
          <button onClick={handleUseSample} className="flex flex-col items-center p-3 bg-black/5 dark:bg-white/10 rounded-xl hover:bg-black/10 dark:hover:bg-white/20 transition-colors">
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
          <div className="flex items-center p-3 bg-black/5 dark:bg-white/10 rounded-xl">
            <span className="material-symbols-outlined text-2xl mr-4 text-green-500">
              check_circle
            </span>
            <div className="flex-1">
              <p className="font-medium">Rental_Agreement_Final.pdf</p>
              <p className="text-xs text-black/60 dark:text-white/60">
                Analyzed 2 days ago
              </p>
            </div>
            <button className="p-2 text-black/60 dark:text-white/60">
              <span className="material-symbols-outlined text-xl">
                more_vert
              </span>
            </button>
          </div>
          <div className="flex items-center p-3 bg-black/5 dark:bg-white/10 rounded-xl">
            <span className="material-symbols-outlined text-2xl mr-4 text-red-500">
              cancel
            </span>
            <div className="flex-1">
              <p className="font-medium">Freelance_Gig_Terms.txt</p>
              <p className="text-xs text-black/60 dark:text-white/60">
                Analysis failed
              </p>
            </div>
            <button className="p-2 text-black/60 dark:text-white/60">
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
    <div className="flex flex-col h-screen justify-between bg-background text-foreground">
     {appState !== 'risk-alert' && (
      <header className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
        <h1 className="text-xl font-bold">Simplify Document</h1>
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
      </header>
      )}

      <main className="flex-1 flex flex-col p-6 overflow-y-auto">
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

       {appState !== 'risk-alert' && (
        <>
          <div className="fixed bottom-24 right-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="bg-primary dark:bg-white text-white dark:text-black rounded-full p-4 shadow-lg hover:bg-black/80 dark:hover:bg-gray-200 transition-transform transform hover:scale-105">
                    <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48"}}>forum</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-screen w-screen flex flex-col p-0 border-0" hideClose={true}>
                <Chatbot documentText={documentText} />
              </SheetContent>
            </Sheet>
          </div>

          <footer className="bg-background border-t sticky bottom-0">
            <nav className="flex justify-around p-2">
              <a
                className="flex flex-col items-center gap-1 p-2 rounded-lg text-primary bg-primary/10"
                href="#"
              >
                <span className="material-symbols-outlined">upload</span>
                <span className="text-xs font-medium">Upload</span>
              </a>
              <a
                className="flex flex-col items-center gap-1 p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">description</span>
                <span className="text-xs font-medium">Summaries</span>
              </a>
              <a
                className="flex flex-col items-center gap-1 p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors"
                href="/profile"
              >
                <span className="material-symbols-outlined">person</span>
                <span className="text-xs font-medium">Account</span>
              </a>
            </nav>
          </footer>
        </>
       )}
    </div>
  );
}
