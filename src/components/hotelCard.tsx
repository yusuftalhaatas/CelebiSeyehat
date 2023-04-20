import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';
import {hotel} from '../types/hotel';

const HotelCard = ({firmName, city, firmType, roomNo, date, name}: hotel) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name: {name}</Text>
      <Text style={styles.title}>Hotel Name: {firmName}</Text>
      <Text style={styles.title}>Date: {date}</Text>
      <Text style={styles.title}>Room No: {roomNo}</Text>
      <Text style={styles.title}>City: {city}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: colors.themeBlue,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    margin: 5,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    backgroundColor: colors.themeWhite,
  },
});
export default HotelCard;
