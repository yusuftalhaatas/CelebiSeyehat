import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '../components/customButton';
import FirmCard from '../components/firmCard';
import {colors} from '../theme/colors';

const buyTrasntportTicket = () => {};
const hotelReserve = () => {};

const SelectScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.tittle}>SELECT</Text>
      </View>
      <CustomButton
        title="BUY TRANSPORT TICKET"
        onPress={buyTrasntportTicket}></CustomButton>
      <CustomButton title="HOTEL RESERVE" onPress={hotelReserve}></CustomButton>
      <FirmCard
        firmName="Türk Hava Yolları"
        type="transport"
        dicountRate={1}></FirmCard>
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
