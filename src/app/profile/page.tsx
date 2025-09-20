"use client";

import {
  Settings,
  User,
  UploadCloud,
  MessageSquare,
  FileText,
  Gavel,
  ChevronRight,
  Home as HomeIcon,
  History,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-black text-white">
      <div className="flex-grow">
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
          <button className="flex h-12 w-12 items-center justify-center text-gray-400">
            <Settings className="h-6 w-6" />
          </button>
        </header>

        <main className="px-4 pb-4">
          <section className="mb-6">
            <div className="grid grid-cols-3 gap-3">
              <div className="glass-card p-3 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Docs Scanned</p>
                <p className="text-xl font-bold">142</p>
              </div>
              <div className="glass-card p-3 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Risks Identified</p>
                <p className="text-xl font-bold">89</p>
              </div>
              <div className="glass-card p-3 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Hours Saved</p>
                <p className="text-xl font-bold">35</p>
              </div>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center gap-2 py-4 px-3 rounded-lg bg-gray-800 text-white font-semibold text-sm">
                <UploadCloud className="h-8 w-8" />
                <span>Upload New</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 py-4 px-3 rounded-lg glass-card font-semibold text-sm">
                <MessageSquare className="h-8 w-8" />
                <span>Access Chatbot</span>
              </button>
            </div>
          </section>

          <section className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold">Recent Activity</h2>
              <a className="text-sm font-medium text-gray-400" href="#">
                View All
              </a>
            </div>
            <div className="space-y-3">
              <div className="glass-card p-3 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-black/20 p-2 rounded-lg">
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
              <div className="glass-card p-3 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-black/20 p-2 rounded-lg">
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
            <div className="glass-card p-4 rounded-lg">
              <div className="flex items-end h-32">
                <div className="flex-1 h-2/3 bg-muted rounded-t-sm mx-1"></div>
                <div className="flex-1 h-full bg-muted rounded-t-sm mx-1"></div>
                <div className="flex-1 h-1/2 bg-muted rounded-t-sm mx-1"></div>
                <div className="flex-1 h-3/4 bg-primary/80 rounded-t-sm mx-1"></div>
                <div className="flex-1 h-2/5 bg-muted rounded-t-sm mx-1"></div>
                <div className="flex-1 h-1/3 bg-muted rounded-t-sm mx-1"></div>
                <div className="flex-1 h-4/5 bg-muted rounded-t-sm mx-1"></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Data Privacy</span>
                <span>IP Rights</span>
                <span className="font-bold text-foreground">AI Ethics</span>
                <span>Contracts</span>
              </div>
            </div>
          </section>
        </main>
      </div>

      <nav className="sticky bottom-0 border-t border-white/10 bg-black/50 backdrop-blur-lg">
        <div className="flex justify-around py-2">
          <a
            className="flex w-1/3 flex-col items-center justify-center gap-1 text-gray-400"
            href="/"
          >
            <HomeIcon />
            <span className="text-xs font-medium">Home</span>
          </a>
          <a
            className="flex w-1/3 flex-col items-center justify-center gap-1 text-gray-400"
            href="#"
          >
            <History />
            <span className="text-xs font-medium">History</span>
          </a>
a          <a
            className="flex w-1/3 flex-col items-center justify-center gap-1 text-white"
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
