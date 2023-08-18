import {FlatList, Text, View} from 'react-native';

export default function ManageDocsScreen() {
  return (
    <View>
      <FlatList
        data={[0, 1]}
        renderItem={data => {
          return (
            <View>
              <Text></Text>
            </View>
          );
        }}
      />
    </View>
  );
}
