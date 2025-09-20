"use client";

import { useState, useEffect } from "react";

const messages = [
  "Parsing document structure...",
  "Extracting key clauses...",
  "Analyzing for potential risks...",
  "Generating a concise summary...",
  "Cross-referencing with Indian contract norms...",
  "Finalizing your report...",
];

export function LoadingState() {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setMessage(messages[index]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh] gap-6 text-center animate-in fade-in duration-500">
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
        <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-primary animate-spin"></div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Analyzing your document
        </h2>
        <p className="text-muted-foreground transition-opacity duration-500">
          {message}
        </p>
      </div>
    </div>
  );
}
