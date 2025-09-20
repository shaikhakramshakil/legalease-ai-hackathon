
"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import { ArrowLeft, ChevronDown, CircleAlert, Search, Mic, FileText, BadgeCheck, ShieldAlert } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const summaries = [
  {
    id: 1,
    title: 'Lease Agreement for 123 Elm Street',
    date: '2024-06-15',
    risk: 'medium',
    type: 'Lease',
    description: 'This lease agreement outlines the terms for renting the property at 123 Elm Street, including rent, duration, and responsibilities.'
  },
  {
    id: 2,
    title: 'Non-Disclosure Agreement (NDA)',
    date: '2024-05-28',
    risk: 'low',
    type: 'NDA',
    description: 'This NDA protects confidential information shared between parties, ensuring it remains private and not disclosed to third parties.'
  },
  {
    id: 3,
    title: 'Employment Contract for Sarah Chen',
    date: '2024-04-10',
    risk: 'high',
    type: 'Contract',
    description: 'This contract details the terms of employment for Sarah Chen, including her role, salary, benefits, and termination conditions.'
  },
  {
    id: 4,
    title: 'Software_Licensing_Agreement.txt',
    date: '2024-07-01',
    risk: 'low',
    type: 'Contract',
    description: 'A standard software licensing agreement.'
  },
  {
    id: 5,
    title: 'Old_Lease_Agreement_2022.pdf',
    date: '2022-01-15',
    risk: 'medium',
    type: 'Lease',
    description: 'An older lease agreement from 2022.'
  },
];

const riskConfig = {
  low: { icon: BadgeCheck, label: 'Low Risk', color: 'text-green-500 bg-green-500/10 border-green-500/20' },
  medium: { icon: CircleAlert, label: 'Medium Risk', color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' },
  high: { icon: ShieldAlert, label: 'High Risk', color: 'text-red-500 bg-red-500/10 border-red-500/20' },
};

type RiskLevel = 'low' | 'medium' | 'high';
const ALL_RISK_LEVELS: RiskLevel[] = ['low', 'medium', 'high'];
const ALL_DOC_TYPES = [...new Set(summaries.map(s => s.type))];

type SortOption = "Newest" | "Oldest" | "Relevance";

export default function SummariesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>("Newest");
  const [selectedRiskLevels, setSelectedRiskLevels] = useState<RiskLevel[]>(ALL_RISK_LEVELS);
  const [selectedDocTypes, setSelectedDocTypes] = useState<string[]>(ALL_DOC_TYPES);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();


  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window)) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            toast({
                title: "Voice Search Error",
                description: "Microphone access was denied. Please enable it in your browser settings.",
                variant: "destructive"
            })
        }
        setIsListening(false);
      };
      
      recognition.onend = () => {
          setIsListening(false);
      }

      recognitionRef.current = recognition;
    }
  }, [toast]);

  const handleMicClick = () => {
    if (!recognitionRef.current) {
        toast({
            title: "Browser Not Supported",
            description: "Voice search is not supported on this browser.",
            variant: "destructive"
        })
        return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };


  const toggleRiskLevel = (riskLevel: RiskLevel) => {
    setSelectedRiskLevels(prev => 
      prev.includes(riskLevel) 
        ? prev.filter(r => r !== riskLevel)
        : [...prev, riskLevel]
    );
  };
  
  const toggleDocType = (docType: string) => {
    setSelectedDocTypes(prev =>
      prev.includes(docType)
        ? prev.filter(t => t !== docType)
        : [...prev, docType]
    );
  };


  const filteredSummaries = summaries
    .filter(summary =>
      summary.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      selectedRiskLevels.includes(summary.risk as RiskLevel) &&
      selectedDocTypes.includes(summary.type)
    )
    .sort((a, b) => {
        if (sortOption === 'Newest') {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (sortOption === 'Oldest') {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        // Add relevance logic if needed
        return 0;
    });

  const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
      });
  }

  return (
    <div className="flex flex-col h-screen text-foreground">
      <header className="sticky top-0 z-10 glass-card rounded-b-none">
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

      <main className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="py-3">
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                    placeholder="Search summaries"
                    type="search"
                    className="w-full rounded-full border-transparent glass-card pl-10 pr-10 py-3 h-auto"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button onClick={handleMicClick} className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Mic className={`h-5 w-5 transition-colors ${isListening ? 'text-primary' : 'text-muted-foreground'}`} />
                </button>
            </div>
        </div>

        <div className="flex gap-2 py-3 overflow-x-auto" style={{scrollbarWidth: 'none'}}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full shrink-0 glass-card hover:bg-white/20">
                        <span>Document Type</span>
                        <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {ALL_DOC_TYPES.map(type => (
                        <DropdownMenuCheckboxItem
                            key={type}
                            checked={selectedDocTypes.includes(type)}
                            onCheckedChange={() => toggleDocType(type)}
                        >
                            {type}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full shrink-0 glass-card hover:bg-white/20" disabled>
                        <span>Date</span>
                        <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                </DropdownMenuTrigger>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full shrink-0 glass-card hover:bg-white/20">
                        <span>Risk Level</span>
                        <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by Risk</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {ALL_RISK_LEVELS.map(level => (
                         <DropdownMenuCheckboxItem
                            key={level}
                            checked={selectedRiskLevels.includes(level)}
                            onCheckedChange={() => toggleRiskLevel(level)}
                        >
                            <span className="capitalize">{level}</span>
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
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

        <div className="space-y-4">
          {filteredSummaries.map(summary => {
            const config = riskConfig[summary.risk as keyof typeof riskConfig];
            const Icon = config.icon;
            return (
              <Link href="/" key={summary.id} className="block">
                <div className="glass-card p-4 rounded-xl flex flex-col gap-3 transition-colors hover:bg-white/20">
                    <h3 className="font-bold text-base text-foreground pr-4">{summary.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{summary.description}</p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t border-white/10">
                        <div className="flex items-center gap-4">
                            <span>{summary.type}</span>
                            <span>{formatDate(summary.date)}</span>
                        </div>
                        <span className={`flex items-center justify-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full border ${config.color}`}>
                            <Icon className="h-3.5 w-3.5" />
                            <span>{config.label}</span>
                        </span>
                    </div>
                </div>
              </Link>
            );
          })}
           {filteredSummaries.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No summaries match your filters.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 glass-card rounded-t-none">
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
