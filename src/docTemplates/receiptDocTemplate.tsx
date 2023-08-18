import {ISectionOptions, Paragraph, TextRun, UnderlineType} from 'docx';
import {
  generateTitleAndNo,
  createLayoutingTable,
  lineBreak,
  generateSignature,
  generateClientNameAndAddress,
} from '../helper/generateComponents';
import {formatCurrency, formatDate} from '../helper/helpers';
import {MyDocument} from '../models/myDocument';

export function generateReceiptDoc(doc: MyDocument): ISectionOptions {
  const {recipient, sender} = doc;

  const latestContract = recipient.contracts.at(-1)!;

  return {
    children: [
      ...generateTitleAndNo('Kwitansi', `No. ${doc.id}`),
      lineBreak(),
      lineBreak(),
      lineBreak(),
      createLayoutingTable(
        [
          {
            label: 'Sudah Terima Dari',
            content: generateClientNameAndAddress(recipient),
          },
          {
            label: 'Uang Sejumlah',
            content: [
              formatCurrency(
                doc.fees.reduce((total, fee) => total + fee.amountIdr, 0),
              ),
              '',
            ],
          },
          {label: 'Untuk Pembayaran', content: [doc.description, '']},
          {
            label: 'Referensi',
            content: `${latestContract.name} No. ${latestContract.id}`,
          },
        ],
        26,
      ),
      lineBreak(),
      lineBreak(),
      lineBreak(),
      lineBreak(),
      new Paragraph({
        children: [
          new TextRun(
            `${sender.address.city.split(' ')[0]}, ${formatDate(
              doc.docDate.toDate(),
            )}`,
          ),
        ],
      }),
      lineBreak(),
      new Paragraph('Penerima, '),
      lineBreak(),
      lineBreak(),
      new Paragraph('     -materai-'),
      lineBreak(),
      lineBreak(),
      new Paragraph({
        children: [
          new TextRun({
            text: sender.name,
            underline: {type: UnderlineType.SINGLE},
          }),
        ],
      }),
      new Paragraph(sender.role),
    ],
  };
}
