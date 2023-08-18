Invoice Generator

OUTPUT
Invoice and payslip (kwitansi) generated from parameters in .docx and/or .pdf format
- you can save sender detail, list of clients details, etc.

INPUT
{
    type: "invoice",
    description: "tagihan bruh bruh",
    count: 13,
    sentDate: '2023-03-25",
    paidDate: '2131-23-23",
    id: "INV/III/13",
    fileName: "brubruh.docx",
    reference: : {
        name: "kontrakno5addendum10",
        noKontrak: "1293123asda",
        startDate: "",
        endDate: "",
        client: can be same as recipient,
        feePerMonth: 5 juta,
    },
    fees: [
        {
            title: 'bulan mei 2023',
            amount: can be custom or by default set to reference.feePerMonth,
        }
    ]
    sender: {
        name: "PT BRUH",
        pic: "Pak Adi",
        rekening: {
            bank: bank manman,
            no: 91230129310,
            
        }
        phone: "08123429329",
        address: {
            detail: "11B, Apartment MCC Lt 9",
            street: "Jl. Aplikasi 69",
            ---i forgot what's supposed to be here---,
            district: "Cipayung",
            city: "Jakarta Selatan",
            province: "DKI Jakarta",
            postcode: 13880,
            country: "Indonesia" <<<<< if sender.country == recipient.country, don't print
        },
        
        
    },
    recipient: {
        ...sameAsSender,
        
    }
    
}