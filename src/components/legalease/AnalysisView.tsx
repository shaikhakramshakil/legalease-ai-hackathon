
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { KeyRisk } from "./RiskAlertView";
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { textToSpeechAction } from "@/app/actions";


export type AnalysisResult = {
  summary: string;
  highlightedText: string;
  keyRisk: KeyRisk;
};

type AnalysisViewProps = {
  result: AnalysisResult;
  onReset: () => void;
};

const riskMapping: { [key: string]: { title: string, icon: string, color: string } } = {
  high: { title: "High Risk", icon: "gpp_bad", color: "text-high" },
  medium: { title: "Medium Risk", icon: "warning", color: "text-medium" },
  low: { title: "Low Risk", icon: "verified_user", color: "text-low" },
};

type Clause = {
  type: 'safe' | 'risk';
  riskLevel?: 'high' | 'medium' | 'low';
  title: string;
  explanation: string;
  content: string;
};

const parseHighlightedText = (text: string): Clause[] => {
  if (!text) return [];

  const clauses: Clause[] = [];
  const parts = text.split(/(<(high|medium|low)>.*?<\/(?:high|medium|low)>)/gs);

  let safeContentBuffer = "";

  for (const part of parts) {
    if (!part) continue;

    const riskMatch = part.match(/<(high|medium|low)>(.*?)<\/(?:high|medium|low)>/s);
    if (riskMatch) {
      if (safeContentBuffer.trim()) {
        clauses.push({ type: 'safe', title: 'Standard Clause', explanation: 'This is a standard clause with no identified risks.', content: safeContentBuffer.trim() });
        safeContentBuffer = "";
      }
      const riskLevel = riskMatch[1] as 'high' | 'medium' | 'low';
      const content = riskMatch[2].trim();
      clauses.push({
        type: 'risk',
        riskLevel: riskLevel,
        title: riskMapping[riskLevel].title,
        explanation: `This clause is identified as potentially ${riskLevel} risk.`,
        content: content,
      });
    } else {
      safeContentBuffer += part;
    }
  }

  if (safeContentBuffer.trim()) {
    clauses.push({ type: 'safe', title: 'Standard Clause', explanation: 'This is a standard clause with no identified risks.', content: safeContentBuffer.trim() });
  }

  return clauses;
};


