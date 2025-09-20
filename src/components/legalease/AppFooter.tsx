
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useRef, type ChangeEvent } from "react";

const navItemsLeft = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/summaries", icon: "description", label: "Summaries" },
];

const navItemsRight = [
    { href: "/notifications", icon: "notifications", label: "Updates" },
    { href: "/profile", icon: "person", label: "Account" },
];

type AppFooterProps = {
  onFileSelect: (file: File) => void;
};

export function AppFooter({ onFileSelect }: AppFooterProps) {
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCenterButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
    // Reset file input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  return (
    <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="application/pdf,image/jpeg,image/png,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />
        <div className="glass-card rounded-full p-2">
            <nav className="flex items-center gap-2">
                {navItemsLeft.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "flex flex-col items-center justify-center gap-1 h-16 w-20 rounded-full text-muted-foreground transition-all duration-300 relative",
                        isActive && "transform scale-110 -translate-y-1"
                    )}
                    >
                    {isActive && (
                        <div className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm"></div>
                    )}
                    <div className="relative z-10 flex flex-col items-center gap-1">
                        <span
                        className={cn("material-symbols-outlined", isActive && "text-primary")}
                        style={{ fontVariationSettings: isActive ? "'FILL' 1" : "" }}
                        >
                        {item.icon}
                        </span>
                        <span className={cn("text-xs font-medium", isActive && "text-primary")}>{item.label}</span>
                    </div>
                    </Link>
                );
                })}

                <Button variant="default" size="icon" className="w-16 h-16 rounded-full shadow-lg" onClick={handleCenterButtonClick}>
                    <span className="material-symbols-outlined text-3xl">add</span>
                </Button>

                {navItemsRight.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "flex flex-col items-center justify-center gap-1 h-16 w-20 rounded-full text-muted-foreground transition-all duration-300 relative",
                         isActive && "transform scale-110 -translate-y-1"
                    )}
                    >
                    {isActive && (
                        <div className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm"></div>
                    )}
                    <div className="relative z-10 flex flex-col items-center gap-1">
                        <span
                        className={cn("material-symbols-outlined", isActive && "text-primary")}
                        style={{ fontVariationSettings: isActive ? "'FILL' 1" : "" }}
                        >
                        {item.icon}
                        </span>
                        <span className={cn("text-xs font-medium", isActive && "text-primary")}>{item.label}</span>
                    </div>
                    </Link>
                );
                })}
            </nav>
        </div>
    </footer>
  );
}
