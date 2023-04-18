import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {firm} from '../types/firm';

const FirmCard = ({firmName, firmType, discountRate}: firm) => {
  return (
    <View style={styles.cardContainer}>
      <View>
        <Text style={styles.title}>{firmName}</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.subtitle}>Type:{firmType}</Text>
        <Text style={styles.subtitle}>Discount:%{discountRate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    margin: 15,
    padding: 10,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
  },
});
export default FirmCard;
