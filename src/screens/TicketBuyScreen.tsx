import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {RootStackParams} from '../navigation/navigation';
import {colors} from '../theme/colors';
import {firm} from '../types/firm';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store/store';
import {
  setDate,
  setFinish,
  setFirmName,
  setNo,
  setPrice,
  setStart,
} from '../redux/reducer/ticketReducer';

type TicketBuyScreenProps = NativeStackScreenProps<
  RootStackParams,
  'TicketBuyScreen'
>;
interface TicketData {
  start: string;
  finish: string;
  price: number;
}

const TicketBuyScreen = ({navigation}: TicketBuyScreenProps) => {
  const [date, setDateLocal] = useState(new Date());
  const minumumDate = new Date('2023-04-20');
  const maximumDate = new Date('2024-12-12');
  const [no, setNoLocal] = useState('');
  const [firmsData, setFirmsData] = useState<firm[]>([]);
  const userName = useSelector((state: RootState) => state.user.userName);
  const [puan, setPuanLocal] = useState();
  const [firm, setFirm] = useState('');
  const dispatch = useDispatch();
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFirmsData(); // fetchFirmsData işlemini çağırarak verileri alın
      setFirmsData(data); // Verileri state değişkenine kaydedin
    };
    fetchData();
    getPuan(); // useEffect içinde fetchFirmsData işlemini çağırın
  }, []);

  const fetchFirmsData = async (): Promise<firm[]> => {
    try {
      const firmsRef = firestore()
        .collection('firms')
        .where('firmType', '==', 'transport'); // firms adlı koleksiyon referansını alın
      const snapshot = await firmsRef.get(); // Koleksiyondaki verileri alın
      const firmsData = snapshot.docs.map(doc => doc.data() as firm); // Veri öğelerini diziye dönüştürün
      return firmsData;
    } catch (error) {
      console.error('Firms veri alınamadı: ', error);
      return [];
    }
  };

  const handleOnDateChange = (date: Date) => {
    setDateLocal(date);
    const newDate = date.toLocaleDateString();
    dispatch(setDate(newDate));
    console.log(date.toLocaleDateString());
  };
  const getPuan = () => {
    firestore()
      .collection('users')
      .where('userName', '==', userName)
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          console.log('isim mevcut');
          const doc = querySnapshot.docs[0];
          const user = doc.data();
          const puan = user.puan;
          console.log('Puan:', puan);
          setPuanLocal(puan);
        } else {
          console.log('isim bulunamadı');
        }
      });
  };

  const selectFirm = (firmName: string) => {
    setFirm(firmName);
    dispatch(setFirmName(firmName));
    console.log(firmName);
    firmTickets(firmName);
  };
  const selectTicket = (start: string, finish: string, price: number) => {
    dispatch(setStart(start));
    dispatch(setFinish(finish));
    dispatch(setPrice(price));
    setSelected(true);
  };

  const firmTickets = (firmName: string) => {
    firestore()
      .collection('firms')
      .where('firmName', '==', firmName)
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          // Belge bulunursa, "tickets" koleksiyonunun referansını al
          const ticketsCollectionRef = firestore()
            .collection('firms')
            .doc(querySnapshot.docs[0].id)
            .collection('tickets');
          // "tickets" koleksiyonundaki tüm belgeleri getir
          ticketsCollectionRef
            .get()
            .then(ticketsSnapshot => {
              const ticketData: TicketData[] = [];
              // "tickets" koleksiyonundan belgeleri döngüye al
              ticketsSnapshot.forEach(ticketDoc => {
                // Belgenin "start", "finish" ve "price" alanlarındaki verilere ulaşarak obje olarak ekleyin
                const ticket = ticketDoc.data() as TicketData;
                ticketData.push(ticket);
              });
              // State'i güncelle
              setTickets(ticketData);
            })
            .catch(error => {
              console.error('Hata:', error);
            });
        } else {
          console.log('Belge bulunamadı.');
        }
      })
      .catch(error => {
        console.error('Hata:', error);
      });
  };
  const setSeatNo = (no: string) => {
    setNoLocal(no);
    dispatch(setNo(no));
  };
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.tittle}>ENTER TICKET INFO</Text>
        <View style={styles.puanContainer}>
          <Text style={styles.puanText}>Puan:{puan}</Text>
        </View>
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
          data={tickets}
          renderItem={(
            {item}, // item objesine doğru tip tanımlaması yapıldı
          ) => (
            <TouchableOpacity
              style={styles.firmNameCard}
              onPress={() => selectTicket(item.start, item.finish, item.price)}>
              <View>
                <Text style={styles.firmName}>Start: {item.start}</Text>
                <Text style={styles.firmName}>Dest: {item.finish}</Text>
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

      <View style={styles.bottomContainer}>
        <TextInput
          value={no}
          placeholder="Seat No"
          style={styles.textInput}
          onChangeText={setSeatNo}></TextInput>

        <TouchableOpacity
          style={styles.okayContainer}
          onPress={() => navigation.navigate('PayingScreen')}
          disabled={!selected}>
          <Text style={styles.okayText}>OKAY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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
  textInput: {
    borderWidth: 1,
    width: 100,
    height: 50,
    padding: 10,
    fontSize: 20,
    borderRadius: 9,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    marginBottom: 50,
  },
  okayContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    margin: 10,
    paddingRight: 40,
  },
  okayText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.themeBlue,
  },
  puanContainer: {
    margin: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.themeBlue,
    padding: 5,
    borderRadius: 9,
    marginLeft: 30,
  },
  puanText: {
    fontWeight: 'bold',
    fontSize: 15,
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
});

export default TicketBuyScreen;
