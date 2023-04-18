import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import TicketCard from '../components/ticketCard';
import {RootState} from '../redux/store/store';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../components/customButton';
import {ticket} from '../types/ticket';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigation/navigation';

const PayingTypes = [{type: 'Credit Card'}, {type: 'Cash'}, {type: 'Check'}];

type PayingScreenProps = NativeStackScreenProps<
  RootStackParams,
  'PayingScreen'
>;

const PayingScreen = ({navigation}: PayingScreenProps) => {
  const name = useSelector((state: RootState) => state.user.name);
  const date = useSelector((state: RootState) => state.ticket.date);
  const finish = useSelector((state: RootState) => state.ticket.finish);
  const start = useSelector((state: RootState) => state.ticket.start);
  const firmName = useSelector((state: RootState) => state.ticket.firmName);
  const firmType = useSelector((state: RootState) => state.ticket.firmType);
  const no = useSelector((state: RootState) => state.ticket.no);
  const price = useSelector((state: RootState) => state.ticket.price) as number;
  const userName = useSelector((state: RootState) => state.user.userName);
  const [userPuan, setUserPuan] = useState<number>(0);
  const [selected, setSelected] = useState(false);
  const [newScore, setNewScore] = useState(0);
  useEffect(() => {
    getPuan();
    setNewScore(price * 0.01);
  }, []);
  const getPuan = () => {
    firestore()
      .collection('users')
      .where('userName', '==', userName)
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          console.log('isim mevcut');
          console.log(userName);
          const doc = querySnapshot.docs[0];
          const user = doc.data();
          const puan = user.puan;
          console.log('Puan:', puan);
          setUserPuan(puan);
        } else {
          console.log('isim bulunamadı');
        }
      });
  };

  const ticket: ticket = {
    date: date,
    start: start,
    finish: finish,
    firmName: firmName,
    firmType: firmType,
    no: no,
    userName: userName,
    name: name,
    price: price,
  };

  const buyTicket = async (ticket: ticket) => {
    try {
      firestore().collection('tickets').add(ticket);
      console.log('ticket added');
    } catch (error) {
      console.log('ticket did not added');
    }
    try {
      const userRef = firestore()
        .collection('users')
        .where('userName', '==', userName);
      const userSnapshot = await userRef.get();
      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        await userDoc.ref.update({puan: newScore});
        console.log('Belge başarıyla güncellendi.');
      } else {
        console.log('Kullanıcı bulunamadı.');
      }
    } catch (error) {
      console.error('Belge güncelleme hatası:', error);
    }
    navigation.navigate('SuccessScreen');
  };

  return (
    <View>
      <TicketCard
        date={date}
        start={start}
        finish={finish}
        firmName={firmName}
        name={name}
        no={no}
      />
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 30,
          justifyContent: 'space-between',
        }}>
        <View>
          <FlatList
            data={PayingTypes}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.paymentTypeCont}
                onPress={() => setSelected(true)}>
                <Text style={styles.paymentText}>{item.type}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.totalPrice}>
          <Text style={styles.paymentText}>Ticket Price + {price}TL</Text>
          <Text style={styles.paymentText}>Discount Puan- {userPuan}TL</Text>
          <Text style={styles.paymentText}>
            Total Price: {price - userPuan}TL
          </Text>
        </View>
      </View>
      <Text style={{marginLeft: 30, color: 'green', margin: 5}}>
        You will earn {price * 0.01}TL from this purchase
      </Text>
      <CustomButton
        title="BUY"
        disabled={!selected}
        onPress={() => buyTicket(ticket)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  paymentTypeCont: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
  paymentText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  totalPrice: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
  totalPriceText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
export default PayingScreen;
