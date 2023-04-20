import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomButton from '../components/customButton';
import CustomInput from '../components/customTextInput';
import FirmTypeButton from '../components/firmTypeButton';
import {RootStackParams} from '../navigation/navigation';
import {colors} from '../theme/colors';
import firestore from '@react-native-firebase/firestore';
import {firm} from '../types/firm';

type FirmAddScreenProps = NativeStackScreenProps<
  RootStackParams,
  'FirmAddScreen'
>;

const FirmAddScreen = ({navigation}: FirmAddScreenProps) => {
  const [firmName, setFirmName] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const [firmType, setFirmType] = useState<'hotel' | 'transport'>('hotel');
  const [disabled, setDisabled] = useState(false);

  const firm: firm = {
    firmName: firmName,
    firmType: firmType,
    discountRate: Number(discountRate),
  };
  const addFirm = async () => {
    try {
      await firestore().collection('firms').add(firm);
      setDisabled(true);
      console.log('Firm added', firm);
    } catch (error) {
      console.error('Error adding firm:', error);
    }
  };
  return (
    <View>
      <Text style={styles.title}>Enter Firm Name</Text>
      <CustomInput
        value={firmName}
        placeHolder="Firm Name"
        onChangeText={setFirmName}
      />
      <Text style={styles.title}>Enter Discount Rate</Text>
      <CustomInput
        value={discountRate}
        placeHolder="Discount Rate"
        onChangeText={setDiscountRate}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <FirmTypeButton name="Hotel" onPress={() => setFirmType('hotel')} />
        <FirmTypeButton
          name="Transport"
          onPress={() => setFirmType('transport')}
        />
      </View>
      <CustomButton title="ADD FIRM" onPress={addFirm} disabled={disabled} />
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.themeBlue,
    marginLeft: 30,
    margin: 5,
  },
});

export default FirmAddScreen;
