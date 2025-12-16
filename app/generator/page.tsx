'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import { LEDESGenerator, InvoiceInput } from '@/lib/ledes-generator';
import { LEDESParser } from '@/lib/ledes-parser';

export default function GeneratorPage() {
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [invoiceData, setInvoiceData] = useState<InvoiceInput | null>(null);

  const generateSample = () => {
    const sample = LEDESGenerator.generateSample();
    const records = LEDESGenerator.generate(sample);
    const content = LEDESParser.export(records, 'LEDES1998B');
    
    setInvoiceData(sample);
    setGeneratedContent(content);
  };

  const downloadFile = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ledes-invoice-${Date.now()}.txt`;
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
              <Link href="/generator" className="text-blue-600 dark:text-blue-400 font-semibold">
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
            LEDES Invoice Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Generate LEDES-compliant invoices from structured data. Export in LEDES 1998B format.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Generate Sample Invoice
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Click the button below to generate a sample LEDES invoice with realistic data.
          </p>
          <button
            onClick={generateSample}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Generate Sample Invoice
          </button>
        </div>

        {invoiceData && generatedContent && (
          <div className="space-y-6">
            {/* Invoice Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Invoice Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Invoice Number</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {invoiceData.invoiceNumber}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Invoice Date</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {invoiceData.invoiceDate.toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Client Matter</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {invoiceData.clientMatter}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Law Firm Matter</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {invoiceData.lawFirmMatter}
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400">Description</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {invoiceData.invoiceDescription}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Line Items ({invoiceData.lineItems.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Category
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
                    {invoiceData.lineItems.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                          {item.date.toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                          {item.category}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                          {item.timekeeperName || '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                          {item.description}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300 text-right">
                          {item.hours?.toFixed(2) || '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300 text-right">
                          {item.rate ? `$${item.rate.toFixed(2)}` : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-gray-300 text-right">
                          ${item.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <td colSpan={6} className="px-4 py-3 text-right font-bold text-gray-900 dark:text-white">
                        Total:
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-gray-900 dark:text-white">
                        ${invoiceData.lineItems.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Generated LEDES File */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Generated LEDES File
                </h2>
                <button
                  onClick={downloadFile}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Download File
                </button>
              </div>
              <pre className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm font-mono text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                {generatedContent}
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

