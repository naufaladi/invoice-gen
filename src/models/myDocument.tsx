import {Moment} from 'moment';
import {Client} from './client';
import {Fee} from './fee';
import {Vendor} from './vendor';

export type DocType = 'Invoice' | 'Kwitansi';

export interface MyDocument {
  id: string;
  description: string;
  docDate: Moment;
  docType: DocType;
  filePath: string;
  sender: Vendor;
  recipient: Client;
  fees: Fee[];
}
