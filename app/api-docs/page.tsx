import Link from 'next/link';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';

export default function APIDocsPage() {
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
              <Link href="/analytics" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Analytics
              </Link>
              <Link href="/api-docs" className="text-blue-600 dark:text-blue-400 font-semibold">
                API Docs
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            LEDES® Standards Documentation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Complete reference for Legal Electronic Data Exchange Standard formats and specifications.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Official standards maintained by <a href="https://ledes.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">LEDES Oversight Committee</a>
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <a
            href="#formats"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              📄 LEDES Formats
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed specifications for LEDES 1998B and 98BI formats
            </p>
          </a>
          <a
            href="#fields"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              📋 Field Reference
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Complete field definitions and data types
            </p>
          </a>
          <a
            href="#codes"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              🏷️ Code Tables
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              UTBMS activity, task, and expense codes
            </p>
          </a>
        </div>

        {/* LEDES Formats */}
        <div id="formats" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            LEDES Formats
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                LEDES 98B Format
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The LEDES 98B format (commonly called LEDES 1998B) is the most widely adopted standard for legal e-billing. 
                It consists of 18 pipe-delimited fields and is globally recognized as the industry-specific EDI standard 
                for legal billing information exchange.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                <div className="text-gray-900 dark:text-gray-300">
                  INVOICE_NUMBER|INVOICE_DATE|CLIENT_MATTER_ID|LAW_FIRM_MATTER_ID|INVOICE_DESCRIPTION|
                  LINE_ITEM_NUMBER|EXP/FEE/INV_ADJ_DATE|EXP/FEE/INV_ADJ_TYPE|
                  EXP/FEE/INV_ADJ_DESCRIPTION|TIMEKEEPER_ID|TIMEKEEPER_NAME|
                  TIMEKEEPER_CLASSIFICATION|HOURS|RATE|AMOUNT|ACTIVITY_CODE|TASK_CODE|PHASE_CODE
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                <a href="https://ledes.org/ledes-98b-format/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  View official LEDES 98B specification →
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                LEDES 98BI Format
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                LEDES 98BI extends the 98B format with additional fields for enhanced billing detail and UTBMS code support.
                This format accommodates more complex billing scenarios and alternate fee arrangements.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300">
                Includes all LEDES 98B fields plus:
                <ul className="list-disc list-inside mt-2 ml-4">
                  <li>UTBMS Code (Uniform Task-Based Management System)</li>
                  <li>Line Item Adjustment Number</li>
                  <li>Additional expense categorization</li>
                  <li>Enhanced support for alternate fee arrangements</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                <a href="https://ledes.org/ledes-98bi-format/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  View official LEDES 98BI specification →
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                Other LEDES Formats
              </h3>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <div>
                  <strong className="text-blue-600 dark:text-blue-400">LEDES 2000:</strong> Enhanced format with additional functionality
                </div>
                <div>
                  <strong className="text-blue-600 dark:text-blue-400">LEDES XML Ebilling (v2.0, v2.1, v2.2):</strong> XML-based formats for modern systems
                </div>
                <div>
                  <strong className="text-blue-600 dark:text-blue-400">LEDES XML Budgeting:</strong> Schema for legal budget exchange
                </div>
                <div>
                  <strong className="text-blue-600 dark:text-blue-400">LEDES XML Timekeeper Attributes:</strong> Format for timekeeper information
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                <a href="https://ledes.org/ledes-standards/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  View all LEDES standards →
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Field Reference */}
        <div id="fields" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Field Reference
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Field Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Required
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { name: 'Invoice Number', type: 'String', required: 'Yes', desc: 'Unique invoice identifier' },
                  { name: 'Invoice Date', type: 'Date (YYYYMMDD)', required: 'Yes', desc: 'Date invoice was created' },
                  { name: 'Client Matter ID', type: 'String', required: 'Yes', desc: 'Client\'s matter number' },
                  { name: 'Law Firm Matter ID', type: 'String', required: 'No', desc: 'Law firm\'s internal matter number' },
                  { name: 'Invoice Description', type: 'String', required: 'No', desc: 'Description of invoice' },
                  { name: 'Line Item Number', type: 'Integer', required: 'Yes', desc: 'Sequential line item number' },
                  { name: 'Expense Date', type: 'Date (YYYYMMDD)', required: 'Yes', desc: 'Date expense was incurred' },
                  { name: 'Expense Type', type: 'String', required: 'Yes', desc: 'TIME, EXPENSE, or ADJUSTMENT' },
                  { name: 'Expense Description', type: 'String', required: 'Yes', desc: 'Description of work performed' },
                  { name: 'Timekeeper ID', type: 'String', required: 'No', desc: 'Unique timekeeper identifier' },
                  { name: 'Timekeeper Name', type: 'String', required: 'No', desc: 'Name of timekeeper' },
                  { name: 'Timekeeper Classification', type: 'String', required: 'No', desc: 'Partner, Associate, Paralegal, etc.' },
                  { name: 'Hours', type: 'Decimal', required: 'No', desc: 'Number of hours worked' },
                  { name: 'Rate', type: 'Decimal', required: 'No', desc: 'Hourly billing rate' },
                  { name: 'Amount', type: 'Decimal', required: 'Yes', desc: 'Line item amount' },
                  { name: 'Activity Code', type: 'String', required: 'No', desc: 'UTBMS activity code' },
                  { name: 'Task Code', type: 'String', required: 'No', desc: 'UTBMS task code' },
                  { name: 'Phase Code', type: 'String', required: 'No', desc: 'Matter phase code' },
                ].map((field, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                      {field.name}
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-gray-300">
                      {field.type}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                      {field.required === 'Yes' ? (
                        <span className="text-red-600 dark:text-red-400 font-semibold">Yes</span>
                      ) : (
                        <span className="text-gray-500">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                      {field.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Code Tables */}
        <div id="codes" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            UTBMS Code Tables
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                LOC Activity Codes (Revised 2013)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                UTBMS (Uniform Task-Based Management System) activity codes standardize billing descriptions. 
                The LOC maintains and updates these codes, which are used worldwide in legal billing.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {[
                  { code: 'L110', desc: 'Case Assessment, Development and Administration' },
                  { code: 'L120', desc: 'Fact Investigation/Development' },
                  { code: 'L130', desc: 'Legal Research and Analysis' },
                  { code: 'L140', desc: 'Document and File Management' },
                  { code: 'L210', desc: 'Pleadings' },
                  { code: 'L310', desc: 'Discovery' },
                  { code: 'L320', desc: 'Depositions' },
                  { code: 'L410', desc: 'Motions' },
                  { code: 'L510', desc: 'Trial Preparation and Support' },
                  { code: 'L610', desc: 'Appeals' },
                  { code: 'C110', desc: 'Communication with Client' },
                  { code: 'E110', desc: 'Court/Agency Fees' },
                ].map((item) => (
                  <div key={item.code} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="font-mono font-bold text-blue-600 dark:text-blue-400">
                      {item.code}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <a href="https://ledes.org/loc-revised-activity-codes-2013/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  View complete LOC Activity Codes (2013) →
                </a> | 
                <a href="https://utbms.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline ml-2">
                  Visit UTBMS.com →
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                LOC Expense Codes (Revised 2013)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Standardized expense codes for legal billing, maintained by the LEDES Oversight Committee.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-gray-700 dark:text-gray-300">
                <ul className="space-y-2">
                  <li><span className="font-mono font-bold text-blue-600 dark:text-blue-400">E101</span> - Filing and Service Fees</li>
                  <li><span className="font-mono font-bold text-blue-600 dark:text-blue-400">E102</span> - Witness and Deposition Fees</li>
                  <li><span className="font-mono font-bold text-blue-600 dark:text-blue-400">E103</span> - Court Reporter Fees</li>
                  <li><span className="font-mono font-bold text-blue-600 dark:text-blue-400">E104</span> - Expert Fees</li>
                  <li><span className="font-mono font-bold text-blue-600 dark:text-blue-400">E105</span> - Investigation Fees</li>
                  <li><span className="font-mono font-bold text-blue-600 dark:text-blue-400">E106</span> - Consultant Fees</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                <a href="https://ledes.org/loc-revised-expense-codes-2013/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  View complete LOC Expense Codes (2013) →
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                LOC Timekeeper Classification Codes (Revised 2014)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Standardized codes for classifying legal professionals in billing data.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-gray-700 dark:text-gray-300">
                <ul className="space-y-2">
                  <li><span className="font-mono font-bold text-blue-600 dark:text-blue-400">PTR</span> - Partner</li>
                  <li><span className="font-mono font-bold text-blue-600 dark:text-blue-400">ASC</span> - Associate</li>
                  <li><span className="font-mono font-bold text-blue-600 dark:text-blue-400">CON</span> - Counsel</li>
                  <li><span className="font-mono font-bold text-blue-600 dark:text-blue-400">PRL</span> - Paralegal</li>
                  <li><span className="font-mono font-bold text-blue-600 dark:text-blue-400">LAW</span> - Law Clerk</li>
                  <li><span className="font-mono font-bold text-blue-600 dark:text-blue-400">OTH</span> - Other Professional</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                <a href="https://ledes.org/loc-revised-timekeeper-classification-codes-2014/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  View complete Timekeeper Classification Codes (2014) →
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* LEDES API */}
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg shadow-lg p-8 border border-purple-200 dark:border-purple-800 mb-8">
          <h2 className="text-3xl font-bold text-purple-900 dark:text-purple-400 mb-6">
            LEDES API v1 (2020)
          </h2>
          <div className="prose dark:prose-invert max-w-none text-purple-900 dark:text-purple-300">
            <p className="mb-4">
              The LEDES API provides a standardized RESTful interface for exchanging legal billing data between systems. 
              The API follows modern REST principles and supports JSON data exchange.
            </p>
            <p className="mb-4">
              <strong>Key Features:</strong>
            </p>
            <ul className="space-y-2 ml-4 list-disc mb-4">
              <li>RESTful endpoints for invoice submission and retrieval</li>
              <li>JSON-based data exchange</li>
              <li>OAuth 2.0 authentication</li>
              <li>Webhook notifications for invoice status updates</li>
              <li>Support for all LEDES formats (98B, 98BI, 2000, XML)</li>
            </ul>
            <p className="text-sm">
              <a href="https://ledes.org/ledes-api/" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline font-semibold">
                View complete LEDES API documentation →
              </a>
            </p>
          </div>
        </div>

        {/* Integration Guide */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-lg p-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-400 mb-6">
            Integration Guide
          </h2>
          <div className="prose dark:prose-invert max-w-none text-blue-900 dark:text-blue-300">
            <h3 className="text-xl font-bold mb-3">Getting Started</h3>
            <ol className="space-y-2 ml-4 list-decimal">
              <li>Review the LEDES format specification above</li>
              <li>Determine which format best suits your needs (see <a href="https://ledes.org/which-format-should-i-use/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">format selection guide</a>)</li>
              <li>Prepare your billing data in the correct field order</li>
              <li>Use pipe (|) as the field delimiter for text formats</li>
              <li>Format dates as YYYYMMDD</li>
              <li>Include appropriate UTBMS codes from <a href="https://utbms.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">UTBMS.com</a></li>
              <li>Validate your files using the Validator tool on this site</li>
            </ol>

            <h3 className="text-xl font-bold mt-6 mb-3">Best Practices</h3>
            <ul className="space-y-2 ml-4 list-disc">
              <li>Always validate files before submission to clients</li>
              <li>Use consistent timekeeper IDs across invoices</li>
              <li>Include UTBMS activity and expense codes for better billing transparency</li>
              <li>Ensure hours × rate = amount for time entries</li>
              <li>Keep descriptions clear and professional</li>
              <li>Follow LOC's 5 principles: simplicity, clarity, consistency, feasibility, and mutual benefit</li>
              <li>Consider global eInvoicing requirements for international matters</li>
              <li>Document alternate fee arrangements clearly in invoice data</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3">Additional Resources</h3>
            <ul className="space-y-2 ml-4 list-disc">
              <li><a href="https://ledes.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">LEDES.org</a> - Official standards and documentation</li>
              <li><a href="https://utbms.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">UTBMS.com</a> - Complete UTBMS code reference</li>
              <li><a href="https://ledes.org/ledes-error-codes/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">LEDES Error Codes</a> - Standardized error reporting</li>
              <li><a href="https://ledes.org/vendor-marketplace/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Vendor Marketplace</a> - Certified LEDES software providers</li>
            </ul>
          </div>
        </div>

        {/* Footer Notice */}
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
          <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
            LEDES® is a registered service mark of the LEDES Oversight Committee. 
            This site is an independent tool for working with LEDES data. 
            For official standards, visit <a href="https://ledes.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">LEDES.org</a>
          </p>
        </div>
      </main>
    </div>
  );
}

