import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, Text, View} from 'react-native';
import CustomButton from '../components/customButton';
import {RootStackParams} from '../navigation/navigation';

type SuccesScreesProps = NativeStackScreenProps<
  RootStackParams,
  'SuccessScreen'
>;

const SuccessScreen = ({navigation}: SuccesScreesProps) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Image
        style={{
          height: 300,
          width: 300,
          margin: 10,
          marginLeft: 50,

          justifyContent: 'center',
        }}
        source={require('../../src/assets/success.png')}></Image>
      <Text style={{color: 'green', fontSize: 35, marginLeft: 30}}>
        Succsessful purchase
      </Text>
      <CustomButton
        title="OKAY"
        onPress={() => navigation.navigate('SelectScreen')}></CustomButton>
    </View>
  );
};

export default SuccessScreen;
