import {
  AlignmentType,
  BorderStyle,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  UnderlineType,
  WidthType,
} from 'docx';
import {Client} from '../models/client';
import {Vendor} from '../models/vendor';
import {DocType} from '../models/myDocument';
import {Text} from 'react-native';

export function generateClientNameAndAddress(data: Client) {
  let ups: string = '';

  data.reps?.map((rep, idx) => {
    ups += `${rep.gender == 'male' ? 'Pak' : 'Ibu'} ${rep.name}`;
    if (idx + 1 < data.reps!.length) {
      ups += ' dan '; // TODO better concatenation for 3 or more representatives.
    }
  });

  function getAddressDetail() {
    if (data.address.detail) {
      return `${data.address.detail}, `;
    } else {
      return '';
    }
  }

  return [
    new Paragraph({
      children: [new TextRun({text: `${data.name}`, bold: true})],
    }),
    new Paragraph({
      text: getAddressDetail() + data.address.street,
    }),
    new Paragraph({
      text: `${data.address.subdistrict}, ${data.address.district}, ${data.address.city}, ${data.address.postcode}`,
    }),
    new Paragraph(`U.P. ${ups}`),
    lineBreak(),
  ];
}

export function generateVendorNameAndAddress(data: Vendor) {
  return [
    new Paragraph({
      text: `${data.name}`,
    }),
    new Paragraph({text: data.role}),
    new Paragraph({text: `${data.address.street}`}),
    new Paragraph({
      text: `${data.address.subdistrict}, ${data.address.district}, ${data.address.city}`,
    }),
    new Paragraph(`${data.address.province}, ${data.address.postcode}`),
    lineBreak(),
  ];
}

export function lineBreak() {
  return new Paragraph({});
}

export function generateSignature(role: string, name: string) {
  return [
    new Paragraph({text: role}),
    lineBreak(),
    lineBreak(),
    lineBreak(),
    lineBreak(),
    new Paragraph({text: name}),
  ];
}

export function generateTitleAndNo(docType: DocType, docNo: string) {
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: docType.toUpperCase(),
          bold: true,
          underline: {type: UnderlineType.THICK},
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      text: docNo,
    }),
  ];
}

interface CustomRow {
  label: string;
  content: string | string[] | Paragraph[];
}

export function createLayoutingTable(
  rows: CustomRow[],
  labelColWidth: number = 20,
) {
  return new Table({
    width: {size: 100, type: WidthType.PERCENTAGE},
    borders: {
      bottom: {style: BorderStyle.NONE},
      insideHorizontal: {style: BorderStyle.NONE},
      insideVertical: {style: BorderStyle.NONE},
      left: {style: BorderStyle.NONE},
      right: {style: BorderStyle.NONE},
      top: {style: BorderStyle.NONE},
    },
    rows: rows.map(row => {
      return new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({text: row.label})],
            width: {size: labelColWidth, type: WidthType.PERCENTAGE},
          }),
          new TableCell({
            children: [new Paragraph({text: ':'})],
            width: {size: 150, type: WidthType.DXA},
          }),
          new TableCell({
            children: Array.isArray(row.content)
              ? row.content[0] instanceof Paragraph
                ? (row.content as Paragraph[])
                : row.content.map(text => {
                    return new Paragraph({
                      text: text as string,
                    });
                  })
              : [
                  new Paragraph({
                    text: row.content,
                  }),
                ],
          }),
        ],
      });
    }),
  });
}
