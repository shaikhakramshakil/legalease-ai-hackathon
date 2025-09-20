import { Scale, Sparkles } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
        <Scale className="w-5 h-5" />
      </div>
      <span className="text-xl font-bold font-headline tracking-tight">
        Legalease AI
      </span>
    </div>
  );
}
