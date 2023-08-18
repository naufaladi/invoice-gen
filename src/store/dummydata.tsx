import moment from 'moment';
import {Client} from '../models/client';
import {Fee} from '../models/fee';
import {Vendor} from '../models/vendor';

export const vendors: Vendor[] = [
  {
    id: 'v1',
    name: 'Adi Nurtjipto',
    role: 'Konsultan Asuransi',
    lastBillNo: 25,
    reps: [
      {
        gender: 'male',
        name: 'Adi Nurtjipto',
        email: 'adinurtjipto@yahoo.com',
      },
    ],
    phone: '081219745390',
    rekening: {
      bank: 'Bank Mandiri KCP Gedung Aneka Tambang',
      atasNama: 'Adi Nurtjipto',
      no: '129-0006669192',
    },
    address: {
      street: 'Jl. Bantarjati No.89, RT06/RW02',
      subdistrict: 'Setu',
      district: 'Cipayung',
      city: 'Jakarta Timur',
      postcode: '13880',
      province: 'DKI Jakarta',
      country: 'Indonesia',
    },
  },
];

export const clients: Client[] = [
  {
    id: 'c1',
    name: 'PT. Megah Surya Pertiwi',
    abbreviation: 'MSP',
    role: 'Nickel & Smelting',
    reps: [
      {
        name: 'Ghali Amayama',
        gender: 'female',
        email: 'ghaliamayama@gmail.com',
      },
    ],
    phone: '081219745390',
    address: {
      detail: 'Panin Bank Building Lt. 5',
      street: 'Jl. Jend. Sudirman No.1',
      subdistrict: 'Gelora',
      district: 'Tanah Abang',
      city: 'Jakarta Selatan',
      postcode: '10270',
      province: 'DKI Jakarta',
      country: 'Indonesia',
    },
    latestBilledMonthly: moment({year: 2023, month: 1, date: 10}),
    latestPaidMonthly: moment({year: 2022, month: 8, date: 10}),
    bills: [],
    contracts: [
      {
        id: '005/MSP/ANJ/IX/2022 Adendum IX',
        name: 'Perjanjian Kerjasama Jasa Konsultan Asuransi',
        monthlyFee: 15000000,
        dateStart: moment({year: 2022, month: 4, date: 10}),
        dateEnd: moment({year: 2024, month: 4, date: 10}),
      },
    ],
  },
  {
    id: 'c2',
    name: 'PT. Halmahera Jaya Feronikel',
    abbreviation: 'HJF',
    role: 'Nickel & Smelting',
    reps: [
      {
        name: 'Stefani Lim',
        gender: 'female',
        email: 'test@gmail.com',
      },
      {
        name: 'Theresia Liawanta',
        gender: 'female',
        email: 'test@gmail.com',
      },
    ],
    phone: '081219745390',
    address: {
      detail: 'Panin Bank Building Lt. 3',
      street: 'Jl. Jend. Sudirman No.1',
      subdistrict: 'Gelora',
      district: 'Tanah Abang',
      city: 'Jakarta Selatan',
      postcode: '10270',
      province: 'DKI Jakarta',
      country: 'Indonesia',
    },
    latestBilledMonthly: moment({year: 2022, month: 4, date: 10}),
    latestPaidMonthly: moment({year: 2022, month: 1, date: 1}),
    bills: [],
    contracts: [
      {
        id: 'HJF20210804-241-ADD3',
        name: 'Perjanjian Kerjasama Jasa Konsultan Asuransi',
        monthlyFee: 15000000,
        dateStart: moment({year: 2022, month: 4, date: 1}),
        dateEnd: moment({year: 2023, month: 4, date: 1}),
      },
    ],
  },
  {
    id: 'c3',
    name: 'PT. Halmahera Persada Lygend',
    abbreviation: 'HPAL',
    role: 'Nickel & Smelting',
    reps: [
      {
        name: 'Stefani Lim',
        gender: 'female',
        email: 'test@gmail.com',
      },
      {
        name: 'Nita Arifin',
        gender: 'female',
        email: 'test@gmail.com',
      },
    ],
    phone: '081219745390',
    address: {
      detail: 'Panin Bank Building Lt. 3',
      street: 'Jl. Jend. Sudirman No.1',
      subdistrict: 'Gelora',
      district: 'Tanah Abang',
      city: 'Jakarta Selatan',
      postcode: '10270',
      province: 'DKI Jakarta',
      country: 'Indonesia',
    },
    latestBilledMonthly: moment({year: 2022, month: 4, date: 10}),
    latestPaidMonthly: moment({year: 2022, month: 1, date: 1}),
    bills: [],
    contracts: [
      {
        id: 'HPL20190722-1047ADD7',
        name: 'Perjanjian Kerjasama Jasa Konsultan Asuransi',
        monthlyFee: 15000000,
        dateStart: moment({year: 2022, month: 4, date: 1}),
        dateEnd: moment({year: 2023, month: 4, date: 1}),
      },
    ],
  },
];

export const fees: Fee[] = [
  {
    name: 'Januari 2023',
    amountIdr: clients[0].contracts.at(-1)!.monthlyFee,
    date: moment({year: 2023, month: 0, date: 1}),
  },
  {
    name: 'Februari 2023',
    amountIdr: clients[0].contracts.at(-1)!.monthlyFee,
    date: moment({year: 2023, month: 1, date: 1}),
  },
  {
    name: 'Maret 2023',
    amountIdr: clients[0].contracts.at(-1)!.monthlyFee,
    date: moment({year: 2023, month: 2, date: 1}),
  },
];
