"use client";

import { useState, useRef, type DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, FileText } from "lucide-react";

type FileUploadProps = {
  onAnalyze: (file: File) => void;
  onUseSample: () => void;
};

const acceptedFileTypes = "application/pdf,image/jpeg,image/png";

export function FileUpload({ onAnalyze, onUseSample }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile && acceptedFileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      // Optional: show a toast for invalid file type
      console.warn("Invalid file type selected.");
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (file) {
      onAnalyze(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center animate-in fade-in duration-500">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Upload Your Legal Document
          </CardTitle>
          <CardDescription>
            Get an AI-powered summary and risk analysis in seconds. Supports
            PDF, JPG, PNG.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className={`relative flex flex-col items-center justify-center w-full p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors
              ${isDragging ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleButtonClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept={acceptedFileTypes}
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            />
            {file ? (
              <div className="flex flex-col items-center gap-2 text-primary">
                <FileText className="w-12 h-12" />
                <span className="font-medium">{file.name}</span>
                <span className="text-sm text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <UploadCloud className="w-12 h-12" />
                <p className="font-medium">
                  Drag & drop your file here or{" "}
                  <span className="text-primary">browse</span>
                </p>
                <p className="text-xs">Max file size: 10MB</p>
              </div>
            )}
          </div>

          {file ? (
            <div className="flex flex-col gap-2">
              <Button onClick={handleSubmit} size="lg">Analyze Document</Button>
              <Button variant="ghost" onClick={() => setFile(null)}>Clear Selection</Button>
            </div>
          ) : (
             <div className="flex flex-col items-center gap-2">
                 <p className="text-sm text-muted-foreground">
                    Don't have a document?
                </p>
                <Button variant="outline" onClick={onUseSample}>
                    Try with a Sample Document
                </Button>
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
