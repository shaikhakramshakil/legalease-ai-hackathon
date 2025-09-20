"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatAction } from "@/app/actions";
import { Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="flex flex-col h-full w-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-end gap-2",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl p-3 text-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-muted-foreground rounded-bl-none"
                )}
              >
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex items-end gap-2 justify-start">
                <div className="max-w-[75%] rounded-2xl p-3 text-sm bg-muted text-muted-foreground rounded-bl-none">
                    <Loader2 className="h-5 w-5 animate-spin" />
                </div>
             </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            type="text"
            placeholder={!documentText ? "Upload a document to begin" : "Ask a question..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading || !documentText}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !query.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
