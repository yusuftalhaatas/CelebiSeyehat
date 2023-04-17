import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {firm} from '../types/firm';

const FirmCard = ({firmName, type, dicountRate}: firm) => {
  return (
    <View style={styles.cardContainer}>
      <View>
        <Text>{firmName}</Text>
      </View>
      <View>
        <Text>Type:{type}</Text>
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
});
export default FirmCard;
