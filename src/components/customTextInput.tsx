import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

type InputProps = {
  placeHolder: string;
  onChangeText: (input: string) => void;
  value: string;
};

const CustomInput = ({placeHolder, onChangeText, value}: InputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeHolder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    paddingLeft: 10,
  },
  inputText: {
    fontSize: 25,
  },
});
export default CustomInput;
