import {Moment} from 'moment';
import {Contract} from './contract';
import {Person} from './person';
import {Vendor} from './vendor';
import {MyDocument} from './myDocument';

export interface Client extends Omit<Vendor, 'rekening' | 'lastBillNo'> {
  abbreviation: string;
  contracts: Contract[];
  latestPaidMonthly: Moment;
  latestBilledMonthly: Moment;
  bills: Bill[];
}

export interface Bill {
  billingDate: Moment;
  billingPeriod: Moment[];
  isPaid: boolean;
  invoiceDoc: MyDocument;
  receiptDoc: MyDocument;
}
