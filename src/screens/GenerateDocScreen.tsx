import {Modal, Pressable, Text, View} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import {Packer} from 'docx';
import * as fs from 'react-native-fs';
import {ReactElement, useEffect, useState} from 'react';
import {Fee} from '../models/fee';
import fileViewer from 'react-native-file-viewer';
import {generateDocs} from '../helper/generateDocument';
import moment, {Moment, min} from 'moment';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {DocType, MyDocument} from '../models/myDocument';
import {monthToRoman} from '../helper/helpers';
import {clients, vendors} from '../store/dummydata';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Share from 'react-native-share';

export default function GenerateDocScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'GenerateDoc'>) {
  const {vendorId, clientId, dates} = route.params;

  const vendor = vendors.find(({id}) => id == vendorId)!;
  const [client, setClient] = useState(clients.find(({id}) => id == clientId)!);

  const {} = vendor;
  const {contracts} = client;

  const {monthlyFee, name, id, dateStart, dateEnd} = contracts[0];

  // const [docId, setDocId] = useState('No. 026/INV/IV/2023');
  const [sender, setSender] = useState(vendor);
  const [recipient, setRecipient] = useState(client);
  const [billType, setBillType] = useState('');
  const [docNum, setDocNum] = useState(vendor.lastBillNo + 1);
  const [docs, setDocs] = useState<MyDocument[]>([]);
  const [combineDocs, setCombineDocs] = useState(true);
  const [docDate, setDocDate] = useState(moment());
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [docDateModalOpen, setDocDateModalOpen] = useState(false);
  const [startDateModalOpen, setStartDateModalOpen] = useState(false);
  const [endDateModalOpen, setEndDateModalOpen] = useState(false);

  useEffect(() => {
    if (dates) {
      setStartDate(moment(dates.at(0)));
      setEndDate(moment(dates.at(-1)));
    }
  }, []);

  const myFees = updateMyFees(startDate, endDate, monthlyFee);
  const description = updateDescription(startDate, endDate, monthlyFee);

  const fileName = `${recipient.abbreviation}_Invoice-retainer_${docDate.format(
    'YYYYMMDD',
  )}_${myFees.map(val => val.date.format('MMM')).join('-')}.docx`;
  const filePath = fs.ExternalDirectoryPath + '/' + fileName;
  //TODO: create better reusability for less code duplication
  const invoiceAndReceiptDoc = generateDocs([
    {
      docType: 'Invoice',
      id: generateDocId(docDate, docNum, 'Invoice'),
      description: description,
      docDate: docDate,
      recipient,
      filePath,
      sender,
      fees: myFees,
    },
    {
      docType: 'Kwitansi',
      id: generateDocId(docDate, docNum, 'Kwitansi'),
      description: description,
      docDate: docDate,
      recipient,
      filePath,
      sender,
      fees: myFees,
    },
  ]);

  const [clientPickerOpen, setClientPickerOpen] = useState(false);
  const items = [
    {label: 'MSP', value: 'c1'},
    {label: 'HJF', value: 'c2'},
    {label: 'HPAL', value: 'c3'},
  ];
  const [clientValue, setClientValue] = useState(items[0].value);

  return (
    <View
      style={{
        paddingTop: 20,
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: '#eaeaea',
      }}>
      <View
        style={{
          paddingHorizontal: 20,
        }}>
        <LabelledField
          label="Sender"
          fieldComponent={
            <SimpleButton buttonText={sender.name} />
          }></LabelledField>

        <View style={{zIndex: 1}}>
          <LabelledField
            label="Recipient"
            fieldComponent={
              <DropDownPicker
                items={items}
                open={clientPickerOpen}
                setOpen={setClientPickerOpen}
                value={clientValue}
                setValue={setClientValue}
                containerStyle={{
                  opacity: 0.86,
                }}
                onChangeValue={clientValue => {
                  setRecipient(clients.find(({id}) => id == clientValue)!);
                }}
              />
            }
          />
        </View>

        <LabelledField
          label="Document Date"
          fieldComponent={
            <SimpleButton
              buttonText={docDate.format('DD MMM yyyy')}
              onPress={() => {
                setDocDateModalOpen(true);
              }}
            />
          }
        />
        <DatePicker
          date={docDate.toDate()}
          onConfirm={date => {
            setDocDate(moment(date));
            setDocDateModalOpen(false);
          }}
          onCancel={() => {
            setDocDateModalOpen(false);
          }}
          mode="date"
          modal={true}
          open={docDateModalOpen}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <LabelledField
            label="Start Date"
            fieldComponent={
              <SimpleButton
                buttonText={startDate.format('MMM YYYY')}
                onPress={() => {
                  setStartDateModalOpen(true);
                }}
              />
            }
          />
          <DatePicker
            date={startDate.toDate()}
            onConfirm={date => {
              setStartDate(moment(date));
              setStartDateModalOpen(false);
            }}
            onCancel={() => {
              setStartDateModalOpen(false);
            }}
            mode="date"
            modal={true}
            open={startDateModalOpen}
          />

          <LabelledField
            label="End Date"
            fieldComponent={
              <SimpleButton
                buttonText={endDate.format('MMM YYYY')}
                onPress={() => {
                  setEndDateModalOpen(true);
                }}
              />
            }
          />
          <DatePicker
            date={endDate.toDate()}
            onConfirm={date => {
              setEndDate(moment(date));
              setEndDateModalOpen(false);
            }}
            onCancel={() => {
              setEndDateModalOpen(false);
            }}
            mode="date"
            modal={true}
            open={endDateModalOpen}
          />
        </View>
        <LabelledField
          label="Document ID"
          fieldComponent={
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <SimpleButton
                buttonText="<"
                onPress={() => {
                  setDocNum(docNum - 1);
                }}
              />
              <SimpleButton
                buttonText={docNum.toString()}
                onPress={() => {}}
                minSize
              />
              <SimpleButton
                buttonText=">"
                onPress={() => {
                  setDocNum(docNum + 1);
                }}
              />
            </View>
          }
        />
        <LabelledField
          label="Filename"
          fieldComponent={<SimpleButton buttonText={fileName} />}
        />
        <LabelledField
          label="Document Preview"
          fieldComponent={<View></View>}
        />
      </View>
      <View>
        <Pressable
          style={{
            backgroundColor: '#38a633',
            alignItems: 'center',
            // borderTopStartRadius: 20,
            // borderTopEndRadius: 20,
          }}
          android_ripple={{color: '#0d6507'}}
          onPress={async () => {
            try {
              const base64 = await Packer.toBase64String(invoiceAndReceiptDoc);
              await fs.writeFile(filePath, base64, 'base64');
              let shareOptions = {
                title: 'Share file',
                url: 'file://' + filePath,
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              };
              Share.open(shareOptions)
                .then(res => console.log('res:', res))
                .catch(err => console.error('err', err));
            } catch (e) {
              console.log('Write or open fail:', e);
            }
          }}>
          <View style={{paddingVertical: 15}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Generate Document
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

function updateMyFees(
  startDate: Moment,
  endDate: Moment,
  monthlyFee: number,
): Fee[] {
  let fees: Fee[] = [];
  let currentDate: Moment = moment(startDate);

  while (currentDate <= endDate) {
    fees.push({
      name: currentDate.format('MMM YYYY'),
      amountIdr: monthlyFee,
      date: moment(currentDate),
    });
    currentDate.add({month: 1});
  }

  return fees;
}

function updateDescription(
  startDate: Moment,
  endDate: Moment,
  monthlyFee: number,
): string {
  let dates: Moment[] = [];
  let description: string =
    'Tagihan "Retainer Fee" Jasa Konsultan Asuransi bulan ';
  let currentDate: Moment = moment(startDate);

  while (currentDate <= endDate) {
    dates.push(moment(currentDate));
    currentDate.add({month: 1});
  }
  description += dates
    .map((date, i) => {
      let result = moment(date).format('MMM YYYY');

      if (i === dates.length - 2) {
        result += ' dan';
      } else if (i <= dates.length - 2) {
        result += ',';
      }

      return result;
    })
    .join(' ');

  return description;
}

export function generateDocId(
  docDate: Moment,
  docNum: number,
  docType: DocType,
): string {
  let docTypeId = '';

  switch (docType) {
    case 'Invoice':
      docTypeId = 'INV';
      break;
    case 'Kwitansi':
      docTypeId = 'KWT';
    default:
      break;
  }

  return `${docNum}/${docTypeId}/${monthToRoman(
    docDate.month() + 1,
  )}/${docDate.year()}`;
}

export function SimpleButton({
  buttonText,
  onPress,
  minSize,
}: {
  buttonText: string;
  onPress?: () => void;
  minSize?: boolean;
}) {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 5,
        minWidth: minSize ? 0 : 150,
      }}>
      <Pressable
        style={{padding: 9}}
        android_ripple={onPress ? {color: '#44ff89'} : {}}
        onPress={onPress}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: onPress ? 'bold' : 'normal',
              color: onPress ? '#26bf22' : '#81888b',
            }}>
            {buttonText}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export function LabelledField({
  label,
  fieldComponent,
}: {
  label: string;
  fieldComponent: JSX.Element;
}): JSX.Element {
  return (
    <View style={{marginBottom: 10}}>
      <Text style={{marginLeft: 1, marginBottom: 3, fontSize: 11}}>
        {label.toUpperCase()}
      </Text>
      {fieldComponent}
    </View>
  );
}
