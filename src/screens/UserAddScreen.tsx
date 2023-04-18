import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '../components/customButton';
import CustomInput from '../components/customTextInput';
import {colors} from '../theme/colors';
import {user} from '../types/user';
import firestore from '@react-native-firebase/firestore';
import {setName, setUserName} from '../redux/reducer/userReducer';
import {useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigation/navigation';

type UserAddScreenProps = NativeStackScreenProps<
  RootStackParams,
  'UserAddScreen'
>;

const UserAddScreen = ({navigation}: UserAddScreenProps) => {
  const [userName, setUserNameLocal] = useState('');
  const [name, setNameLocal] = useState('');
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const handleUserNameChange = (userName: string) => {
    setUserNameLocal(userName);
    check();
  };

  const handleNameChange = (name: string) => {
    setNameLocal(name);
    check();
  };
  const check = () => {
    if (userName != '' && name != '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleUserAdd = () => {
    const user: user = {
      name: name,
      userName: userName,
      puan: 0,
    };

    firestore()
      .collection('users')
      .add(user)
      .then(() => {
        console.log('User added!');
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });

    dispatch(setName(name));
    dispatch(setUserName(userName));
    navigation.navigate('UserInputScreen');
  };

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
      <CustomButton
        title="ADD"
        onPress={handleUserAdd}
        disabled={disabled}></CustomButton>
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
