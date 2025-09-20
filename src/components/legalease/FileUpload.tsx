"use client";

import { useState, useRef, type DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

type FileUploadProps = {
  onAnalyze: (file: File) => void;
  onUseSample: () => void;
};

const acceptedFileTypes = "application/pdf,image/jpeg,image/png";

export function FileUpload({ onAnalyze, onUseSample }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile && acceptedFileTypes.includes(selectedFile.type)) {
      onAnalyze(selectedFile);
    } else {
      console.warn("Invalid file type selected.");
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
    <>
      <h2 className="text-white text-3xl font-bold text-center mb-10">Drag & drop your files</h2>
      <div 
        className="flex flex-col items-center gap-6 rounded-3xl border border-white/20 bg-white/10 px-6 py-20 shadow-lg backdrop-blur-sm"
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
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
              <UploadCloud className="text-white h-10 w-10" />
          </div>
          <p className="text-white text-lg font-semibold">Drop files here</p>
          <p className="text-gray-300 text-sm">or select from your device</p>
        </div>
        <button 
            onClick={handleButtonClick}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-white text-[var(--primary-800)] text-base font-bold shadow-md transition-all hover:bg-gray-100"
        >
            <span className="truncate">Upload Document</span>
        </button>
      </div>
      <div className="mt-8 flex flex-col items-center gap-2">
            <p className="text-sm text-gray-300">
            Don't have a document?
        </p>
        <Button variant="link" className="text-white" onClick={onUseSample}>
            Try with a Sample Document
        </Button>
      </div>
    </>
  );
}
