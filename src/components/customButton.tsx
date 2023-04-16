import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../theme/colors';

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const CustomButton = ({title, onPress, disabled}: ButtonProps) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={styles.buttonContainer}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.themeBlue,
    padding: 10,
    borderRadius: 17,
    marginHorizontal: 50,
    marginVertical: 10,
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CustomButton;
