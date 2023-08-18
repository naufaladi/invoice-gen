import {Moment} from 'moment';

export interface Fee {
  name: string;
  date: Moment;
  amountIdr: number;
}