export function AnalysisView({ result, onReset }: AnalysisViewProps) {
  const detailsRefs = useRef<(HTMLDetailsElement | null)[]>([]);
  const { toast } = useToast();
  const [isShareSupported, setIsShareSupported] = useState(false);
  
  const [isReading, setIsReading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);

  useEffect(() => {
    if (navigator.share) {
      setIsShareSupported(true);
    }

    // Cleanup audio on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Legal Document Analysis Report',
          text: 'Here is the summary of the legal document I analyzed with Legalease AI.',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        toast({
            title: "Sharing Failed",
            description: "Could not share the report at this moment.",
            variant: "destructive"
        })
      }
    }
  };

  const handleDownload = () => {
    window.print();
  };
  
  const playAudio = (audioDataUri: string) => {
    const audio = new Audio(audioDataUri);
    audioRef.current = audio;
    audio.play();
    setIsReading(true);
    audio.onended = () => {
      setIsReading(false);
      audioRef.current = null;
    };
     audio.onerror = () => {
      console.error("Error playing audio.");
      setIsReading(false);
      toast({
        title: "Playback Error",
        description: "Could not play the generated audio.",
        variant: "destructive",
      });
    };
  }

  const handleReadAloud = async () => {
    if (isReading && audioRef.current) {
      audioRef.current.pause();
      setIsReading(false);
      return;
    }

    if (!isReading && audioRef.current) {
      audioRef.current.play();
      setIsReading(true);
      return;
    }

    setIsGeneratingAudio(true);
    try {
      const audioDataUri = await textToSpeechAction(result.summary);
      playAudio(audioDataUri);

    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        title: "Failed to Read Aloud",
        description: `Could not generate audio for the summary. ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const clauses = useMemo(() => parseHighlightedText(result.highlightedText), [result.highlightedText]);
  const riskyClausesCount = clauses.filter(c => c.type === 'risk').length;
  
  const overallRisk = useMemo(() => {
    const hasHigh = clauses.some(c => c.riskLevel === 'high');
    const hasMedium = clauses.some(c => c.riskLevel === 'medium');
    if (hasHigh) return { level: 'High', color: 'high', width: '100%', count: riskyClausesCount };
    if (hasMedium) return { level: 'Medium', color: 'medium', width: '66.66%', count: riskyClausesCount };
    return { level: 'Low', color: 'low', width: '33.33%', count: riskyClausesCount };
  }, [clauses, riskyClausesCount]);

  useEffect(() => {
    detailsRefs.current.forEach((el) => {
      if (!el) return;
      const summary = el.querySelector('summary');
      if (!summary) return;
      const icon = summary.querySelector('.material-symbols-outlined:last-child');
      if (!icon) return;

      const toggleListener = () => {
        if (el.open) {
          (icon as HTMLElement).style.transform = 'rotate(180deg)';
        } else {
          (icon as HTMLElement).style.transform = 'rotate(0deg)';
        }
      };
      el.addEventListener('toggle', toggleListener);
      
      return () => el.removeEventListener('toggle', toggleListener)
    });
  }, [clauses]);


  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between p-4">
          <button onClick={onReset} className="p-2 -m-2 text-muted-foreground">
            <span className="material-symbols-outlined"> arrow_back_ios_new </span>
          </button>
          <h1 className="text-lg font-bold text-foreground">Summary</h1>
          <div className="flex items-center gap-2">
            {isShareSupported && (
                 <button onClick={handleShare} className="p-2 -m-2 text-muted-foreground">
                    <span className="material-symbols-outlined"> share </span>
                </button>
            )}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="p-2 -m-2 text-muted-foreground">
                        <span className="material-symbols-outlined"> more_vert </span>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleDownload}>
                         <span className="material-symbols-outlined mr-2"> download </span>
                        <span>Download as PDF</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1 px-5 pt-6 pb-24 overflow-y-auto">
        <div className="mb-8 p-6 rounded-xl bg-accent border">
          <h2 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-4">Overall Risk Level</h2>
          <div className="mb-6">
            <div className={`relative h-2 bg-muted rounded-full`}>
              <div className={`absolute top-0 left-0 h-2 bg-${overallRisk.color} rounded-full`} style={{ width: overallRisk.width }}></div>
              <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-gray-300 border-4 border-${overallRisk.color} rounded-full`} style={{ left: overallRisk.width, transform: 'translate(-50%, -50%)' }}></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center size-12 rounded-full bg-${overallRisk.color}/10 text-${overallRisk.color}`}>
              <span className="material-symbols-outlined text-3xl"> {clauses.some(c => c.riskLevel === 'high') ? 'gpp_bad' : 'warning'} </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{overallRisk.level} Risk</p>
              <p className="text-sm text-muted-foreground">Contains {overallRisk.count} potentially risky clause{overallRisk.count === 1 ? '' : 's'}.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Plain-Language Summary</h2>
             <div className="flex items-center gap-2">
                <button onClick={handleReadAloud} className="p-2 -m-2 text-primary flex items-center gap-1" disabled={isGeneratingAudio}>
                    {isGeneratingAudio ? <Loader2 className="animate-spin" size={24}/> :  <span className="material-symbols-outlined text-2xl"> {isReading ? 'pause_circle' : 'play_circle'} </span>}
                </button>
            </div>
        </div>
         <div className="text-muted-foreground leading-relaxed mb-8">
            <p>{result.summary}</p>
        </div>


        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Key Clauses</h2>
        </div>

        <div className="space-y-4">
          {clauses.map((clause, index) => (
            <details key={index} ref={el => detailsRefs.current[index] = el} className={`rounded-lg ${clause.type === 'safe' ? 'safe-clause' : 'risk-clause'}`}>
              <summary className="p-4 list-none cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center shrink-0">
                      <span className={`material-symbols-outlined ${clause.type === 'safe' ? 'text-green-500' : riskMapping[clause.riskLevel!]?.color || 'text-red-500'}`}>
                        {clause.type === 'safe' ? 'verified_user' : riskMapping[clause.riskLevel!]?.icon || 'gpp_bad'}
                      </span>
                    </div>
                    <p className="font-semibold text-foreground">{clause.title}</p>
                  </div>
                  <span className="material-symbols-outlined text-muted-foreground transform transition-transform duration-300 ease-out"> expand_more </span>
                </div>
              </summary>
              <div className="clause-content px-4 pb-4">
                <p className="text-muted-foreground text-sm leading-6 mb-4">{clause.content}</p>
                <Link href="/clause" className="w-full h-10 px-4 bg-black/5 dark:bg-white/10 text-foreground font-bold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-black/10 dark:hover:bg-white/20 transition-colors">
                  <span className="material-symbols-outlined text-base"> smart_toy </span>
                  <span>Ask AI Assistant</span>
                </Link>
              </div>
            </details>
          ))}
        </div>
        <Button onClick={onReset} className="w-full h-14 text-base mt-8">
          <span className="material-symbols-outlined"> document_scanner </span>
          <span>Analyze Another Document</span>
        </Button>
      </main>
    </div>
  );
}
