import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import MainMenuScreen from './screens/MainMenuScreen';
import GenerateDocScreen from './screens/GenerateDocScreen';
import ManageClientsScreen from './screens/ManageClientsScreen';
import ManageDocsScreen from './screens/ManageDocsScreen';
import ScanDocumentScreen from './screens/ScanDocumentScreen';
import {Client} from './models/client';
import {Vendor} from './models/vendor';
import {Moment} from 'moment';
import EditClientScreen from './screens/EditClientScreen';

export type RootStackParamList = {
  MainMenu: undefined;
  GenerateDoc: {
    clientId: string;
    vendorId: string;
    dates?: string[];
  };
  ManageClients: undefined;
  ManageDocs: undefined;
  ScanDocument: undefined;
  EditClient: {
    clientId: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        <Stack.Screen name="GenerateDoc" component={GenerateDocScreen} />
        <Stack.Screen name="ManageClients" component={ManageClientsScreen} />
        <Stack.Screen name="ManageDocs" component={ManageDocsScreen} />
        <Stack.Screen name="ScanDocument" component={ScanDocumentScreen} />
        <Stack.Screen name="EditClient" component={EditClientScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
