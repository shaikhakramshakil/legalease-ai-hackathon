"use client";

import Link from "next/link";
import {
    Home,
    History,
    Settings,
    LogOut,
    FileText,
    Gavel,
    School,
    MenuBook,
    Share,
    HelpCircle,
    PlusCircle
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function AppSidebar() {
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

  return (
    <div className="flex flex-col h-full bg-background text-foreground p-4 shadow-2xl">
      <div className="p-4 pb-2 flex items-center gap-4">
        {userAvatar && (
            <Image
                alt="User Avatar"
                className="h-12 w-12 rounded-full"
                src={userAvatar.imageUrl}
                width={48}
                height={48}
                data-ai-hint={userAvatar.imageHint}
            />
        )}
        <div>
          <h1 className="text-xl font-bold text-foreground">Alex Doe</h1>
          <Link href="/profile" className="text-sm text-primary">
            View Profile
          </Link>
        </div>
      </div>
      <nav className="flex flex-1 flex-col justify-between pt-4">
        <ul className="flex flex-col space-y-1">
          <li>
            <Link
              className="flex items-center gap-4 rounded-lg bg-primary/10 dark:bg-primary/20 px-4 py-3 text-primary"
              href="/"
            >
              <span className="material-symbols-outlined text-primary">home</span>
              <span className="font-bold text-sm">Home/Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-4 rounded-lg px-4 py-3 text-muted-foreground hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary"
              href="#"
            >
              <span className="material-symbols-outlined">add_circle</span>
              <span className="font-medium text-sm">Upload New Document</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-4 rounded-lg px-4 py-3 text-muted-foreground hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary"
              href="#"
            >
              <span className="material-symbols-outlined">history</span>
              <span className="font-medium text-sm">Past Summaries</span>
            </Link>
          </li>
          <li className="pt-4">
            <h2 className="px-4 text-xs font-bold uppercase text-muted-foreground">
              Legal Resources
            </h2>
          </li>
          <li>
            <Link
              className="flex items-center gap-4 rounded-lg px-4 py-3 text-muted-foreground hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary"
              href="#"
            >
              <span className="material-symbols-outlined">gavel</span>
              <span className="font-medium text-sm">Find Legal Aid</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-4 rounded-lg px-4 py-3 text-muted-foreground hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary"
              href="#"
            >
              <span className="material-symbols-outlined">school</span>
              <span className="font-medium text-sm">Educational Content</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-4 rounded-lg px-4 py-3 text-muted-foreground hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary"
              href="#"
            >
              <span className="material-symbols-outlined">menu_book</span>
              <span className="font-medium text-sm">Legal Dictionary</span>
            </Link>
          </li>
          <li className="pt-4">
            <h2 className="px-4 text-xs font-bold uppercase text-muted-foreground">
              App
            </h2>
          </li>
          <li>
            <Link
              className="flex items-center gap-4 rounded-lg px-4 py-3 text-muted-foreground hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary"
              href="#"
            >
              <span className="material-symbols-outlined">share</span>
              <span className="font-medium text-sm">Share & Invite</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-4 rounded-lg px-4 py-3 text-muted-foreground hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary"
              href="/settings"
            >
              <span className="material-symbols-outlined">settings</span>
              <span className="font-medium text-sm">Settings</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-4 rounded-lg px-4 py-3 text-muted-foreground hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary"
              href="#"
            >
              <span className="material-symbols-outlined">help</span>
              <span className="font-medium text-sm">Help & Support</span>
            </Link>
          </li>
        </ul>
        <ul className="border-t border-border pt-2">
          <li>
            <a
              className="flex items-center gap-4 rounded-lg px-4 py-3 text-muted-foreground hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary"
              href="#"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="font-medium text-sm">Log Out</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
