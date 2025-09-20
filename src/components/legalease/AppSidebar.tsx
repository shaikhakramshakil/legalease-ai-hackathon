"use client";

import Link from "next/link";
import { Home, History, User, Settings, LogOut, FileText } from "lucide-react";
import { Button } from "../ui/button";

export function AppSidebar() {
  return (
    <div className="flex flex-col h-full bg-background border-r">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Welcome</p>
            <h1 className="text-lg font-bold">Alex</h1>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/" passHref>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Button>
        </Link>
        <Link href="#" passHref>
           <Button variant="ghost" className="w-full justify-start gap-3">
            <History className="w-5 h-5" />
            <span>History</span>
          </Button>
        </Link>
        <Link href="/profile" passHref>
           <Button variant="ghost" className="w-full justify-start gap-3">
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Button>
        </Link>
        <div className="px-3 pt-4 pb-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent</h3>
        </div>
         <Link href="#" passHref>
           <Button variant="ghost" className="w-full justify-start gap-3 font-normal text-muted-foreground">
            <FileText className="w-5 h-5" />
            <span className="truncate">Rental_Agreement_Final.pdf</span>
          </Button>
        </Link>
         <Link href="#" passHref>
           <Button variant="ghost" className="w-full justify-start gap-3 font-normal text-muted-foreground">
            <FileText className="w-5 h-5" />
            <span className="truncate">Freelance_Gig_Terms.txt</span>
          </Button>
        </Link>
      </nav>
      <div className="p-4 border-t mt-auto">
         <Button variant="ghost" className="w-full justify-start gap-3">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Button>
        <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:text-red-500 hover:bg-red-500/10">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}
