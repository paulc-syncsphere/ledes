import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                LEDES Standards
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/parser"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Parser
              </Link>
              <Link
                href="/validator"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Validator
              </Link>
              <Link
                href="/generator"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Generator
              </Link>
              <Link
                href="/analytics"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Analytics
              </Link>
              <Link
                href="/api-docs"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                API Docs
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Legal Electronic Data Exchange Standard
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Critical infrastructure for legal billing data. Parse, validate, generate, and analyze LEDES files with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Parser Card */}
          <Link
            href="/parser"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">📄</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Parse LEDES Files
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Upload and parse LEDES 1998B, 98BI, and other formats. Extract structured billing data instantly.
            </p>
          </Link>

          {/* Validator Card */}
          <Link
            href="/validator"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="text-green-600 dark:text-green-400 text-4xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Validate Standards
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Ensure LEDES files comply with format specifications. Identify errors and inconsistencies.
            </p>
          </Link>

          {/* Generator Card */}
          <Link
            href="/generator"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="text-purple-600 dark:text-purple-400 text-4xl mb-4">⚙️</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Generate Invoices
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create LEDES-compliant invoices from structured data. Export in multiple formats.
            </p>
          </Link>

          {/* Converter Card */}
          <Link
            href="/converter"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="text-orange-600 dark:text-orange-400 text-4xl mb-4">🔄</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Format Converter
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Convert between LEDES versions and other billing formats seamlessly.
            </p>
          </Link>

          {/* Analytics Card */}
          <Link
            href="/analytics"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="text-red-600 dark:text-red-400 text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Analytics Dashboard
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Visualize legal spend, matter costs, timekeeper utilization, and billing trends.
            </p>
          </Link>

          {/* API Docs Card */}
          <Link
            href="/api-docs"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="text-indigo-600 dark:text-indigo-400 text-4xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              API Documentation
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Complete API reference, standards documentation, and integration guides.
            </p>
          </Link>
        </div>

        <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 border border-blue-200 dark:border-blue-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            About LEDES Standards
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Legal Electronic Data Exchange Standard (LEDES) is the industry-standard format for electronic billing 
              in legal services. LEDES enables law firms to submit invoices to corporate clients in a consistent, 
              machine-readable format.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              This platform provides critical infrastructure for working with LEDES data: parsing files, validating 
              compliance, generating invoices, converting between formats, and analyzing legal spend patterns.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © 2024 LEDES API Standards. Built for legal professionals.
          </p>
        </div>
      </footer>
    </div>
  );
}

