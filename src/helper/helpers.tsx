import {Client} from '../models/client';
import {DocType} from '../models/myDocument';

export function formatCurrency(amount: number): string {
  let formattedAmount = amount.toLocaleString('id');
  formattedAmount += ',-';
  return formattedAmount;
}

export function formatDate(date: Date): string {
  // let dt = date.toLocaleDateString('id', {day: '2-digit'});
  let dt = date.getDate();
  let mt = date.toLocaleDateString('id', {month: 'long'});
  let yr = date.getFullYear();
  let formattedDate = `${dt} ${mt} ${yr}`;
  return formattedDate;
}

export function generateFileName(
  date: Date,
  docType: DocType,
  recipientName: Client['name'],
) {}

export function monthToRoman(month: number): string {
  let roman = '';

  switch (month) {
    case 1:
      roman = 'I';
      break;
    case 2:
      roman = 'II';
      break;
    case 3:
      roman = 'III';
      break;
    case 4:
      roman = 'IV';
      break;
    case 5:
      roman = 'V';
      break;
    case 6:
      roman = 'VI';
      break;
    case 7:
      roman = 'VII';
      break;
    case 8:
      roman = 'IIX';
      break;
    case 9:
      roman = 'IX';
      break;
    case 10:
      roman = 'X';
      break;
    case 11:
      roman = 'XI';
      break;
    case 12:
      roman = 'XII';
      break;
    default:
      break;
  }

  return roman;
}
