'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import FileUpload from '@/components/FileUpload';
import { LEDESParser, LEDESParseResult } from '@/lib/ledes-parser';

export default function ParserPage() {
  const [parseResult, setParseResult] = useState<LEDESParseResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (content: string, filename: string) => {
    setIsLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      const result = LEDESParser.parse(content);
      setParseResult(result);
      setIsLoading(false);
    }, 500);
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
              <Link href="/parser" className="text-blue-600 dark:text-blue-400 font-semibold">
                Parser
              </Link>
              <Link href="/validator" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Validator
              </Link>
              <Link href="/generator" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Generator
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
            LEDES File Parser
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Upload and parse LEDES 1998B and 98BI files. Extract structured billing data instantly.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Upload LEDES File
          </h2>
          <FileUpload onFileSelect={handleFileSelect} />
        </div>

        {isLoading && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Parsing LEDES file...</p>
          </div>
        )}

        {parseResult && !isLoading && (
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Parse Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Format</div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {parseResult.format}
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Records</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {parseResult.recordCount}
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Amount</div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    ${parseResult.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className={`rounded-lg p-4 ${
                  parseResult.success
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : 'bg-red-50 dark:bg-red-900/20'
                }`}>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Status</div>
                  <div className={`text-2xl font-bold ${
                    parseResult.success
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {parseResult.success ? '✓ Valid' : '✗ Errors'}
                  </div>
                </div>
              </div>
            </div>

            {/* Errors */}
            {parseResult.errors.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg shadow-lg p-6 border border-red-200 dark:border-red-800">
                <h3 className="text-xl font-bold text-red-900 dark:text-red-400 mb-4">
                  Errors ({parseResult.errors.length})
                </h3>
                <ul className="space-y-2">
                  {parseResult.errors.map((error, index) => (
                    <li key={index} className="text-red-700 dark:text-red-300">
                      • {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warnings */}
            {parseResult.warnings.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg shadow-lg p-6 border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-xl font-bold text-yellow-900 dark:text-yellow-400 mb-4">
                  Warnings ({parseResult.warnings.length})
                </h3>
                <ul className="space-y-2">
                  {parseResult.warnings.map((warning, index) => (
                    <li key={index} className="text-yellow-700 dark:text-yellow-300">
                      • {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Data Table */}
            {parseResult.records.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Records ({parseResult.records.length})
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Invoice #
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Timekeeper
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Description
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Hours
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Rate
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {parseResult.records.slice(0, 50).map((record, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                            {record.invoiceNumber}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                            {record.expenseDate}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                            {record.timekeeperName || '-'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                            {record.expenseDescription.substring(0, 50)}
                            {record.expenseDescription.length > 50 ? '...' : ''}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300 text-right">
                            {record.hours?.toFixed(2) || '-'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300 text-right">
                            {record.rate ? `$${record.rate.toFixed(2)}` : '-'}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-gray-300 text-right">
                            ${record.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {parseResult.records.length > 50 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                      Showing first 50 of {parseResult.records.length} records
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

