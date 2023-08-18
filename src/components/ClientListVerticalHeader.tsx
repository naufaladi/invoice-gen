import {Moment} from 'moment';
import {View, Text, FlatList} from 'react-native';
import {nodeHeight, nodeMargin} from '../store/globalValues';

export default function ClientListVerticalHeader(props: {
  monthsInRange: Moment[];
}) {
  const {monthsInRange} = props;
  return (
    <View style={{backgroundColor: 'white', width: 80}}>
      <Text style={{paddingVertical: 10, marginBottom: 10}}></Text>
      <FlatList
        scrollEnabled={false}
        data={monthsInRange}
        renderItem={({item: date}) => {
          return (
            <View
              style={{
                height: nodeHeight,
                marginBottom: nodeMargin,
              }}>
              <Text>{date.format('MMM YYYY')}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
