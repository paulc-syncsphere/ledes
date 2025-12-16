/**
 * LEDES Parser Library
 * Supports LEDES 1998B and 98BI formats
 */

export interface LEDESRecord {
  invoiceNumber: string;
  invoiceDate: string;
  clientMatter: string;
  lawFirmMatter: string;
  invoiceDescription: string;
  lineNumber: string;
  expenseDate: string;
  expenseCategory: string;
  expenseDescription: string;
  timekeeperID: string;
  timekeeperName: string;
  timekeeperClassification: string;
  hours?: number;
  rate?: number;
  amount: number;
  activityCode?: string;
  taskCode?: string;
  phaseCode?: string;
  // Additional 98BI fields
  utbmsCode?: string;
  lineItemNumber?: string;
  [key: string]: string | number | undefined;
}

export interface LEDESParseResult {
  success: boolean;
  records: LEDESRecord[];
  errors: string[];
  warnings: string[];
  format: 'LEDES1998B' | 'LEDES98BI' | 'UNKNOWN';
  totalAmount: number;
  recordCount: number;
}

export class LEDESParser {
  /**
   * Parse LEDES file content
   */
  static parse(content: string): LEDESParseResult {
    const lines = content.split(/\r?\n/).filter(line => line.trim());
    
    if (lines.length === 0) {
      return {
        success: false,
        records: [],
        errors: ['File is empty'],
        warnings: [],
        format: 'UNKNOWN',
        totalAmount: 0,
        recordCount: 0,
      };
    }

    // Detect format based on number of fields
    const firstLine = lines[0];
    const delimiter = this.detectDelimiter(firstLine);
    const fields = firstLine.split(delimiter);
    
    let format: 'LEDES1998B' | 'LEDES98BI' | 'UNKNOWN' = 'UNKNOWN';
    if (fields.length >= 18 && fields.length <= 21) {
      format = 'LEDES1998B';
    } else if (fields.length > 21) {
      format = 'LEDES98BI';
    }

    const records: LEDESRecord[] = [];
    const errors: string[] = [];
    const warnings: string[] = [];
    let totalAmount = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      try {
        const record = this.parseLine(line, delimiter, format, i + 1);
        records.push(record);
        totalAmount += record.amount || 0;
      } catch (error) {
        errors.push(`Line ${i + 1}: ${error instanceof Error ? error.message : 'Parse error'}`);
      }
    }

    return {
      success: errors.length === 0,
      records,
      errors,
      warnings,
      format,
      totalAmount,
      recordCount: records.length,
    };
  }

  /**
   * Detect delimiter (pipe or tab)
   */
  private static detectDelimiter(line: string): string {
    if (line.includes('|')) return '|';
    if (line.includes('\t')) return '\t';
    return '|'; // default
  }

  /**
   * Parse a single LEDES line
   */
  private static parseLine(
    line: string,
    delimiter: string,
    format: string,
    lineNumber: number
  ): LEDESRecord {
    const fields = line.split(delimiter);

    if (fields.length < 18) {
      throw new Error(`Insufficient fields (found ${fields.length}, expected at least 18)`);
    }

    // LEDES 1998B field mapping
    const record: LEDESRecord = {
      invoiceNumber: fields[0]?.trim() || '',
      invoiceDate: fields[1]?.trim() || '',
      clientMatter: fields[2]?.trim() || '',
      lawFirmMatter: fields[3]?.trim() || '',
      invoiceDescription: fields[4]?.trim() || '',
      lineNumber: fields[5]?.trim() || '',
      expenseDate: fields[6]?.trim() || '',
      expenseCategory: fields[7]?.trim() || '',
      expenseDescription: fields[8]?.trim() || '',
      timekeeperID: fields[9]?.trim() || '',
      timekeeperName: fields[10]?.trim() || '',
      timekeeperClassification: fields[11]?.trim() || '',
      hours: this.parseNumber(fields[12]),
      rate: this.parseNumber(fields[13]),
      amount: this.parseNumber(fields[14]) || 0,
      activityCode: fields[15]?.trim() || '',
      taskCode: fields[16]?.trim() || '',
      phaseCode: fields[17]?.trim() || '',
    };

    // Add 98BI specific fields if present
    if (format === 'LEDES98BI' && fields.length > 18) {
      record.utbmsCode = fields[18]?.trim() || '';
      record.lineItemNumber = fields[19]?.trim() || '';
    }

    return record;
  }

  /**
   * Parse numeric field
   */
  private static parseNumber(value: string | undefined): number | undefined {
    if (!value) return undefined;
    const cleaned = value.trim().replace(/[$,]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? undefined : parsed;
  }

  /**
   * Export records to LEDES format
   */
  static export(records: LEDESRecord[], format: 'LEDES1998B' | 'LEDES98BI' = 'LEDES1998B'): string {
    const delimiter = '|';
    const lines: string[] = [];

    for (const record of records) {
      const fields = [
        record.invoiceNumber,
        record.invoiceDate,
        record.clientMatter,
        record.lawFirmMatter,
        record.invoiceDescription,
        record.lineNumber,
        record.expenseDate,
        record.expenseCategory,
        record.expenseDescription,
        record.timekeeperID,
        record.timekeeperName,
        record.timekeeperClassification,
        record.hours?.toFixed(2) || '',
        record.rate?.toFixed(2) || '',
        record.amount.toFixed(2),
        record.activityCode || '',
        record.taskCode || '',
        record.phaseCode || '',
      ];

      if (format === 'LEDES98BI') {
        fields.push(record.utbmsCode || '');
        fields.push(record.lineItemNumber || '');
      }

      lines.push(fields.join(delimiter));
    }

    return lines.join('\n');
  }
}

