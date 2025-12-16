'use client';

import { useState } from 'react';

interface FileUploadProps {
  onFileSelect: (content: string, filename: string) => void;
  accept?: string;
}

export default function FileUpload({ onFileSelect, accept = '.txt,.csv' }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setSelectedFile(file.name);
    const content = await file.text();
    onFileSelect(content, file.name);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-300 dark:border-gray-600'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="mb-4">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="mb-4">
        <label htmlFor="file-upload" className="cursor-pointer">
          <span className="text-blue-600 dark:text-blue-400 hover:underline">
            Click to upload
          </span>
          <span className="text-gray-600 dark:text-gray-400"> or drag and drop</span>
        </label>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          accept={accept}
          onChange={handleFileInput}
        />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        LEDES files (.txt, .csv)
      </p>
      {selectedFile && (
        <div className="mt-4 text-sm text-green-600 dark:text-green-400">
          ✓ {selectedFile}
        </div>
      )}
    </div>
  );
}

