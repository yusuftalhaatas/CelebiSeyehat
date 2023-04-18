import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ticket} from '../types/ticket';

const TicketCard = ({date, start, finish, firmName, no, name}: ticket) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{firmName}</Text>
      <Text style={styles.text}>
        {start}-{finish}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.text}>Date:{date}</Text>
        <Text style={styles.text}>Seat No:{no}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 30,
    margin: 5,
  },
  container: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    margin: 20,
  },
});
export default TicketCard;
