# LEDES API Standards

A comprehensive web platform for working with Legal Electronic Data Exchange Standard (LEDES) files. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### 🔧 Core Functionality

- **Parser** - Upload and parse LEDES 1998B and 98BI files, extract structured billing data
- **Validator** - Validate LEDES files against format specifications, identify errors and warnings
- **Generator** - Generate LEDES-compliant invoices from structured data
- **Converter** - Convert between LEDES formats (1998B ↔ 98BI)
- **Analytics** - Visualize legal spend, timekeeper utilization, and billing trends
- **API Documentation** - Complete standards reference and integration guides

### 📊 Analytics & Reporting

- Total spend and hours analysis
- Timekeeper performance metrics
- Spend by category and month
- Average rate calculations
- Detailed billing breakdowns

### ✅ Validation Rules

- Required field validation
- Date format verification (YYYYMMDD)
- Numeric field validation
- Cross-field validation (hours × rate = amount)
- UTBMS code support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Custom React components
- **File Processing**: Client-side parsing and validation

## Project Structure

```
LEDES/
├── app/                    # Next.js app directory
│   ├── parser/            # LEDES file parser page
│   ├── validator/         # LEDES validator page
│   ├── generator/         # Invoice generator page
│   ├── converter/         # Format converter page
│   ├── analytics/         # Analytics dashboard
│   ├── api-docs/          # API documentation
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
│   └── FileUpload.tsx    # File upload component
├── lib/                   # Core libraries
│   ├── ledes-parser.ts   # LEDES parsing engine
│   ├── ledes-validator.ts # Validation engine
│   └── ledes-generator.ts # Invoice generator
└── public/               # Static assets

## LEDES Format Support

### LEDES 1998B
- 18 pipe-delimited fields
- Most widely adopted format
- Standard billing information

### LEDES 98BI
- Extended format with additional fields
- UTBMS code support
- Enhanced billing categories

## Usage Examples

### Parsing a LEDES File

1. Navigate to the Parser page
2. Upload a LEDES file (.txt or .csv)
3. View parsed records, totals, and any errors
4. Export results as needed

### Validating a File

1. Navigate to the Validator page
2. Upload a LEDES file
3. Review validation results
4. Fix any errors or warnings identified

### Generating an Invoice

1. Navigate to the Generator page
2. Click "Generate Sample Invoice"
3. Review the invoice data and line items
4. Download the generated LEDES file

### Converting Formats

1. Navigate to the Converter page
2. Select target format (1998B or 98BI)
3. Upload source file
4. Download converted file

### Analyzing Billing Data

1. Navigate to the Analytics page
2. Upload a LEDES file
3. View spending trends, timekeeper metrics, and category breakdowns

## Development

### Adding New Features

The codebase is organized into:
- **Pages** (`app/*`) - UI and user interactions
- **Libraries** (`lib/*`) - Core business logic
- **Components** (`components/*`) - Reusable UI elements

### Running Linter

```bash
npm run lint
```

## License

This project is proprietary software for legal billing operations.

## About LEDES

LEDES (Legal Electronic Data Exchange Standard) is the industry-standard format for electronic billing in legal services. It enables law firms to submit invoices to corporate clients in a consistent, machine-readable format.

## Support

For questions or issues, please refer to the API Documentation page within the application.

