
"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatAction } from "@/app/actions";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SheetClose } from "../ui/sheet";

type ChatbotProps = {
  documentText: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function Chatbot({ documentText }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setIsLoading(true);

    try {
      const answer = await chatAction(documentText, query);
      const assistantMessage: Message = { role: "assistant", content: answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  
  useEffect(() => {
    if(documentText) {
        setMessages([
          { role: "assistant", content: "I've reviewed your document. How can I help you understand it better?"}
        ])
    } else {
        setMessages([
          { role: "assistant", content: "Please upload a document first. Once a document is analyzed, you can ask me questions about it here."}
        ])
    }
  }, [documentText])

  return (
    <div className="flex flex-col h-full w-full bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b">
        <SheetClose asChild>
          <button className="p-2 -m-2">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
        </SheetClose>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold">AI Assistant</h1>
          <span className="text-xs text-green-500 flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Online
          </span>
        </div>
        <button className="p-2 -m-2">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </header>

      <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3 max-w-xs",
                message.role === "user" ? "self-end ml-auto" : "mr-auto"
              )}
            >
              {message.role === 'assistant' && (
                <div className="bg-primary dark:bg-white text-white dark:text-black rounded-full p-2">
                  <span className="material-symbols-outlined text-2xl">smart_toy</span>
                </div>
              )}
              <div
                className={cn(
                  "p-4 rounded-xl text-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-black/5 dark:bg-white/10 rounded-tl-none"
                )}
              >
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3 max-w-xs mr-auto">
                <div className="bg-primary dark:bg-white text-white dark:text-black rounded-full p-2">
                  <span className="material-symbols-outlined text-2xl">smart_toy</span>
                </div>
                <div className="bg-black/5 dark:bg-white/10 p-4 rounded-xl rounded-tl-none">
                    <Loader2 className="h-5 w-5 animate-spin" />
                </div>
             </div>
          )}
        </div>
      </ScrollArea>
      <footer className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            type="text"
            placeholder={!documentText ? "Upload a document to begin" : "Ask a question..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading || !documentText}
            className="flex-1 bg-black/5 dark:bg-white/10 border-transparent focus:border-primary dark:focus:border-white focus:ring-0 rounded-full py-3 px-5 h-auto"
          />
          <Button type="submit" size="icon" className="bg-primary dark:bg-white text-white dark:text-black rounded-full w-12 h-12 hover:bg-black/80 dark:hover:bg-gray-200 transition-colors shrink-0" disabled={isLoading || !query.trim()}>
            <span className="material-symbols-outlined">send</span>
          </Button>
        </form>
      </footer>
    </div>
  );
}
