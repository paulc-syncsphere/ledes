'use client';

import { useState } from 'react';
import Link from 'next/link';
import FileUpload from '@/components/FileUpload';
import { LEDESParser } from '@/lib/ledes-parser';
import { LEDESValidator, ValidationResult } from '@/lib/ledes-validator';

export default function ValidatorPage() {
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (content: string, filename: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const parseResult = LEDESParser.parse(content);
      const validation = LEDESValidator.validate(parseResult.records);
      setValidationResult(validation);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                LEDES Standards
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/parser" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Parser
              </Link>
              <Link href="/validator" className="text-blue-600 dark:text-blue-400 font-semibold">
                Validator
              </Link>
              <Link href="/generator" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Generator
              </Link>
              <Link href="/analytics" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Analytics
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            LEDES Validator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Validate LEDES files against format specifications. Identify errors and inconsistencies.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Upload LEDES File for Validation
          </h2>
          <FileUpload onFileSelect={handleFileSelect} />
        </div>

        {isLoading && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Validating LEDES file...</p>
          </div>
        )}

        {validationResult && !isLoading && (
          <div className="space-y-6">
            {/* Summary Card */}
            <div className={`rounded-lg shadow-lg p-6 ${
              validationResult.isValid
                ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500'
                : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-500'
            }`}>
              <div className="flex items-center mb-4">
                <div className={`text-4xl mr-4 ${
                  validationResult.isValid ? 'text-green-600' : 'text-red-600'
                }`}>
                  {validationResult.isValid ? '✓' : '✗'}
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${
                    validationResult.isValid
                      ? 'text-green-900 dark:text-green-400'
                      : 'text-red-900 dark:text-red-400'
                  }`}>
                    {validationResult.isValid ? 'File is Valid' : 'Validation Failed'}
                  </h2>
                  <p className={`${
                    validationResult.isValid
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-red-700 dark:text-red-300'
                  }`}>
                    {validationResult.isValid
                      ? 'All records passed validation checks'
                      : 'Some records contain errors that must be fixed'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Records</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {validationResult.summary.totalRecords}
                  </div>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Valid Records</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {validationResult.summary.validRecords}
                  </div>
                </div>
                <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Errors</div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {validationResult.summary.errorCount}
                  </div>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Warnings</div>
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {validationResult.summary.warningCount}
                  </div>
                </div>
              </div>
            </div>

            {/* Errors */}
            {validationResult.errors.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg shadow-lg p-6 border border-red-200 dark:border-red-800">
                <h3 className="text-xl font-bold text-red-900 dark:text-red-400 mb-4">
                  Errors ({validationResult.errors.length})
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-red-200 dark:divide-red-800">
                    <thead className="bg-red-100 dark:bg-red-900/30">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-red-900 dark:text-red-400 uppercase">
                          Line
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-red-900 dark:text-red-400 uppercase">
                          Field
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-red-900 dark:text-red-400 uppercase">
                          Message
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-red-200 dark:divide-red-800">
                      {validationResult.errors.map((error, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm text-red-900 dark:text-red-300">
                            {error.line}
                          </td>
                          <td className="px-4 py-3 text-sm font-mono text-red-900 dark:text-red-300">
                            {error.field}
                          </td>
                          <td className="px-4 py-3 text-sm text-red-900 dark:text-red-300">
                            {error.message}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Warnings */}
            {validationResult.warnings.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg shadow-lg p-6 border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-xl font-bold text-yellow-900 dark:text-yellow-400 mb-4">
                  Warnings ({validationResult.warnings.length})
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-yellow-200 dark:divide-yellow-800">
                    <thead className="bg-yellow-100 dark:bg-yellow-900/30">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-yellow-900 dark:text-yellow-400 uppercase">
                          Line
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-yellow-900 dark:text-yellow-400 uppercase">
                          Field
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-yellow-900 dark:text-yellow-400 uppercase">
                          Message
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-yellow-200 dark:divide-yellow-800">
                      {validationResult.warnings.slice(0, 50).map((warning, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm text-yellow-900 dark:text-yellow-300">
                            {warning.line}
                          </td>
                          <td className="px-4 py-3 text-sm font-mono text-yellow-900 dark:text-yellow-300">
                            {warning.field}
                          </td>
                          <td className="px-4 py-3 text-sm text-yellow-900 dark:text-yellow-300">
                            {warning.message}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {validationResult.warnings.length > 50 && (
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-4 text-center">
                      Showing first 50 of {validationResult.warnings.length} warnings
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Validation Rules Reference */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-lg p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-4">
                LEDES Validation Rules
              </h3>
              <ul className="space-y-2 text-blue-900 dark:text-blue-300">
                <li>• <strong>Invoice Number:</strong> Required field</li>
                <li>• <strong>Invoice Date:</strong> Required, must be in YYYYMMDD format</li>
                <li>• <strong>Expense Date:</strong> Required, must be in YYYYMMDD format</li>
                <li>• <strong>Amount:</strong> Required, must be a valid number</li>
                <li>• <strong>Hours:</strong> Must be non-negative if present</li>
                <li>• <strong>Rate:</strong> Must be non-negative if present</li>
                <li>• <strong>Calculation Check:</strong> Hours × Rate should equal Amount</li>
                <li>• <strong>Timekeeper:</strong> Should be present for time entries</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

