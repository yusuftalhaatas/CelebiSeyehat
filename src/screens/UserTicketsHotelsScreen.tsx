import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store/store';
import {ticket} from '../types/ticket';
import {hotel} from '../types/hotel';
import HotelCard from '../components/hotelCard';
import TicketCard from '../components/ticketCard';

const UserTicketsHotelsScreen = () => {
  const userName = useSelector((state: RootState) => state.user.userName);
  const [ticketData, setTicketData] = useState<ticket[]>([]);
  const [hotelData, setHotelData] = useState<hotel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const ticketData = await getTickets();
      const hotelData = await getHotelRooms();
      setHotelData(hotelData);
      // fetchFirmsData işlemini çağırarak verileri alın
      setTicketData(ticketData); // Verileri state değişkenine kaydedin
    };
    fetchData();
    // useEffect içinde fetchFirmsData işlemini çağırın
  }, []);

  const getTickets = async () => {
    try {
      const firmsRef = firestore()
        .collection('tickets')
        .where('userName', '==', userName); // firms adlı koleksiyon referansını alın
      const snapshot = await firmsRef.get(); // Koleksiyondaki verileri alın
      const ticketData = snapshot.docs.map(doc => doc.data() as ticket); // Veri öğelerini diziye dönüştürün
      return ticketData;
    } catch (error) {
      console.error('Firms veri alınamadı: ', error);
      return [];
    }
  };
  const getHotelRooms = async () => {
    try {
      const firmsRef = firestore()
        .collection('rooms')
        .where('userName', '==', userName); // firms adlı koleksiyon referansını alın
      const snapshot = await firmsRef.get(); // Koleksiyondaki verileri alın
      const hotelData = snapshot.docs.map(doc => doc.data() as hotel); // Veri öğelerini diziye dönüştürün
      return hotelData;
    } catch (error) {
      console.error('Firms veri alınamadı: ', error);
      return [];
    }
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Hotels</Text>
        </View>
        <FlatList
          data={hotelData}
          renderItem={(
            {item}, // item objesine doğru tip tanımlaması yapıldı
          ) => (
            <HotelCard
              firmName={item.firmName}
              city={item.city}
              firmType={item.firmType}
              roomNo={item.roomNo}
              date={item.date}
              name={item.name}
            />
          )}
        />
      </View>
      <View style={{flex: 1}}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tickets</Text>
        </View>
        <FlatList
          data={ticketData}
          renderItem={(
            {item}, // item objesine doğru tip tanımlaması yapıldı
          ) => (
            <TicketCard
              date={item.date}
              start={item.start}
              finish={item.finish}
              firmName={item.firmName}
              no={item.no}
              name={item.name}
            />
          )}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default UserTicketsHotelsScreen;
