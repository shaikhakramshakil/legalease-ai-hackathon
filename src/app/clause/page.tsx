
"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Chatbot } from "@/components/legalease/Chatbot";

export default function ClausePage() {
    return (
        <div className="flex flex-col h-screen text-foreground">
            <header className="sticky top-0 z-10 glass-card p-4 rounded-b-none">
                <div className="flex items-center">
                    <Link href="/" passHref>
                        <button className="text-foreground p-2 -ml-2">
                            <span className="material-symbols-outlined">arrow_back_ios_new</span>
                        </button>
                    </Link>
                    <div className="flex-1 text-center">
                        <h1 className="text-xl font-bold">Term and Termination</h1>
                        <p className="text-sm text-muted-foreground">Clause 2 of 5</p>
                    </div>
                    <div className="w-8"></div>
                </div>
            </header>
            <main className="flex-grow overflow-y-auto p-6 space-y-8">
                <section>
                    <h2 className="text-lg font-semibold text-foreground mb-3">Plain Language Breakdown</h2>
                    <div className="space-y-4 text-muted-foreground glass-card p-4">
                        <p>This section defines how long the agreement lasts and how it can be ended by either you or the other party.</p>
                        <ul className="list-disc list-outside space-y-2 pl-5">
                            <li><strong>Initial Term:</strong> The agreement starts on the effective date and continues for a set period (e.g., one year).</li>
                            <li><strong>Renewal:</strong> It may automatically renew for similar periods unless one party gives notice to terminate.</li>
                            <li><strong>Termination for Cause:</strong> Either party can end the agreement immediately if the other party breaches a major term.</li>
                            <li><strong>Termination for Convenience:</strong> You might be able to end the agreement for any reason, but you may need to give advance notice (e.g., 30 days).</li>
                        </ul>
                    </div>
                </section>
                <section>
                    <h2 className="text-lg font-semibold text-foreground mb-3">Why is this important?</h2>
                    <div className="glass-card p-4">
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-yellow-400 mt-1">warning</span>
                            <div>
                                <p className="text-foreground font-medium">Potential Risk</p>
                                <p className="text-muted-foreground text-sm mt-1">Pay close attention to auto-renewal clauses. You could be locked into another term if you don't provide timely notice of non-renewal. This could lead to unwanted costs.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <h2 className="text-lg font-semibold text-foreground mb-3">Example</h2>
                    <div className="border-l-2 border-foreground pl-4 glass-card p-4">
                        <p className="text-muted-foreground italic">“If this contract is not terminated by December 1st, 2024, it will automatically renew for another year. This means you will be billed for the next year unless you actively cancel.”</p>
                    </div>
                </section>
                <section>
                    <h2 className="text-lg font-semibold text-foreground mb-3">Related Clauses</h2>
                    <div className="space-y-3">
                        <a className="flex justify-between items-center glass-card p-4 hover:bg-white/10 transition-colors" href="#">
                            <div>
                                <h3 className="font-medium text-foreground">Payment Terms</h3>
                                <p className="text-sm text-muted-foreground">Termination affects final payments.</p>
                            </div>
                            <span className="material-symbols-outlined text-muted-foreground">chevron_right</span>
                        </a>
                        <a className="flex justify-between items-center glass-card p-4 hover:bg-white/10 transition-colors" href="#">
                            <div>
                                <h3 className="font-medium text-foreground">Confidentiality</h3>
                                <p className="text-sm text-muted-foreground">Obligations may continue after termination.</p>
                            </div>
                            <span className="material-symbols-outlined text-muted-foreground">chevron_right</span>
                        </a>
                    </div>
                </section>
            </main>
            <footer className="sticky bottom-0 glass-card p-4 rounded-t-none">
                 <Sheet>
                    <SheetTrigger asChild>
                        <Button className="w-full bg-primary text-primary-foreground font-bold py-4 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                            <span className="material-symbols-outlined">smart_toy</span>
                            <span>Ask AI Assistant</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-screen w-screen flex flex-col p-0 border-0" hideClose={true}>
                        <Chatbot documentText={""} />
                    </SheetContent>
                </Sheet>
            </footer>
        </div>
    );
}
