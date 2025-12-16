/**
 * LEDES Validator Library
 * Validates LEDES files against format specifications
 */

import { LEDESRecord } from './ledes-parser';

export interface ValidationError {
  line: number;
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  summary: {
    totalRecords: number;
    validRecords: number;
    errorCount: number;
    warningCount: number;
  };
}

export class LEDESValidator {
  /**
   * Validate LEDES records
   */
  static validate(records: LEDESRecord[]): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];
    let validRecords = 0;

    records.forEach((record, index) => {
      const lineNumber = index + 1;
      let hasErrors = false;

      // Required field validation
      if (!record.invoiceNumber) {
        errors.push({
          line: lineNumber,
          field: 'invoiceNumber',
          message: 'Invoice number is required',
          severity: 'error',
        });
        hasErrors = true;
      }

      if (!record.invoiceDate) {
        errors.push({
          line: lineNumber,
          field: 'invoiceDate',
          message: 'Invoice date is required',
          severity: 'error',
        });
        hasErrors = true;
      } else if (!this.isValidDate(record.invoiceDate)) {
        errors.push({
          line: lineNumber,
          field: 'invoiceDate',
          message: 'Invalid date format (expected YYYYMMDD)',
          severity: 'error',
        });
        hasErrors = true;
      }

      if (!record.clientMatter) {
        warnings.push({
          line: lineNumber,
          field: 'clientMatter',
          message: 'Client matter ID is missing',
          severity: 'warning',
        });
      }

      if (!record.expenseDate) {
        errors.push({
          line: lineNumber,
          field: 'expenseDate',
          message: 'Expense date is required',
          severity: 'error',
        });
        hasErrors = true;
      } else if (!this.isValidDate(record.expenseDate)) {
        errors.push({
          line: lineNumber,
          field: 'expenseDate',
          message: 'Invalid date format (expected YYYYMMDD)',
          severity: 'error',
        });
        hasErrors = true;
      }

      // Amount validation
      if (record.amount === undefined || record.amount === null) {
        errors.push({
          line: lineNumber,
          field: 'amount',
          message: 'Amount is required',
          severity: 'error',
        });
        hasErrors = true;
      } else if (record.amount < 0) {
        warnings.push({
          line: lineNumber,
          field: 'amount',
          message: 'Negative amount detected',
          severity: 'warning',
        });
      } else if (record.amount === 0) {
        warnings.push({
          line: lineNumber,
          field: 'amount',
          message: 'Zero amount detected',
          severity: 'warning',
        });
      }

      // Hours and rate validation
      if (record.hours !== undefined && record.hours < 0) {
        errors.push({
          line: lineNumber,
          field: 'hours',
          message: 'Hours cannot be negative',
          severity: 'error',
        });
        hasErrors = true;
      }

      if (record.rate !== undefined && record.rate < 0) {
        errors.push({
          line: lineNumber,
          field: 'rate',
          message: 'Rate cannot be negative',
          severity: 'error',
        });
        hasErrors = true;
      }

      // Cross-field validation
      if (record.hours && record.rate) {
        const calculatedAmount = record.hours * record.rate;
        const difference = Math.abs(calculatedAmount - record.amount);
        if (difference > 0.01) {
          warnings.push({
            line: lineNumber,
            field: 'amount',
            message: `Amount mismatch: ${record.hours} × ${record.rate} = ${calculatedAmount.toFixed(2)}, but amount is ${record.amount.toFixed(2)}`,
            severity: 'warning',
          });
        }
      }

      // Timekeeper validation
      if (record.hours && record.hours > 0 && !record.timekeeperID) {
        warnings.push({
          line: lineNumber,
          field: 'timekeeperID',
          message: 'Timekeeper ID missing for time entry',
          severity: 'warning',
        });
      }

      if (!hasErrors) {
        validRecords++;
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      summary: {
        totalRecords: records.length,
        validRecords,
        errorCount: errors.length,
        warningCount: warnings.length,
      },
    };
  }

  /**
   * Validate date format (YYYYMMDD)
   */
  private static isValidDate(dateStr: string): boolean {
    if (!/^\d{8}$/.test(dateStr)) return false;

    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6));
    const day = parseInt(dateStr.substring(6, 8));

    if (year < 1900 || year > 2100) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;

    // Basic month/day validation
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    if (month === 2 && isLeapYear) {
      return day <= 29;
    }
    return day <= daysInMonth[month - 1];
  }
}

