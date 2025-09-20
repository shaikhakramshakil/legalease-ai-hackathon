
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

const summaries = [
  {
    id: 1,
    title: 'Rental_Agreement_Final.pdf',
    date: '2 days ago',
    risk: 'low',
    type: 'Lease',
  },
  {
    id: 2,
    title: 'NDA_Project_Phoenix.docx',
    date: '5 days ago',
    risk: 'medium',
    type: 'NDA',
  },
  {
    id: 3,
    title: 'Freelance_Contract_v2.pdf',
    date: '1 week ago',
    risk: 'high',
    type: 'Contract',
  },
  {
    id: 4,
    title: 'Software_Licensing_Agreement.txt',
    date: '2 weeks ago',
    risk: 'low',
    type: 'Contract',
  },
  {
    id: 5,
    title: 'Old_Lease_Agreement_2022.pdf',
    date: '1 month ago',
    risk: 'medium',
    type: 'Lease',
  },
];

const riskConfig = {
  low: { icon: 'check_circle', color: 'text-green-500' },
  medium: { icon: 'warning', color: 'text-yellow-500' },
  high: { icon: 'cancel', color: 'text-red-500' },
};

export default function SummariesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const filteredSummaries = summaries
    .filter(summary =>
      summary.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(summary =>
      activeTab === 'All' ? true : summary.type === activeTab
    );

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b p-4">
        <div className="flex items-center gap-4">
          <Link href="/" passHref>
            <Button variant="ghost" size="icon" className="-ml-2">
                <span className="material-symbols-outlined">arrow_back_ios_new</span>
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Document Summaries</h1>
        </div>
        <div className="relative mt-4">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">search</span>
            <Input
                placeholder="Search documents..."
                className="w-full bg-accent border-transparent pl-10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="mt-4">
             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-accent">
                    <TabsTrigger value="All">All</TabsTrigger>
                    <TabsTrigger value="NDA">NDA</TabsTrigger>
                    <TabsTrigger value="Lease">Lease</TabsTrigger>
                    <TabsTrigger value="Contract">Contract</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {filteredSummaries.map(summary => {
            const config = riskConfig[summary.risk as keyof typeof riskConfig];
            return (
              <Link href="/" key={summary.id} className="block">
                <div className="flex items-center p-3 bg-accent rounded-xl hover:bg-accent/80 transition-colors">
                    <span className={`material-symbols-outlined text-3xl mr-4 ${config.color}`}>
                        {config.icon}
                    </span>
                    <div className="flex-1">
                        <p className="font-medium text-foreground">{summary.title}</p>

                        <p className="text-xs text-muted-foreground">
                            Analyzed {summary.date}
                        </p>
                    </div>
                    <span className="material-symbols-outlined text-muted-foreground">chevron_right</span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <footer className="bg-background border-t sticky bottom-0">
        <nav className="flex justify-around p-2">
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
            <span className="material-symbols-outlined">description</span>
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
