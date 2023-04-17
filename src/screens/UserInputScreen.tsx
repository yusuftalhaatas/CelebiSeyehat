import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomButton from '../components/customButton';
import CustomInput from '../components/customTextInput';
import {RootStackParams} from '../navigation/navigation';
import {colors} from '../theme/colors';

type UserInputScreenProps = NativeStackScreenProps<
  RootStackParams,
  'UserInputScreen'
>;

const UserInputScreen = ({navigation}: UserInputScreenProps) => {
  const [valid, setValid] = useState(false);
  const [name, setName] = useState('');
  const handleMailChange = (name: string) => {
    setName(name);
  };

  const handleUserCheck = () => {
    navigation.navigate('SelectScreen');
  };

  const gotoUserAdd = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.tittle}>USER ENTER</Text>
      </View>
      <CustomInput
        placeHolder="UserName"
        onChangeText={handleMailChange}
        value={name}></CustomInput>
      <CustomButton title="CONTINUE" onPress={handleUserCheck}></CustomButton>
      <View style={styles.userAddContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('UserAddScreen')}>
          <Text style={styles.tittle}>User Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 30,
  },
  userAddContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
  },
  userAddTitle: {
    fontSize: 20,
    color: colors.themeBlue,
  },
});
export default UserInputScreen;
