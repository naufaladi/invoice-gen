import {Document} from 'docx';
import {MyDocument} from '../models/myDocument';
import {generateInvoiceDoc} from '../docTemplates/invoiceDocTemplate';
import {generateReceiptDoc} from '../docTemplates/receiptDocTemplate';

export const generateDocs = (docs: MyDocument[]): Document => {
  // if (doc.docType == 'Invoice') {
  //   return generateInvoiceDoc(doc);
  // } else if (doc.docType == 'Receipt') {
  //   return generateInvoiceDoc(doc);
  // } else {
  //   throw Error('reeeeee invalid doctype');
  // }

  return new Document({
    styles: {
      default: {
        document: {
          run: {font: 'Arial', size: 24},
          paragraph: {spacing: {after: 25}},
        },
      },
    },
    sections: [generateInvoiceDoc(docs[0]), generateReceiptDoc(docs[1])],
  });
};
