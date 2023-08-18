import {Moment} from 'moment';

export interface Contract {
  id: string;
  name: string;
  monthlyFee: number;
  dateStart: Moment;
  dateEnd: Moment;
}
