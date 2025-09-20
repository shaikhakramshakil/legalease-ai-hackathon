"use client";

import { MainCard } from "@/components/legalease/MainCard";
import { Recents } from "@/components/legalease/Recents";
import { AppHeader } from "@/components/legalease/AppHeader";
import {
  History,
  Home as HomeIcon,
  User,
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background text-foreground">
      <div className="flex-grow">
        <AppHeader />
        <main className="px-4 pb-4">
          <MainCard />
          <Recents />
        </main>
      </div>
      <nav className="sticky bottom-0 border-t bg-background/90 backdrop-blur-sm">
        <div className="flex justify-around py-2">
          <a
            className="flex w-1/3 flex-col items-center justify-center gap-1 text-primary"
            href="#"
          >
            <HomeIcon />
            <span className="text-xs font-medium">Home</span>
          </a>
          <a
            className="flex w-1/3 flex-col items-center justify-center gap-1 text-muted-foreground"
            href="#"
          >
            <History />
            <span className="text-xs font-medium">History</span>
          </a>
          <a
            className="flex w-1/3 flex-col items-center justify-center gap-1 text-muted-foreground"
            href="#"
          >
            <User />
            <span className="text-xs font-medium">Profile</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
