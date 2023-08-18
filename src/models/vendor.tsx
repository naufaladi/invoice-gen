import {Person} from './person';

export interface Vendor {
  id: string;
  name: string;
  role: string;
  lastBillNo: number;
  reps?: Person[]; // representatives
  rekening: {
    bank: string;
    atasNama: string;
    no: string;
  };
  phone: string;
  address: {
    detail?: string;
    street: string;
    subdistrict: string;
    district: string;
    city: string;
    province: string;
    postcode: string;
    country: string; // if sender.country == recipient.country, don't print
  };
}
