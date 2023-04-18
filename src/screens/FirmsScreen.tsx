import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import CustomButton from '../components/customButton';
import {RootStackParams} from '../navigation/navigation';
import firestore from '@react-native-firebase/firestore'; // Firebase Firestore kütüphanesini import edin
import {firm} from '../types/firm';
import FirmCard from '../components/firmCard';

type FirmsScreenProps = NativeStackScreenProps<RootStackParams, 'FirmsScreen'>;

const FirmsScreen = ({navigation}: FirmsScreenProps) => {
  const [firmsData, setFirmsData] = useState<firm[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFirmsData(); // fetchFirmsData işlemini çağırarak verileri alın
      setFirmsData(data); // Verileri state değişkenine kaydedin
    };
    fetchData(); // useEffect içinde fetchFirmsData işlemini çağırın
  }, []);

  const fetchFirmsData = async (): Promise<firm[]> => {
    try {
      const firmsRef = firestore().collection('firms'); // firms adlı koleksiyon referansını alın
      const snapshot = await firmsRef.get(); // Koleksiyondaki verileri alın
      const firmsData = snapshot.docs.map(doc => doc.data() as firm); // Veri öğelerini diziye dönüştürün
      return firmsData;
    } catch (error) {
      console.error('Firms veri alınamadı: ', error);
      return [];
    }
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={firmsData}
        renderItem={(
          {item}, // item objesine doğru tip tanımlaması yapıldı
        ) => (
          <FirmCard
            firmName={item.firmName}
            firmType={item.firmType}
            discountRate={item.discountRate}></FirmCard>
        )}
        keyExtractor={item => item.firmName}
      />
      <View style={styles.buttonContainer}>
        <CustomButton title="ADD FIRM" onPress={() => {}}></CustomButton>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 30,
  },
});
export default FirmsScreen;
