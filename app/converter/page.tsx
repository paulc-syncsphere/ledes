'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import FileUpload from '@/components/FileUpload';
import { LEDESParser } from '@/lib/ledes-parser';

export default function ConverterPage() {
  const [convertedContent, setConvertedContent] = useState<string>('');
  const [sourceFormat, setSourceFormat] = useState<string>('');
  const [targetFormat, setTargetFormat] = useState<'LEDES1998B' | 'LEDES98BI'>('LEDES98BI');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (content: string, filename: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const parseResult = LEDESParser.parse(content);
      setSourceFormat(parseResult.format);
      
      const converted = LEDESParser.export(parseResult.records, targetFormat);
      setConvertedContent(converted);
      setIsLoading(false);
    }, 500);
  };

  const downloadFile = () => {
    const blob = new Blob([convertedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ledes-converted-${targetFormat.toLowerCase()}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <Logo />
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                  LEDES Standards
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/parser" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Parser
              </Link>
              <Link href="/validator" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Validator
              </Link>
              <Link href="/generator" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Generator
              </Link>
              <Link href="/converter" className="text-blue-600 dark:text-blue-400 font-semibold">
                Converter
              </Link>
              <Link href="/analytics" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Analytics
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            LEDES Format Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Convert between LEDES versions and other billing formats seamlessly.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Target Format
          </h2>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setTargetFormat('LEDES1998B')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                targetFormat === 'LEDES1998B'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              LEDES 1998B
            </button>
            <button
              onClick={() => setTargetFormat('LEDES98BI')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                targetFormat === 'LEDES98BI'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              LEDES 98BI
            </button>
          </div>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Upload LEDES File
          </h2>
          <FileUpload onFileSelect={handleFileSelect} />
        </div>

        {isLoading && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Converting file format...</p>
          </div>
        )}

        {convertedContent && !isLoading && (
          <div className="space-y-6">
            {/* Conversion Summary */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg shadow-lg p-6 border-2 border-green-500">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4 text-green-600">✓</div>
                <div>
                  <h2 className="text-2xl font-bold text-green-900 dark:text-green-400">
                    Conversion Complete
                  </h2>
                  <p className="text-green-700 dark:text-green-300">
                    Successfully converted from {sourceFormat} to {targetFormat}
                  </p>
                </div>
              </div>
            </div>

            {/* Converted File */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Converted File ({targetFormat})
                </h2>
                <button
                  onClick={downloadFile}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Download File
                </button>
              </div>
              <pre className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm font-mono text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700 max-h-96">
                {convertedContent}
              </pre>
            </div>

            {/* Format Information */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-lg p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-4">
                Format Differences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">LEDES 1998B</h4>
                  <ul className="space-y-1 text-blue-900 dark:text-blue-300 text-sm">
                    <li>• Standard format with 18 fields</li>
                    <li>• Most widely supported</li>
                    <li>• Basic billing information</li>
                    <li>• Activity, task, and phase codes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">LEDES 98BI</h4>
                  <ul className="space-y-1 text-blue-900 dark:text-blue-300 text-sm">
                    <li>• Extended format with additional fields</li>
                    <li>• UTBMS code support</li>
                    <li>• Enhanced line item tracking</li>
                    <li>• More detailed billing categories</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

