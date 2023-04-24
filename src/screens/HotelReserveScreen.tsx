import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import {
  setCity,
  setDate,
  setFirmName,
  setPrice,
  setRoomNo,
} from '../redux/reducer/hotelReducer';
import {colors} from '../theme/colors';
import firestore from '@react-native-firebase/firestore';
import {firm} from '../types/firm';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigation/navigation';

interface HotelRoomData {
  date: string;
  city: string;
  roomNo: string;
  price: number;
}
type HotelReserveScreenProps = NativeStackScreenProps<
  RootStackParams,
  'HotelReserveScreen'
>;
const HotelReserveScreen = ({navigation}: HotelReserveScreenProps) => {
  const [date, setDateLocal] = useState(new Date());
  const [stringDate, setStringDate] = useState('');
  const minumumDate = new Date('2023-04-20');
  const maximumDate = new Date('2024-12-12');
  const dispatch = useDispatch();
  const [firmsData, setFirmsData] = useState<firm[]>([]);
  const [firm, setFirm] = useState('');
  const [rooms, setRooms] = useState<HotelRoomData[]>([]);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFirmsData(); // fetchFirmsData işlemini çağırarak verileri alın
      setFirmsData(data); // Verileri state değişkenine kaydedin
    };
    fetchData();
    // useEffect içinde fetchFirmsData işlemini çağırın
  }, []);

  const fetchFirmsData = async (): Promise<firm[]> => {
    try {
      const firmsRef = firestore()
        .collection('firms')
        .where('firmType', '==', 'hotel'); // firms adlı koleksiyon referansını alın
      const snapshot = await firmsRef.get(); // Koleksiyondaki verileri alın
      const firmsData = snapshot.docs.map(doc => doc.data() as firm); // Veri öğelerini diziye dönüştürün
      return firmsData;
    } catch (error) {
      console.error('Firms veri alınamadı: ', error);
      return [];
    }
  };
  const selectFirm = (firmName: string) => {
    setFirm(firmName);
    dispatch(setFirmName(firmName));
    console.log(firmName);
    firmRooms(firmName);
  };

  const selectHotelRoom = (
    date: string,
    city: string,
    roomNo: string,
    price: number,
  ) => {
    dispatch(setDate(date));
    dispatch(setCity(city));
    dispatch(setPrice(price));
    dispatch(setRoomNo(roomNo));
    setSelected(true);
  };

  const firmRooms = (firmName: string) => {
    firestore()
      .collection('firms')
      .where('firmName', '==', firmName)
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          const ticketsCollectionRef = firestore()
            .collection('firms')
            .doc(querySnapshot.docs[0].id)
            .collection('available');

          let hotelRoomData: HotelRoomData[] = [];

          ticketsCollectionRef
            .where('date', '==', stringDate)
            .get()
            .then(ticketsSnapshot => {
              ticketsSnapshot.forEach(hotelDoc => {
                hotelRoomData = ticketsSnapshot.docs.map(
                  hotelDoc => hotelDoc.data() as HotelRoomData,
                );
              });
              setRooms(hotelRoomData);
            })
            .catch(error => {
              console.error('Hata:', error);
            });
          if (hotelRoomData.length == 0) {
            ticketsCollectionRef
              .get()
              .then(ticketsSnapshot => {
                ticketsSnapshot.forEach(hotelDoc => {
                  hotelRoomData = ticketsSnapshot.docs.map(
                    hotelDoc => hotelDoc.data() as HotelRoomData,
                  );
                });
                setRooms(hotelRoomData);
              })
              .catch(error => {
                console.error('Hata:', error);
              });
          }
        } else {
          console.log('Belge bulunamadı.');
        }
      })
      .catch(error => {
        console.error('Hata:', error);
      });
  };

  const handleOnDateChange = (date: Date) => {
    setDateLocal(date);
    const newDate = date.toLocaleDateString();
    dispatch(setDate(newDate));
    setStringDate(newDate);
    console.log(date.toLocaleDateString());
  };
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.tittle}>ENTER HOTEL INFO</Text>
      </View>
      <View style={styles.timePicker}>
        <Text style={styles.subtitle}>Select Date</Text>
        <DatePicker
          date={date}
          onDateChange={date => handleOnDateChange(date)}
          maximumDate={maximumDate}
          minimumDate={minumumDate}
          mode="date"></DatePicker>
      </View>

      {firm ? (
        <FlatList
          data={rooms}
          renderItem={(
            {item}, // item objesine doğru tip tanımlaması yapıldı
          ) => (
            <TouchableOpacity
              style={styles.firmNameCard}
              onPress={() =>
                selectHotelRoom(item.date, item.city, item.roomNo, item.price)
              }>
              <View>
                <Text style={styles.firmName}>Date: {item.date}</Text>
                <Text style={styles.firmName}>City: {item.city}</Text>
              </View>
              <Text style={styles.firmName}>price: {item.price}TL</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <FlatList
          data={firmsData}
          renderItem={(
            {item}, // item objesine doğru tip tanımlaması yapıldı
          ) => (
            <TouchableOpacity
              style={styles.firmNameCard}
              onPress={() => selectFirm(item.firmName)}>
              <Text style={styles.firmName}>{item.firmName}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <TouchableOpacity
        style={styles.okayContainer}
        onPress={() => navigation.navigate('HotelPaymentScreen')}
        disabled={!selected}>
        <Text style={styles.okayText}>OKAY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  timePicker: {
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  tittle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.themeBlue,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5,
  },
  subtitle: {
    padding: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  firmNameCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: colors.themeBlue,
  },

  firmName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  okayContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
    paddingRight: 40,
  },
  okayText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.themeBlue,
  },
});
export default HotelReserveScreen;
