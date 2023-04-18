import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomButton from '../components/customButton';
import CustomInput from '../components/customTextInput';
import {RootStackParams} from '../navigation/navigation';
import {colors} from '../theme/colors';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {setName, setUserName} from '../redux/reducer/userReducer';

type UserInputScreenProps = NativeStackScreenProps<
  RootStackParams,
  'UserInputScreen'
>;

const UserInputScreen = ({navigation}: UserInputScreenProps) => {
  const [valid, setValid] = useState(false);
  const [userName, setUserNameLocal] = useState('');
  const dispatch = useDispatch();
  const handleNameChange = (userName: string) => {
    setUserNameLocal(userName);
    firestore()
      .collection('users')
      .where('userName', '==', userName)
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          console.log('Doküman mevcut');
          setValid(true);
          firestore()
            .collection('users')
            .where('userName', '==', userName)
            .get()
            .then(querySnapshot => {
              if (!querySnapshot.empty) {
                console.log('isim mevcut');
                const doc = querySnapshot.docs[0];
                const user = doc.data();
                const name = user.name;
                console.log('Name:', name);
                dispatch(setName(name));
                dispatch(setUserName(userName));
              } else {
                console.log('isim bulunamadı');
              }
            })
            .catch(error => {
              console.error('Hata:', error);
            });
        } else {
          console.log('Doküman bulunamadı');
          setValid(false);
        }
      })
      .catch(error => {
        console.error('Hata:', error);
      });
  };

  const handleUserCheck = () => {
    console.log(userName);
    navigation.navigate('SelectScreen');
  };

  const gotoUserAdd = () => navigation.navigate('UserAddScreen');

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.tittle}>USER ENTER</Text>
      </View>
      <CustomInput
        placeHolder="UserName"
        onChangeText={handleNameChange}
        value={userName}></CustomInput>
      {valid ? (
        <Text style={[styles.alertText, {color: 'green'}]}>
          Correct usurname
        </Text>
      ) : (
        <Text style={[styles.alertText, {color: 'red'}]}>Invalid username</Text>
      )}
      <CustomButton
        title="CONTINUE"
        onPress={handleUserCheck}
        disabled={!valid}></CustomButton>
      <View style={styles.userAddContainer}>
        <TouchableOpacity onPress={gotoUserAdd}>
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
  alertText: {
    marginLeft: 30,
  },
});
export default UserInputScreen;
