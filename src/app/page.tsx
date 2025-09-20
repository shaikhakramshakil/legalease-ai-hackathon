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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AppHeader } from "@/components/legalease/AppHeader";

export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-black text-white">
      <div className="flex-grow">
        <AppHeader />
        <main className="px-4 pb-24">
          {/* Upload Document Section */}
          <section className="mb-8">
            <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/30 bg-transparent p-8 text-center">
              <FileUp className="mb-4 h-12 w-12 text-white" />
              <h2 className="text-xl font-bold">Upload Your Document</h2>
              <p className="mb-6 text-sm text-white/60">
                Let our AI clarify jargon, highlight risks, and provide
                easy-to-understand explanations.
              </p>
              <Button className="w-full rounded-full bg-white py-6 text-base font-bold text-black transition-colors hover:bg-gray-200">
                Select file to upload
              </Button>
              <p className="mt-4 text-xs text-white/50">
                PDF, DOCX, TXT accepted
              </p>
            </div>
          </section>

          {/* Templates Section */}
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-semibold">
              Or start with a template
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <button className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-900/70 p-4 transition-colors hover:bg-gray-800">
                <Landmark className="h-6 w-6" />
                <span className="text-sm font-medium">NDA</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-900/70 p-4 transition-colors hover:bg-gray-800">
                <FileText className="h-6 w-6" />
                <span className="text-sm font-medium">Lease</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-900/70 p-4 transition-colors hover:bg-gray-800">
                <Briefcase className="h-6 w-6" />
                <span className="text-sm font-medium">Contract</span>
              </button>
            </div>
          </section>

          {/* Analysis in Progress Section */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Analysis in Progress</h3>
              <span className="text-sm font-medium text-white/60">1/1</span>
            </div>
            <div className="glass-card flex items-center gap-4 rounded-xl p-4">
              <FileText className="h-6 w-6 flex-shrink-0" />
              <div className="w-full">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">
                    Employment_Contract_v3.docx
                  </span>
                  <span className="font-bold">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>
          </section>

          {/* Recent Documents Section */}
          <section>
            <h3 className="text-lg font-semibold">Recent Documents</h3>
            {/* Recent documents list will go here */}
          </section>
        </main>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-6 z-20">
        <Button
          size="icon"
          className="h-16 w-16 rounded-full bg-white text-black shadow-lg transition-transform hover:scale-105 hover:bg-gray-200"
        >
          <MessageSquare className="h-8 w-8" />
        </Button>
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