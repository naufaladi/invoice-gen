import {
  Paragraph,
  Table,
  WidthType,
  TableRow,
  TableCell,
  TextRun,
  AlignmentType,
} from 'docx';
import {
  generateVendorNameAndAddress,
  generateTitleAndNo,
  createLayoutingTable,
  generateClientNameAndAddress,
  lineBreak,
  generateSignature,
} from '../helper/generateComponents';
import {formatDate, formatCurrency} from '../helper/helpers';
import {Fee} from '../models/fee';
import {MyDocument} from '../models/myDocument';

export function generateInvoiceDoc(doc: MyDocument) {
  const latestContract = doc.recipient.contracts.at(-1)!;

  return {
    children: [
      ...generateVendorNameAndAddress(doc.sender),
      ...generateTitleAndNo('Invoice', `No. ${doc.id}`),
      lineBreak(),
      createLayoutingTable([
        {label: 'Tanggal', content: formatDate(doc.docDate.toDate())},
        {
          label: 'Referensi',
          content: `${latestContract.name} No. ${latestContract.id}`,
        },
      ]),
      lineBreak(),
      new Paragraph('Kepada Yth.'),
      ...generateClientNameAndAddress(doc.recipient),
      createLayoutingTable([
        {
          label: 'Keterangan',
          content: doc.description,
        },
      ]),
      lineBreak(),
      createTableRincian(doc.fees),
      lineBreak(),
      createLayoutingTable([
        {
          label: 'Jumlah Tagihan',
          content:
            'Rp. ' +
            formatCurrency(
              doc.fees.reduce((total, fee) => total + fee.amountIdr, 0),
            ),
        },
      ]),
      lineBreak(),
      new Paragraph({
        text: 'Mohon pembayaran tersebut dapat di transfer ke rekening kami pada:',
      }),
      createLayoutingTable([
        {label: 'Bank', content: doc.sender.rekening.bank},
        {label: 'No. Rekening', content: doc.sender.rekening.no},
        {label: 'Atas Nama', content: doc.sender.name},
      ]),
      lineBreak(),
      lineBreak(),
      ...generateSignature(doc.sender.role, doc.sender.name),
    ],
  };
}

function createTableRincian(fees: Fee[]) {
  let totalFee: number = 0;
  return new Table({
    margins: {left: 80, top: 30, bottom: 30, right: 80},
    width: {size: 100, type: WidthType.PERCENTAGE},
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            width: {size: 10, type: WidthType.PERCENTAGE},
            children: [
              new Paragraph({
                children: [new TextRun({text: 'No.', bold: true})],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({text: 'Bulan', bold: true})],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [new TextRun({text: 'Jumlah', bold: true})],
              }),
            ],
          }),
        ],
      }),
      ...fees.map((fee, index) => {
        totalFee += fee.amountIdr;
        return new TableRow({
          children: [
            new TableCell({children: [new Paragraph({text: `${index + 1}`})]}),
            new TableCell({children: [new Paragraph({text: fee.name})]}),
            new TableCell({
              children: [
                new Paragraph({
                  text: formatCurrency(fee.amountIdr),
                  alignment: AlignmentType.RIGHT,
                }),
              ],
            }),
          ],
        });
      }),
      // new TableRow({
      //   children: [
      //     new TableCell({children: []}),
      //     new TableCell({children: []}),
      //     new TableCell({children: []}),
      //   ],
      // }),
      new TableRow({
        children: [
          new TableCell({
            columnSpan: 2,
            children: [
              new Paragraph({
                children: [new TextRun({text: 'Total Jumlah', bold: true})],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({text: formatCurrency(totalFee), bold: true}),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
