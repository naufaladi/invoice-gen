import {Pressable, Text, View} from 'react-native';

interface Params {
  title: string;
  onPress: () => void;
}

export default function CustomButton(props: Params) {
  return (
    <Pressable
      onPress={props.onPress}
      android_ripple={{color: 'blue'}}
      style={{backgroundColor: '#333', borderRadius: 10, padding: 10}}>
      <View
        style={{
          width: 130,
          height: 50,
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
          {props.title}
        </Text>
      </View>
    </Pressable>
  );
}
