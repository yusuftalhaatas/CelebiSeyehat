import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '../components/customButton';
import {RootStackParams} from '../navigation/navigation';
import {colors} from '../theme/colors';

type SelectScreenProps = NativeStackScreenProps<
  RootStackParams,
  'SelectScreen'
>;
const SelectScreen = ({navigation}: SelectScreenProps) => {
  const buyTrasntportTicket = () => {
    navigation.navigate('TicketBuyScreen');
  };
  const hotelReserve = () => {
    navigation.navigate('HotelReserveScreen');
  };

  const userTickets = () => {
    navigation.navigate('UserTicketsHotelsScreen');
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.tittle}>SELECT</Text>
      </View>
      <CustomButton
        title="BUY TRANSPORT TICKET"
        onPress={buyTrasntportTicket}></CustomButton>
      <CustomButton title="HOTEL RESERVE" onPress={hotelReserve}></CustomButton>
      <CustomButton
        title="USERS TICKETS/HOTELS"
        onPress={userTickets}></CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  tittle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.themeBlue,
  },
  titleContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    marginBottom: 50,
  },
});

export default SelectScreen;
