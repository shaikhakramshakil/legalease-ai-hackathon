"use client";

import { useState, useMemo, Fragment, type ReactNode, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { translateSummaryAction } from "@/app/actions";
import { Loader2 } from "lucide-react";

export type AnalysisResult = {
  summary: string;
  highlightedText: string;
};

type AnalysisViewProps = {
  result: AnalysisResult;
  onReset: () => void;
};

const riskMapping: { [key: string]: { title: string, icon: string, color: string } } = {
  red: { title: "High Risk", icon: "gpp_bad", color: "text-red-500" },
  orange: { title: "Medium Risk", icon: "warning", color: "text-orange-500" },
  yellow: { title: "Low Risk", icon: "verified_user", color: "text-yellow-500" },
};

type Clause = {
  type: 'safe' | 'risk';
  riskLevel?: 'red' | 'orange' | 'yellow';
  title: string;
  explanation: string;
  content: string;
};

const parseHighlightedText = (text: string): Clause[] => {
  if (!text) return [];

  const clauses: Clause[] = [];
  const parts = text.split(/(<(red|yellow|orange)>.*?<\/(?:red|yellow|orange)>)/gs);

  let isSafeBlock = true;
  let safeContentBuffer = "";

  for (const part of parts) {
    if (!part) continue;

    const riskMatch = part.match(/<(red|yellow|orange)>(.*?)<\/(?:red|yellow|orange)>/s);
    if (riskMatch) {
      if (safeContentBuffer.trim()) {
        clauses.push({ type: 'safe', title: 'Standard Clause', explanation: 'This is a standard clause with no identified risks.', content: safeContentBuffer.trim() });
        safeContentBuffer = "";
      }
      const riskLevel = riskMatch[1] as 'red' | 'yellow' | 'orange';
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
  const [hindiSummary, setHindiSummary] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const detailsRefs = useRef<(HTMLDetailsElement | null)[]>([]);

  const handleTranslate = async () => {
    if (hindiSummary || isTranslating) return;
    setIsTranslating(true);
    try {
      const translated = await translateSummaryAction(result.summary);
      setHindiSummary(translated);
    } catch (error) {
      console.error("Translation failed:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  const clauses = useMemo(() => parseHighlightedText(result.highlightedText), [result.highlightedText]);
  const riskyClausesCount = clauses.filter(c => c.type === 'risk').length;
  
  const overallRisk = useMemo(() => {
    const hasHigh = clauses.some(c => c.riskLevel === 'red');
    const hasMedium = clauses.some(c => c.riskLevel === 'orange');
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
    <div className="min-h-screen flex flex-col animate-in fade-in duration-500">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between p-4">
          <button onClick={onReset} className="p-2 -m-2 text-muted-foreground">
            <span className="material-symbols-outlined"> arrow_back_ios_new </span>
          </button>
          <h1 className="text-lg font-bold text-foreground">Summary</h1>
          <div className="w-6"></div>
        </div>
      </header>

      <main className="flex-1 px-5 pt-8 pb-4">
        <div className="mb-8 p-6 rounded-xl bg-card">
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
              <span className="material-symbols-outlined text-3xl"> {clauses.some(c => c.riskLevel === 'red') ? 'gpp_bad' : 'warning'} </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{overallRisk.level} Risk</p>
              <p className="text-sm text-muted-foreground">Contains {overallRisk.count} potentially risky clause{overallRisk.count === 1 ? '' : 's'}.</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-foreground mb-4">Plain-Language Summary</h2>
        <div className="text-muted-foreground leading-relaxed mb-8">
            {isTranslating ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : hindiSummary ? (
                <p className="font-sans">{hindiSummary}</p>
            ) : (
                <p>{result.summary}</p>
            )}
        </div>


        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Key Clauses</h2>
          <button onClick={handleTranslate} className="p-2 -m-2 text-primary">
            <span className="material-symbols-outlined"> translate </span>
          </button>
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
                <button className="w-full h-10 px-4 bg-black/5 dark:bg-white/10 text-foreground font-bold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-black/10 dark:hover:bg-white/20 transition-colors">
                  <span className="material-symbols-outlined text-base"> smart_toy </span>
                  <span>Ask AI Assistant</span>
                </button>
              </div>
            </details>
          ))}
        </div>
      </main>

      <footer className="sticky bottom-0 bg-background/90 backdrop-blur-sm p-4 border-t">
        <Button onClick={onReset} className="w-full h-14 text-base">
          <span className="material-symbols-outlined"> document_scanner </span>
          <span>Analyze Another Document</span>
        </Button>
      </footer>
    </div>
  );
}
