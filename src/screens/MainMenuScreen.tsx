import {FlatList, Text, View} from 'react-native';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

export default function MainMenuScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList>) {
  const buttons = [
    <CustomButton
      title="Add New Item"
      onPress={() => {
        navigation.push('GenerateDoc', {clientId: 'c1', vendorId: 'v1'});
      }}
    />,
    <CustomButton
      title="Manage Clients"
      onPress={() => {
        navigation.push('ManageClients');
      }}
    />,
    <CustomButton
      title="Manage Docs"
      onPress={() => {
        navigation.push('ManageDocs');
      }}
    />,
  ];
  return (
    <View style={{padding: 10, flex: 1, justifyContent: 'space-between'}}>
      <View style={{padding: 10, alignItems: 'center'}}>
        <FlatList
          data={buttons}
          renderItem={({item}) => <View style={{marginRight: 20}}>{item}</View>}
          ItemSeparatorComponent={() => (
            <View
              style={{
                marginHorizontal: 10,
                marginTop: 20,
                backgroundColor: 'red',
              }}
            />
          )}
          numColumns={2}
          keyExtractor={({props}) => props.title}
        />
      </View>
      <View style={{justifyContent: 'center', flexDirection: 'row'}}>
        <CustomButton
          title="Scan Document"
          onPress={() => navigation.navigate('ScanDocument')}
        />
      </View>
    </View>
  );
}
