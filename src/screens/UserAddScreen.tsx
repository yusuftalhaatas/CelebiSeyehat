import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '../components/customButton';
import CustomInput from '../components/customTextInput';
import {colors} from '../theme/colors';

const UserAddScreen = () => {
  const [userName, setUserNameLocal] = useState('');
  const [name, setNameLocal] = useState('');

  const handleUserNameChange = () => {};
  const handleNameChange = () => {};
  const handleUserAdd = () => {};

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.tittle}>ENTER USER INFO</Text>
      </View>
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>Enter Unique UserName</Text>
      </View>
      <CustomInput
        placeHolder="UserName"
        value={userName}
        onChangeText={handleUserNameChange}
      />
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>Enter Your Name</Text>
      </View>
      <CustomInput
        placeHolder="Your Name"
        value={name}
        onChangeText={handleNameChange}
      />
      <CustomButton title="ADD" onPress={handleUserAdd}></CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
    marginBottom: 50,
  },
  subTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 30,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default UserAddScreen;
