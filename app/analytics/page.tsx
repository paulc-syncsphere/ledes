'use client';

import { useState } from 'react';
import Link from 'next/link';
import FileUpload from '@/components/FileUpload';
import { LEDESParser, LEDESParseResult } from '@/lib/ledes-parser';

interface Analytics {
  totalAmount: number;
  totalHours: number;
  averageRate: number;
  recordsByCategory: { [key: string]: number };
  recordsByTimekeeper: { [key: string]: { count: number; amount: number; hours: number } };
  amountByMonth: { [key: string]: number };
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [parseResult, setParseResult] = useState<LEDESParseResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateAnalytics = (result: LEDESParseResult): Analytics => {
    const analytics: Analytics = {
      totalAmount: result.totalAmount,
      totalHours: 0,
      averageRate: 0,
      recordsByCategory: {},
      recordsByTimekeeper: {},
      amountByMonth: {},
    };

    let totalRateSum = 0;
    let rateCount = 0;

    result.records.forEach((record) => {
      // Hours
      if (record.hours) {
        analytics.totalHours += record.hours;
      }

      // Rate
      if (record.rate) {
        totalRateSum += record.rate;
        rateCount++;
      }

      // Category
      const category = record.expenseCategory || 'UNKNOWN';
      analytics.recordsByCategory[category] = (analytics.recordsByCategory[category] || 0) + 1;

      // Timekeeper
      if (record.timekeeperName) {
        if (!analytics.recordsByTimekeeper[record.timekeeperName]) {
          analytics.recordsByTimekeeper[record.timekeeperName] = {
            count: 0,
            amount: 0,
            hours: 0,
          };
        }
        analytics.recordsByTimekeeper[record.timekeeperName].count++;
        analytics.recordsByTimekeeper[record.timekeeperName].amount += record.amount;
        if (record.hours) {
          analytics.recordsByTimekeeper[record.timekeeperName].hours += record.hours;
        }
      }

      // Month
      if (record.expenseDate && record.expenseDate.length >= 6) {
        const month = record.expenseDate.substring(0, 6); // YYYYMM
        analytics.amountByMonth[month] = (analytics.amountByMonth[month] || 0) + record.amount;
      }
    });

    analytics.averageRate = rateCount > 0 ? totalRateSum / rateCount : 0;

    return analytics;
  };

  const handleFileSelect = async (content: string, filename: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const result = LEDESParser.parse(content);
      setParseResult(result);
      
      const analytics = calculateAnalytics(result);
      setAnalytics(analytics);
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
              <Link href="/validator" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Validator
              </Link>
              <Link href="/generator" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Generator
              </Link>
              <Link href="/analytics" className="text-blue-600 dark:text-blue-400 font-semibold">
                Analytics
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Legal Spend Analytics
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Visualize legal spend, matter costs, timekeeper utilization, and billing trends.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Upload LEDES File for Analysis
          </h2>
          <FileUpload onFileSelect={handleFileSelect} />
        </div>

        {isLoading && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Analyzing billing data...</p>
          </div>
        )}

        {analytics && parseResult && !isLoading && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Amount</div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ${analytics.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Hours</div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {analytics.totalHours.toLocaleString('en-US', { minimumFractionDigits: 1 })}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Avg Rate</div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  ${analytics.averageRate.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Records</div>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {parseResult.recordCount}
                </div>
              </div>
            </div>

            {/* By Category */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Records by Category
              </h2>
              <div className="space-y-3">
                {Object.entries(analytics.recordsByCategory)
                  .sort(([, a], [, b]) => b - a)
                  .map(([category, count]) => (
                    <div key={category} className="flex items-center">
                      <div className="w-32 text-sm font-semibold text-gray-900 dark:text-white">
                        {category}
                      </div>
                      <div className="flex-1 ml-4">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative">
                          <div
                            className="bg-blue-600 dark:bg-blue-400 rounded-full h-6 flex items-center justify-end pr-2"
                            style={{
                              width: `${(count / parseResult.recordCount) * 100}%`,
                              minWidth: '30px',
                            }}
                          >
                            <span className="text-xs font-semibold text-white">{count}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* By Timekeeper */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Timekeeper Summary
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Timekeeper
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Entries
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Hours
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Avg Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {Object.entries(analytics.recordsByTimekeeper)
                      .sort(([, a], [, b]) => b.amount - a.amount)
                      .map(([name, data]) => (
                        <tr key={name} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                            {name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300 text-right">
                            {data.count}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300 text-right">
                            {data.hours.toFixed(1)}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white text-right">
                            ${data.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300 text-right">
                            ${data.hours > 0 ? (data.amount / data.hours).toFixed(2) : '0.00'}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* By Month */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Spend by Month
              </h2>
              <div className="space-y-3">
                {Object.entries(analytics.amountByMonth)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([month, amount]) => {
                    const year = month.substring(0, 4);
                    const monthNum = month.substring(4, 6);
                    const monthName = new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    });
                    
                    return (
                      <div key={month} className="flex items-center">
                        <div className="w-40 text-sm font-semibold text-gray-900 dark:text-white">
                          {monthName}
                        </div>
                        <div className="flex-1 ml-4">
                          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative">
                            <div
                              className="bg-green-600 dark:bg-green-400 rounded-full h-6 flex items-center justify-end pr-2"
                              style={{
                                width: `${(amount / analytics.totalAmount) * 100}%`,
                                minWidth: '60px',
                              }}
                            >
                              <span className="text-xs font-semibold text-white">
                                ${amount.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

