
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, CircleAlert, Search, Mic, FileText, BadgeCheck, ShieldAlert } from 'lucide-react';

const summaries = [
  {
    id: 1,
    title: 'Lease Agreement for 123 Elm Street',
    date: 'June 15, 2024',
    risk: 'medium',
    type: 'Contract',
    description: 'This lease agreement outlines the terms for renting the property at 123 Elm Street, including rent, duration, and responsibilities.'
  },
  {
    id: 2,
    title: 'Non-Disclosure Agreement (NDA)',
    date: 'May 28, 2024',
    risk: 'low',
    type: 'Contract',
    description: 'This NDA protects confidential information shared between parties, ensuring it remains private and not disclosed to third parties.'
  },
  {
    id: 3,
    title: 'Employment Contract for Sarah Chen',
    date: 'April 10, 2024',
    risk: 'high',
    type: 'Contract',
    description: 'This contract details the terms of employment for Sarah Chen, including her role, salary, benefits, and termination conditions.'
  },
  {
    id: 4,
    title: 'Software_Licensing_Agreement.txt',
    date: '2 weeks ago',
    risk: 'low',
    type: 'Contract',
    description: 'A standard software licensing agreement.'
  },
  {
    id: 5,
    title: 'Old_Lease_Agreement_2022.pdf',
    date: '1 month ago',
    risk: 'medium',
    type: 'Lease',
    description: 'An older lease agreement from 2022.'
  },
];

const riskConfig = {
  low: { icon: BadgeCheck, label: 'Low Risk', color: 'text-green-500 bg-green-500/10' },
  medium: { icon: CircleAlert, label: 'Medium Risk', color: 'text-yellow-500 bg-yellow-500/10' },
  high: { icon: ShieldAlert, label: 'High Risk', color: 'text-red-500 bg-red-500/10' },
};

type SortOption = "Newest" | "Oldest" | "Relevance";

export default function SummariesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>("Newest");

  // Filtering logic can be expanded later
  const filteredSummaries = summaries
    .filter(summary =>
      summary.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    // Sorting logic can be implemented here based on sortOption
    

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center p-4">
          <Link href="/" passHref>
            <Button variant="ghost" size="icon" className="-ml-2">
                <ArrowLeft />
            </Button>
          </Link>
          <h1 className="text-lg font-bold text-center flex-1">Summaries</h1>
          <div className="w-8"></div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4">
        <div className="py-3">
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                    placeholder="Search summaries"
                    type="search"
                    className="w-full rounded-full border-transparent bg-accent pl-10 pr-10 py-3 h-auto"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <Mic className="h-5 w-5 text-muted-foreground" />
                </div>
            </div>
        </div>

        <div className="flex gap-2 py-3 overflow-x-auto" style={{scrollbarWidth: 'none'}}>
            <Button variant="outline" className="rounded-full shrink-0 border-accent bg-accent hover:bg-accent/80">
                <span>Document Type</span>
                <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="outline" className="rounded-full shrink-0 border-accent bg-accent hover:bg-accent/80">
                <span>Date</span>
                <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="outline" className="rounded-full shrink-0 border-accent bg-accent hover:bg-accent/80">
                <span>Risk Level</span>
                <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
        </div>

        <div className="flex items-center justify-between py-4">
            <h2 className="text-base font-bold">Sort by</h2>
            <div className="flex gap-2">
                {(["Newest", "Oldest", "Relevance"] as SortOption[]).map(option => (
                    <Button 
                        key={option}
                        variant={sortOption === option ? 'default' : 'secondary'} 
                        size="sm"
                        className="rounded-full px-3 py-1 text-sm"
                        onClick={() => setSortOption(option)}
                    >
                        {option}
                    </Button>
                ))}
            </div>
        </div>

        <div className="space-y-4 pb-24">
          {filteredSummaries.map(summary => {
            const config = riskConfig[summary.risk as keyof typeof riskConfig];
            const Icon = config.icon;
            return (
              <Link href="/" key={summary.id} className="block">
                <div className="bg-accent p-4 rounded-xl flex flex-col gap-3 transition-colors hover:bg-accent/80">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-base text-foreground pr-4">{summary.title}</h3>
                        <span className={`flex items-center gap-1 text-sm font-medium px-2 py-0.5 rounded-full ${config.color}`}>
                            <Icon className="h-4 w-4" />
                            <span>{config.label}</span>
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{summary.description}</p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{summary.type}</span>
                        <span>{summary.date}</span>
                    </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border">
        <nav className="flex justify-around py-2">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">home</span>
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link
            href="/summaries"
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-primary"
          >
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>description</span>
            <span className="text-xs font-medium">Summaries</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="text-xs font-medium">Account</span>
          </Link>
        </nav>
      </footer>
    </div>
  );
}
