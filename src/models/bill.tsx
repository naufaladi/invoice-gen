import {Moment} from 'moment';

export type BillType = 'Monthly';

export interface Bill {
  id: string;
  billType: BillType;
  amount: number;
  months: Moment[];
}
