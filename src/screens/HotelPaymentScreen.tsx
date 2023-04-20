import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import HotelCard from '../components/hotelCard';
import {RootStackParams} from '../navigation/navigation';
import {RootState} from '../redux/store/store';
import firestore from '@react-native-firebase/firestore';
import {hotel} from '../types/hotel';
import CustomButton from '../components/customButton';
const PayingTypes = [{type: 'Credit Card'}, {type: 'Cash'}, {type: 'Check'}];

type HotelPaymentScreenProps = NativeStackScreenProps<
  RootStackParams,
  'HotelPaymentScreen'
>;

const HotelPaymentScreen = ({navigation}: HotelPaymentScreenProps) => {
  const userName = useSelector((state: RootState) => state.user.userName);
  const name = useSelector((state: RootState) => state.user.name);
  const date = useSelector((state: RootState) => state.hotel.date);
  const firmName = useSelector((state: RootState) => state.hotel.firmName);
  const firmType = useSelector((state: RootState) => state.hotel.firmType);
  const price = useSelector((state: RootState) => state.hotel.price) as number;
  const roomNo = useSelector((state: RootState) => state.hotel.roomNo);
  const city = useSelector((state: RootState) => state.hotel.city);
  const [newScore, setNewScore] = useState(0);
  const [userPuan, setUserPuan] = useState<number>(0);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    getPuan();
    setNewScore(price * 0.02);
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

  const hotel: hotel = {
    firmName: firmName,
    city: city,
    firmType: firmType,
    roomNo: roomNo,
    date: date,
    price: price,
    name: name,
    userName: userName,
  };

  const hotelReserve = async (hotel: hotel) => {
    try {
      firestore().collection('rooms').add(hotel);
      console.log('hotel room added');
    } catch (error) {
      console.log('hotel room did not added');
    }
    try {
      const userRef = firestore()
        .collection('users')
        .where('userName', '==', userName);
      const userSnapshot = await userRef.get();
      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        await userDoc.ref.update({puan: newScore});
        console.log('Updated user puan.');
      } else {
        console.log('user not found.');
      }
    } catch (error) {
      console.error('error did not updute puan:', error);
    }
    navigation.navigate('SuccessScreen');
  };
  return (
    <View>
      <HotelCard
        firmName={firmName}
        name={name}
        date={date}
        city={city}
        roomNo={roomNo}></HotelCard>
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
        You will earn {price * 0.02}TL from this purchase
      </Text>
      <CustomButton
        title="BUY"
        disabled={!selected}
        onPress={() => hotelReserve(hotel)}
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

export default HotelPaymentScreen;
