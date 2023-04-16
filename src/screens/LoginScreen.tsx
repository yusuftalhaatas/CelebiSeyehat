import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '../components/customButton';
import CustomInput from '../components/customTextInput';

const LoginScreen = () => {
  const [email, setEmailLocal] = useState('');
  const [password, setPasswordLocal] = useState('');

  const handleNameChange = (name: string) => {
    setEmailLocal(email);
  };
  const handlePasswordChange = (password: string) => {};
  const handleNavigate = () => {};
  return (
    <View style={styles.container}>
      <View>
        <CustomInput
          placeHolder="Agency Mail"
          value={email}
          onChangeText={handleNameChange}
        />
        <CustomInput
          placeHolder="Password"
          value={password}
          onChangeText={handlePasswordChange}
        />
      </View>
      <CustomButton title="CONTINUE" onPress={handleNavigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default LoginScreen;
