import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../theme/colors';

type firmProps = {
  name: string;
  onPress: () => void;
};

const FirmTypeButton = ({name, onPress}: firmProps) => {
  return (
    <TouchableOpacity style={styles.firmTypeButton} onPress={onPress}>
      <Text style={styles.title}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  firmTypeButton: {
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: 100,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.themeBlue,
  },
});
export default FirmTypeButton;
