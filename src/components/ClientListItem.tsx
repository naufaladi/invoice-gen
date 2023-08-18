import {
  Button,
  FlatList,
  Modal,
  Pressable,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {Client} from '../models/client';
import {stat} from 'react-native-fs';
import moment, {Moment} from 'moment';
import {nodeHeight, nodeMargin, nodeWidth} from '../store/globalValues';
import {useState} from 'react';
import {NavigatorScreenParams, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NativeStackNavigatorProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {vendors} from '../store/dummydata';

enum MonthStatus {
  NotAvailable,
  Billable,
  Billed,
  Paid,
}

interface Props {
  client: Client;
  monthsInRange: Moment[];
}

interface ModalData {
  status: MonthStatus;
  date: Moment;
}

export default function ClientListItem(props: Props) {
  const {client, monthsInRange} = props;
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'ManageClients'>
    >();

  const {
    id,
    contracts,
    latestPaidMonthly,
    latestBilledMonthly,
    bills,
    abbreviation,
    address,
    name,
    phone,
    role,
    reps,
  } = client;

  const {dateEnd, dateStart} = contracts[0];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState<ModalData>({
    status: MonthStatus.NotAvailable,
    date: moment(),
  });

  function renderModal(status: MonthStatus, date: Moment) {
    if (status === MonthStatus.NotAvailable) return;
    setIsModalVisible(true);
    setModalData({status, date});
  }

  return (
    <View style={{backgroundColor: 'white', width: nodeWidth}}>
      <Pressable
        style={{backgroundColor: 'green', marginBottom: 10}}
        onPress={() => {
          navigation.push('EditClient', {clientId: id});
        }}>
        <Text style={{textAlign: 'center', paddingVertical: 10}}>
          {abbreviation}
        </Text>
      </Pressable>

      <FlatList
        scrollEnabled={false}
        data={monthsInRange}
        renderItem={({item: date}) => {
          let status: MonthStatus = MonthStatus.NotAvailable;
          let nodeBackgroundColor: ViewStyle['backgroundColor'] = 'grey';

          if (date.isBetween(dateStart, dateEnd, 'month')) {
            status = MonthStatus.Billable;
            if (date.isBefore(latestBilledMonthly)) {
              status = MonthStatus.Billed;
            }
            if (date.isBefore(latestPaidMonthly)) {
              status = MonthStatus.Paid;
            }
          }

          switch (status) {
            case MonthStatus.Billable:
              nodeBackgroundColor = 'red';
              break;
            case MonthStatus.Billed:
              nodeBackgroundColor = 'yellow';
              break;
            case MonthStatus.Paid:
              nodeBackgroundColor = 'green';
              break;
          }

          return (
            <View
              style={{
                height: nodeHeight,
                marginBottom: nodeMargin,
                backgroundColor: nodeBackgroundColor,
              }}>
              <Pressable
                android_ripple={
                  status === MonthStatus.NotAvailable ? null : {color: 'white'}
                }
                style={{flex: 1}}
                onPress={
                  status === MonthStatus.NotAvailable
                    ? null
                    : () => renderModal(status, date)
                }></Pressable>
            </View>
          );
        }}></FlatList>
      <Modal
        animationType="fade"
        visible={isModalVisible}
        transparent={true}
        onRequestClose={({}) => {
          setIsModalVisible(false);
        }}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            console.log('closing modal');
            setIsModalVisible(false);
          }}>
          <Pressable>
            <ClientListItemMenu client={client} modalData={modalData} />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function ClientListItemMenu(props: {client: Client; modalData: ModalData}) {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'ManageClients'>
    >();

  const {client, modalData} = props;
  const {name, latestBilledMonthly, latestPaidMonthly} = client;
  const {status, date} = modalData;

  const billDates: string[] = [
    latestBilledMonthly.clone().add({month: 1}).toISOString(),
  ];

  while (moment(billDates.at(-1)).isSameOrBefore(date)) {
    billDates.push(moment(billDates.at(-1)!).add({month: 1}).toISOString());
  }
  // console.log('date :>> ', date);
  // console.log('date.month() :>> ', date.month());
  // console.log('billDates :>> ', billDates);
  let message: string = '';

  switch (status) {
    case MonthStatus.Billable:
      message = 'has not been billed';
      break;
    case MonthStatus.Billed:
      message = 'has been billed and is awaiting payment';
      break;
    case MonthStatus.Paid:
      message = 'has been paid';
      break;
  }

  return (
    <View
      style={{
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
      }}>
      <View style={{marginBottom: 30}}>
        <Text>{name}</Text>
      </View>
      <View>
        <Text>{date.format('MMM YYYY') + ' ' + message}</Text>
      </View>

      {status == MonthStatus.Billable ? (
        <Button
          title="Generate Invoice & Receipt"
          onPress={() => {
            navigation.navigate('GenerateDoc', {
              clientId: client.id,
              dates: billDates,
              vendorId: vendors[0].id,
            });
          }}></Button>
      ) : (
        <Button title="View Invoice & Receipt"></Button>
      )}
    </View>
  );
}
