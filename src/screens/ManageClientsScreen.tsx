import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {clients} from '../store/dummydata';
import {Client} from '../models/client';
import ClientListItem from '../components/ClientListItem';
import React, {useState} from 'react';
import moment, {Moment} from 'moment';
import ClientListVerticalHeader from '../components/ClientListVerticalHeader';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

export default function ManageClientsScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ManageClients'>) {
  const items: Client[] = clients;

  const dateMin: Moment = moment({year: 2022, month: 1, date: 1});
  const dateMax: Moment = moment({year: 2023, month: 9, date: 1});

  const monthsInRange: Moment[] = [];
  let dateCounter = moment(dateMin);
  while (dateCounter.toString() !== dateMax.toString()) {
    monthsInRange.push(moment(dateCounter));
    dateCounter.add({month: 1});
  }
  // todo: ORANGE = months where you cannot bill yet, but is inside the contract's term

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <ClientListVerticalHeader monthsInRange={monthsInRange} />
        <FlatList
          horizontal={true}
          style={{}}
          data={items}
          renderItem={item => {
            return (
              <ClientListItem
                client={item.item}
                monthsInRange={monthsInRange}
              />
            );
          }}
          ItemSeparatorComponent={() => <View style={{margin: 6}} />}
        />
      </View>
    </ScrollView>
  );
}
