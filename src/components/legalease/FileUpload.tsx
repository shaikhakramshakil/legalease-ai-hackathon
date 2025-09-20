"use client";

import { useRef, type DragEvent } from "react";
import { Button } from "@/components/ui/button";

type FileUploadProps = {
  onAnalyze: (file: File) => void;
  onUseSample: () => void;
};

const acceptedFileTypes = "application/pdf,image/jpeg,image/png,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export function FileUpload({ onAnalyze, onUseSample }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
        onAnalyze(selectedFile);
    } else {
      console.warn("No file selected.");
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-8">
      <div 
        className="relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-black/50 dark:border-white/50 rounded-2xl bg-black/5 dark:bg-white/5"
        onDragEnter={(e) => {e.preventDefault(); e.stopPropagation();}}
        onDragLeave={(e) => {e.preventDefault(); e.stopPropagation();}}
        onDragOver={(e) => {e.preventDefault(); e.stopPropagation();}}
        onDrop={handleDrop}
      >
        <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={acceptedFileTypes}
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        />
        <span className="material-symbols-outlined text-6xl text-primary dark:text-white mb-4">
          upload_file
        </span>
        <h2 className="text-xl font-bold mb-2">Upload Your Document</h2>
        <p className="text-sm text-center text-black/60 dark:text-white/60 mb-6">
          Let our AI clarify jargon, highlight risks, and provide
          easy-to-understand explanations.
        </p>
        <Button onClick={handleButtonClick} className="w-full">
            Select file to upload
        </Button>
        <p className="text-xs text-black/50 dark:text-white/50 mt-4">
          PDF, DOCX, TXT accepted
        </p>
      </div>
      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="text-sm text-gray-300">
          Don't have a document?
        </p>
        <Button variant="link" className="text-white" onClick={onUseSample}>
            Try with a Sample Document
        </Button>
      </div>
    </div>
  );
}
