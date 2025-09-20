"use client";

import { useState, useMemo, Fragment, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { translateSummaryAction } from "@/app/actions";
import { Loader2, AlertTriangle, FileWarning, ShieldCheck, Info } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

export type AnalysisResult = {
  summary: string;
  highlightedText: string;
};

type AnalysisViewProps = {
  result: AnalysisResult;
  onReset: () => void;
};

const riskExplanations: Record<
  string,
  { title: string; explanation: string; icon: ReactNode }
> = {
  red: {
    title: "High Risk",
    explanation:
      "This clause is potentially high-risk and may be unenforceable or highly unfavorable. It is strongly recommended to consult a legal professional for a thorough review.",
    icon: <FileWarning className="h-5 w-5 text-red-500" />,
  },
  orange: {
    title: "Medium Risk",
    explanation:
      "This clause appears unusual compared to standard contract norms in India. It may not be inherently unfavorable, but requires careful consideration of its implications.",
    icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
  },
  yellow: {
    title: "Low Risk",
    explanation:
      "This clause requires further review or clarification. While not immediately alarming, its ambiguity could lead to disputes. Ensure you fully understand its meaning before agreeing.",
    icon: <Info className="h-5 w-5 text-yellow-600" />,
  },
};

const parseHighlightedText = (text: string): ReactNode[] => {
  if (!text) return [];

  const parts = text.split(/(<\/?(red|yellow|orange)>)/g);
  const elements: ReactNode[] = [];
  let openTag: string | null = null;
  let key = 0;

  for (const part of parts) {
    if (!part) continue;

    if (part.startsWith("<") && !part.startsWith("</")) {
      openTag = part.substring(1, part.length - 1);
    } else if (part.startsWith("</")) {
      openTag = null;
    } else {
      key++;
      if (openTag && riskExplanations[openTag]) {
        const riskInfo = riskExplanations[openTag];
        elements.push(
          <Popover key={key}>
            <PopoverTrigger asChild>
              <span className={`highlight-${openTag} cursor-pointer transition-all hover:brightness-95`}>
                {part}
              </span>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex items-start gap-3">
                <div className="mt-1">{riskInfo.icon}</div>
                <div className="grid gap-1.5">
                  <h4 className="font-semibold leading-none">{riskInfo.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {riskInfo.explanation}
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        );
      } else {
        elements.push(<Fragment key={key}>{part}</Fragment>);
      }
    }
  }

  return elements;
};

export function AnalysisView({ result, onReset }: AnalysisViewProps) {
  const [hindiSummary, setHindiSummary] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    if (hindiSummary || isTranslating) return;

    setIsTranslating(true);
    try {
      const translated = await translateSummaryAction(result.summary);
      setHindiSummary(translated);
    } catch (error) {
      console.error("Translation failed:", error);
      // Optionally, show a toast notification for translation failure
    } finally {
      setIsTranslating(false);
    }
  };

  const parsedContent = useMemo(
    () => parseHighlightedText(result.highlightedText),
    [result.highlightedText]
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analysis Complete</h1>
          <p className="text-muted-foreground">
            Review the summary and highlighted risks in your document.
          </p>
        </div>
        <Button onClick={onReset} variant="outline">
          Analyze Another Document
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="h-[70vh]">
          <CardHeader>
            <CardTitle>Full Document</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh] pr-4">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {parsedContent}
              </p>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="h-[70vh]">
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary-en">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="summary-en">English Summary</TabsTrigger>
                <TabsTrigger value="summary-hi" onClick={handleTranslate}>
                  Hindi Summary
                </TabsTrigger>
              </TabsList>
              <TabsContent value="summary-en" className="mt-4">
                 <ScrollArea className="h-[55vh] pr-4">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {result.summary}
                    </p>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="summary-hi" className="mt-4">
                 <ScrollArea className="h-[55vh] pr-4">
                    {isTranslating ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                    ) : hindiSummary ? (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                            {hindiSummary}
                        </p>
                    ) : (
                    <div className="text-center text-muted-foreground">
                        Click tab to translate.
                    </div>
                    )}
                 </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
