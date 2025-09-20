"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Menu,
  Bell,
  UploadCloud,
  Gavel,
  HomeIcon,
  Briefcase,
  MoreVertical,
  CheckCircle,
  XCircle,
  Upload,
  FileText,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = () => {
    // This would trigger a file input
    // For now, we can just log a message
    console.log("Select file to upload");
  };

  return (
    <div className="flex flex-col h-screen justify-between font-display bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
        <h1 className="text-xl font-bold">LegalEase AI</h1>
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
      </header>

      <main className="flex-1 flex flex-col p-6 overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          {/* Upload Section */}
          <div className="relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-foreground/50 rounded-2xl bg-foreground/5 mb-8">
            <UploadCloud className="w-16 h-16 text-primary mb-4" />
            <h2 className="text-xl font-bold mb-2">Upload Your Document</h2>
            <p className="text-sm text-center text-foreground/60 mb-6">
              Let our AI clarify jargon, highlight risks, and provide
              easy-to-understand explanations.
            </p>
            <Button
              className="font-bold py-3 px-8 rounded-full w-full h-auto text-base"
              onClick={handleFileSelect}
            >
              Select file to upload
            </Button>
            <p className="text-xs text-foreground/50 mt-4">
              PDF, DOCX, TXT accepted
            </p>
          </div>

          {/* Templates Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">
              Or start with a template
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <Button
                variant="secondary"
                className="flex flex-col items-center p-3 h-auto rounded-xl"
              >
                <Gavel className="h-8 w-8 mb-1" />
                <span className="text-xs font-medium">NDA</span>
              </Button>
              <Button
                variant="secondary"
                className="flex flex-col items-center p-3 h-auto rounded-xl"
              >
                <HomeIcon className="h-8 w-8 mb-1" />
                <span className="text-xs font-medium">Lease</span>
              </Button>
              <Button
                variant="secondary"
                className="flex flex-col items-center p-3 h-auto rounded-xl"
              >
                <Briefcase className="h-8 w-8 mb-1" />
                <span className="text-xs font-medium">Contract</span>
              </Button>
            </div>
          </div>

          {/* Analysis in Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Analysis in Progress</h3>
              <span className="text-sm font-medium text-foreground/60">
                1/1
              </span>
            </div>
            <div className="bg-foreground/5 rounded-xl p-4">
              <div className="flex items-center">
                <FileText className="w-8 h-8 mr-4" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold text-sm">
                      Employment_Contract_v3.docx
                    </p>
                    <p className="text-sm font-bold">75%</p>
                  </div>
                  <div className="w-full bg-foreground/20 rounded-full h-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Documents */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Documents</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-foreground/5 rounded-xl">
                <CheckCircle className="w-6 h-6 mr-4 text-green-500" />
                <div className="flex-1">
                  <p className="font-medium">Rental_Agreement_Final.pdf</p>
                  <p className="text-xs text-foreground/60">
                    Analyzed 2 days ago
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center p-3 bg-foreground/5 rounded-xl">
                <XCircle className="w-6 h-6 mr-4 text-red-500" />
                <div className="flex-1">
                  <p className="font-medium">Freelance_Gig_Terms.txt</p>
                  <p className="text-xs text-foreground/60">
                    Analysis failed
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t sticky bottom-0 bg-background">
        <nav className="flex justify-around p-2">
          <a
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-primary bg-foreground/10"
            href="#"
          >
            <Upload />
            <span className="text-xs font-medium">Upload</span>
          </a>
          <a
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-foreground/60 hover:text-primary transition-colors"
            href="#"
          >
            <FileText />
            <span className="text-xs font-medium">Summaries</span>
          </a>
          <a
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-foreground/60 hover:text-primary transition-colors"
            href="#"
          >
            <User />
            <span className="text-xs font-medium">Account</span>
          </a>
        </nav>
      </footer>
    </div>
  );
}
