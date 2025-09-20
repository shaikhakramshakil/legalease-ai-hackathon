
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/summaries", icon: "description", label: "Summaries" },
  { href: "/profile", icon: "person", label: "Account" },
];

export function AppFooter() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 glass-card rounded-t-none z-50">
      <nav className="flex justify-around p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg text-muted-foreground transition-colors duration-300 w-24 relative",
                isActive ? "text-primary" : "hover:text-primary"
              )}
            >
              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full border border-primary/20"></div>
                </div>
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
    </footer>
  );
}
