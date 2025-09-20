
"use client";

import {
  Settings,
  User,
  UploadCloud,
  MessageSquare,
  FileText,
  Gavel,
  ChevronRight,
} from "lucide-react";
import { TrendingTopicsChart } from "@/components/legalease/TrendingTopicsChart";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppFooter } from "@/components/legalease/AppFooter";
import { useToast } from "@/hooks/use-toast";
import { analyzeDocumentAction } from "../actions";

export default function ProfilePage() {
  const { toast } = useToast();
  const handleAnalyze = async (file: File) => {
    try {
      const text = await file.text();
      // You may want to redirect to the main page or handle the result differently here
      await analyzeDocumentAction(text);
      toast({
        title: "Analysis Started",
        description: "Your document is being analyzed. You will be notified upon completion."
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your document.",
        variant: "destructive",
      });
    }
  };


  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col text-white">
      
      <div className="relative z-10 flex-grow pb-24">
        <header className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <h1 className="text-lg font-bold">Alex</h1>
            </div>
          </div>
          <Button asChild variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Link href="/settings">
              <Settings className="h-6 w-6" />
            </Link>
          </Button>
        </header>

        <main className="px-4 pb-4">
          <section className="mb-6">
            <div className="grid grid-cols-3 gap-3">
              <div className="glass-card p-3 text-center transition-all duration-300 hover:border-white/20 hover:bg-gray-900/70">
                <p className="text-xs text-muted-foreground">Docs Scanned</p>
                <p className="text-xl font-bold">142</p>
              </div>
              <div className="glass-card p-3 text-center transition-all duration-300 hover:border-white/20 hover:bg-gray-900/70">
                <p className="text-xs text-muted-foreground">Risks Identified</p>
                <p className="text-xl font-bold">89</p>
              </div>
              <div className="glass-card p-3 text-center transition-all duration-300 hover:border-white/20 hover:bg-gray-900/70">
                <p className="text-xs text-muted-foreground">Hours Saved</p>
                <p className="text-xl font-bold">35</p>
              </div>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center gap-2 py-4 px-3 glass-card text-white font-semibold text-sm transition-transform duration-200 hover:scale-105 hover:bg-gray-900/70">
                <UploadCloud className="h-8 w-8" />
                <span>Upload New</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 py-4 px-3 glass-card font-semibold text-sm transition-transform duration-200 hover:scale-105 hover:bg-gray-900/70">
                <MessageSquare className="h-8 w-8" />
                <span>Access Chatbot</span>
              </button>
            </div>
          </section>

          <section className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold">Recent Activity</h2>
              <a className="text-sm font-medium text-gray-400 transition-colors hover:text-white" href="#">
                View All
              </a>
            </div>
            <div className="space-y-3">
              <div className="glass-card p-3 flex items-center justify-between transition-all duration-300 hover:border-white/20 hover:bg-gray-900/70">
                <div className="flex items-center gap-3">
                  <div className="bg-black/40 p-2 rounded-lg">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Tenancy Agreement.pdf</h3>
                    <p className="text-xs text-gray-400">
                      Simplified on 12/04/2024
                    </p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400" />
              </div>
              <div className="glass-card p-3 flex items-center justify-between transition-all duration-300 hover:border-white/20 hover:bg-gray-900/70">
                <div className="flex items-center gap-3">
                  <div className="bg-black/40 p-2 rounded-lg">
                    <Gavel className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">
                      Employment Contract.docx
                    </h3>
                    <p className="text-xs text-gray-400">
                      Simplified on 10/04/2024
                    </p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              Trending Legal Topics
            </h2>
            <TrendingTopicsChart />
          </section>
        </main>
      </div>

      <AppFooter onFileSelect={handleAnalyze} />
    </div>
  );
}
