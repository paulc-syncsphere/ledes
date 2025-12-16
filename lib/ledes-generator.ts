/**
 * LEDES Generator Library
 * Generates LEDES-compliant invoices from structured data
 */

import { LEDESRecord } from './ledes-parser';

export interface InvoiceInput {
  invoiceNumber: string;
  invoiceDate: Date;
  clientMatter: string;
  lawFirmMatter: string;
  invoiceDescription: string;
  lineItems: LineItemInput[];
}

export interface LineItemInput {
  date: Date;
  category: 'TIME' | 'EXPENSE';
  description: string;
  timekeeperID?: string;
  timekeeperName?: string;
  timekeeperClassification?: string;
  hours?: number;
  rate?: number;
  amount: number;
  activityCode?: string;
  taskCode?: string;
  phaseCode?: string;
}

export class LEDESGenerator {
  /**
   * Generate LEDES records from invoice input
   */
  static generate(invoice: InvoiceInput): LEDESRecord[] {
    const records: LEDESRecord[] = [];

    invoice.lineItems.forEach((item, index) => {
      const record: LEDESRecord = {
        invoiceNumber: invoice.invoiceNumber,
        invoiceDate: this.formatDate(invoice.invoiceDate),
        clientMatter: invoice.clientMatter,
        lawFirmMatter: invoice.lawFirmMatter,
        invoiceDescription: invoice.invoiceDescription,
        lineNumber: (index + 1).toString(),
        expenseDate: this.formatDate(item.date),
        expenseCategory: item.category,
        expenseDescription: item.description,
        timekeeperID: item.timekeeperID || '',
        timekeeperName: item.timekeeperName || '',
        timekeeperClassification: item.timekeeperClassification || '',
        hours: item.hours,
        rate: item.rate,
        amount: item.amount,
        activityCode: item.activityCode || '',
        taskCode: item.taskCode || '',
        phaseCode: item.phaseCode || '',
      };

      records.push(record);
    });

    return records;
  }

  /**
   * Format date as YYYYMMDD
   */
  private static formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }

  /**
   * Generate sample invoice data for testing
   */
  static generateSample(): InvoiceInput {
    const invoiceDate = new Date();
    
    return {
      invoiceNumber: 'INV-2024-001',
      invoiceDate,
      clientMatter: 'CLIENT-123',
      lawFirmMatter: 'FIRM-456',
      invoiceDescription: 'Legal Services - December 2024',
      lineItems: [
        {
          date: new Date(2024, 11, 1),
          category: 'TIME',
          description: 'Research and analysis of contract terms',
          timekeeperID: 'TK001',
          timekeeperName: 'John Smith',
          timekeeperClassification: 'Partner',
          hours: 3.5,
          rate: 500,
          amount: 1750,
          activityCode: 'L110',
          taskCode: 'A101',
          phaseCode: 'P001',
        },
        {
          date: new Date(2024, 11, 2),
          category: 'TIME',
          description: 'Draft contract amendments',
          timekeeperID: 'TK002',
          timekeeperName: 'Jane Doe',
          timekeeperClassification: 'Associate',
          hours: 5.0,
          rate: 350,
          amount: 1750,
          activityCode: 'L120',
          taskCode: 'A102',
          phaseCode: 'P001',
        },
        {
          date: new Date(2024, 11, 3),
          category: 'EXPENSE',
          description: 'Filing fees',
          amount: 450,
          activityCode: 'E110',
        },
        {
          date: new Date(2024, 11, 5),
          category: 'TIME',
          description: 'Client conference call',
          timekeeperID: 'TK001',
          timekeeperName: 'John Smith',
          timekeeperClassification: 'Partner',
          hours: 1.5,
          rate: 500,
          amount: 750,
          activityCode: 'C110',
          taskCode: 'A103',
          phaseCode: 'P002',
        },
      ],
    };
  }
}

