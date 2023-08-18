import {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import DocumentScanner, {
  ResponseType,
  ScanDocumentResponseStatus,
} from 'react-native-document-scanner-plugin';
import CustomButton from '../components/CustomButton';

export default function ScanDocumentScreen() {
  const [scannedImage, setScannedImage] = useState<string>();

  async function startScanning() {
    const {scannedImages, status} = await DocumentScanner.scanDocument({
      letUserAdjustCrop: true,
      //   responseType: ResponseType.ImageFilePath,
    });

    if (status == ScanDocumentResponseStatus.Success) {
      console.log(scannedImages![0]);
      setScannedImage(scannedImages![0]);
    }
  }

  useEffect(() => {
    // startScanning();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <View>
        <Text>ScanDocumentScreen</Text>
        <Image
          source={{
            height: 200,
            width: 200,
            uri: 'https://www.thespruce.com/thmb/ClRANI4jTWhkGeNhvJtArRhlGSA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-difference-between-trees-and-shrubs-3269804-hero-a4000090f0714f59a8ec6201ad250d90.jpg',
          }}
        />
      </View>

      <CustomButton onPress={() => {}} title="Rescan Document" />
    </View>
  );
}
