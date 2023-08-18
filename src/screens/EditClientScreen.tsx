import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {Component, useState} from 'react';
import {RootStackParamList} from '../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {clients} from '../store/dummydata';
import {LabelledField} from './GenerateDocScreen';
import {Client} from '../models/client';
import {Moment} from 'moment';

export default function EditClientScreen(
  props: NativeStackScreenProps<RootStackParamList, 'EditClient'>,
) {
  const {navigation, route} = props;
  const client: Client = clients.find(val => val.id == route.params.clientId)!;
  const {abbreviation, address, bills, contracts, id, reps} = client!;

  interface inputsState {
    name: string;
    phone: string;
    abbreviation: string;
    addressCountry: string;
    addressProvince: string;
    addressCity: string;
    addressDistrict: string;
    addressSubDistrict: string;
    addressStreet: string;
    addressPostCode: string;
    addressDetail?: string;
    latestBilledMonthly: Moment;
    latestPaidMonthly: Moment;
    role: string;
  }

  const [inputs, setInputs] = useState<inputsState>({
    name: client.name,
    phone: client.phone,
    abbreviation: client.abbreviation,
    addressCountry: client.address.country,
    addressProvince: client.address.province,
    addressCity: client.address.city,
    addressDistrict: client.address.district,
    addressSubDistrict: client.address.subdistrict,
    addressStreet: client.address.street,
    addressPostCode: client.address.postcode,
    addressDetail: client.address.detail,
    latestBilledMonthly: client.latestBilledMonthly,
    latestPaidMonthly: client.latestPaidMonthly,
    role: client.role,
  });

  function handleInputChange(value: string, name: keyof inputsState) {
    setInputs({...inputs, name: value});
  }
  function generateFields(obj: {[key: string]: any}) {
    let list = [];
    for (const key in obj) {
      list.push(
        <LabelledTextField
          label={key}
          value={obj[key].toString()}
          onChangeText={val => {
            console.log(val);
          }}
        />,
      );
    }

    return list;
  }

  return (
    <ScrollView style={{paddingTop: 10, paddingHorizontal: 15}}>
      <LabelledTextField
        label="Name"
        value={inputs.name}
        onChangeText={val => handleInputChange(val, 'name')}
      />
      <LabelledTextField
        label="abbreviation"
        value={inputs.abbreviation}
        onChangeText={val => handleInputChange(val, 'abbreviation')}
      />

      <LabelledTextField
        label="phone"
        value={inputs.phone}
        onChangeText={val => handleInputChange(val, 'phone')}
      />

      <LabelledField
        label="Contracts"
        fieldComponent={
          <View style={{backgroundColor: 'white', padding: 10}}>
            <FlatList
              horizontal
              data={contracts}
              renderItem={({item}) => {
                return (
                  <View
                    key={item.toString()}
                    style={{
                      padding: 10,
                      backgroundColor: '#f2f2f2',
                      marginRight: 10,
                      minWidth: 170,
                    }}>
                    {generateFields(item)}
                  </View>
                );
              }}
            />
          </View>
        }
      />

      <LabelledField
        label="Representatives"
        fieldComponent={
          <View style={{backgroundColor: 'white', padding: 10}}>
            <FlatList
              horizontal
              data={reps}
              renderItem={({item}) => {
                return (
                  <View
                    key={item.toString()}
                    style={{
                      padding: 10,
                      backgroundColor: '#f2f2f2',
                      marginRight: 10,
                      minWidth: 170,
                    }}>
                    {generateFields(item)}
                  </View>
                );
              }}
            />
          </View>
        }
      />

      <FormGroup title="Bill Information">
        <LabelledField
          label="Bills"
          fieldComponent={
            <View style={{backgroundColor: 'white', padding: 10}}>
              {bills.length ? (
                <FlatList
                  horizontal
                  data={bills}
                  renderItem={({item}) => {
                    return (
                      <View
                        key={item.toString()}
                        style={{
                          padding: 10,
                          backgroundColor: '#f2f2f2',
                          marginRight: 10,
                          minWidth: 170,
                        }}>
                        {generateFields(item)}
                      </View>
                    );
                  }}
                />
              ) : (
                <Text style={{padding: 20, textAlign: 'center'}}>
                  No bills have been made
                </Text>
              )}
            </View>
          }
        />

        <LabelledTextField
          label="latestBilledMonthly"
          value={inputs.latestBilledMonthly.toString()}
          onChangeText={val => handleInputChange(val, 'latestBilledMonthly')}
        />
        <LabelledTextField
          label="latestPaidMonthly"
          value={inputs.latestPaidMonthly.toString()}
          onChangeText={val => handleInputChange(val, 'latestPaidMonthly')}
        />
      </FormGroup>

      <LabelledTextField
        label="phone"
        value={inputs.phone}
        onChangeText={val => handleInputChange(val, 'phone')}
      />
      <LabelledTextField
        label="role"
        value={inputs.role}
        onChangeText={val => handleInputChange(val, 'role')}
      />

      <FormGroup title="Address">
        <LabelledTextField
          label="Country"
          value={inputs.addressCountry}
          onChangeText={val => handleInputChange(val, 'addressCountry')}
        />
        <LabelledTextField
          label="Province"
          value={inputs.addressProvince}
          onChangeText={val => handleInputChange(val, 'addressProvince')}
        />
        <LabelledTextField
          label="City"
          value={inputs.addressCity}
          onChangeText={val => handleInputChange(val, 'addressCity')}
        />
        <LabelledTextField
          label="District"
          value={inputs.addressDistrict}
          onChangeText={val => handleInputChange(val, 'addressDistrict')}
        />
        <LabelledTextField
          label="SubDistrict"
          value={inputs.addressSubDistrict}
          onChangeText={val => handleInputChange(val, 'addressSubDistrict')}
        />
        <LabelledTextField
          label="Street"
          value={inputs.addressStreet}
          onChangeText={val => handleInputChange(val, 'addressStreet')}
        />
        <LabelledTextField
          label="Detail"
          value={inputs.addressDetail ?? ''}
          onChangeText={val => handleInputChange(val, 'addressDetail')}
        />
        <View style={{height: 20}} />
      </FormGroup>
    </ScrollView>
  );
}

export function FormGroup({
  title,
  children,
}: {
  title?: string;
  children?: JSX.Element[];
}): JSX.Element {
  return (
    <View>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1.5,
          alignItems: 'center',
          marginHorizontal: 50,
          marginBottom: 15,
          marginTop: 10,
          paddingBottom: 5,
        }}>
        {title ? (
          <Text style={{fontSize: 17, fontWeight: 'normal', color: 'black'}}>
            {title}
          </Text>
        ) : (
          <Text></Text>
        )}
      </View>
      {children}
    </View>
  );
}

export function CustomTextField({
  onChangeText,
  placeholder,
  value,
}: {
  onChangeText: (input: string) => void;
  value: string;
  placeholder?: string;
}) {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 5,
      }}>
      <TextInput
        style={{paddingLeft: 10}}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}></TextInput>
    </View>
  );
}

export function LabelledTextField({
  label,
  value,
  onChangeText,
  placeholder,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText: (input: string) => void;
}) {
  return (
    <LabelledField
      label={label}
      fieldComponent={
        <CustomTextField
          placeholder={placeholder ?? label}
          value={value}
          onChangeText={onChangeText}
        />
      }
    />
  );
}

export function AddressForm() {}
