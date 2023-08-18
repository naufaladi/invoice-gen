import {TextInput} from 'react-native';

interface Props {
  label: string | undefined;
  onChangeText: () => void;
}

export default function CustomTextInput(props: Props) {
  return (
    <TextInput
      style={{
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
      }}
      multiline={false}></TextInput>
  );
}
