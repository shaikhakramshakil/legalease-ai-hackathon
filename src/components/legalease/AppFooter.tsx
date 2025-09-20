
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const navItemsLeft = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/summaries", icon: "description", label: "Summaries" },
];

const navItemsRight = [
    { href: "/notifications", icon: "notifications", label: "Updates" },
    { href: "/profile", icon: "person", label: "Account" },
];

export function AppFooter() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
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
                        isActive ? "text-primary" : "hover:text-primary"
                    )}
                    >
                    {isActive && (
                        <div className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20"></div>
                    )}
                    <div className="relative z-10 flex flex-col items-center gap-1">
                        <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: isActive ? "'FILL' 1" : "" }}
                        >
                        {item.icon}
                        </span>
                        <span className="text-xs font-medium">{item.label}</span>
                    </div>
                    </Link>
                );
                })}

                <Link href="/" passHref>
                    <Button variant="default" size="icon" className="w-16 h-16 rounded-full shadow-lg -translate-y-2.5">
                        <span className="material-symbols-outlined text-3xl">add</span>
                    </Button>
                </Link>

                {navItemsRight.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "flex flex-col items-center justify-center gap-1 h-16 w-20 rounded-full text-muted-foreground transition-all duration-300 relative",
                        isActive ? "text-primary" : "hover:text-primary"
                    )}
                    >
                    {isActive && (
                        <div className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20"></div>
                    )}
                    <div className="relative z-10 flex flex-col items-center gap-1">
                        <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: isActive ? "'FILL' 1" : "" }}
                        >
                        {item.icon}
                        </span>
                        <span className="text-xs font-medium">{item.label}</span>
                    </div>
                    </Link>
                );
                })}
            </nav>
        </div>
    </footer>
  );
}
