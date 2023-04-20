import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';
import {ticket} from '../types/ticket';

const TicketCard = ({date, start, finish, firmName, no, name}: ticket) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {name}</Text>
      <Text style={styles.text}>Firm: {firmName}</Text>
      <Text style={styles.text}>
        {start}-{finish}
      </Text>
      <Text style={styles.text}>Date:{date}</Text>
      <Text style={styles.text}>Seat No:{no}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    margin: 5,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    backgroundColor: colors.themeWhite,
  },
  container: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: colors.themeBlue,
  },
});
export default TicketCard;
