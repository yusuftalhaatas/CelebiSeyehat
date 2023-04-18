import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '../components/customButton';
import {RootStackParams} from '../navigation/navigation';
import {colors} from '../theme/colors';

type AgentyScreenProps = NativeStackScreenProps<
  RootStackParams,
  'AgentyScreen'
>;

const AgentyScreen = ({navigation}: AgentyScreenProps) => {
  const userProcesses = () => {
    navigation.navigate('UserInputScreen');
  };

  const firmProcesses = () => {
    navigation.navigate('FirmsScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.tittle}>ÇELEBİ SEYAHAT ACENTASI</Text>
      </View>
      <CustomButton
        title="USER PROCESSES"
        onPress={userProcesses}></CustomButton>
      <CustomButton
        title="FIRM PROCESSES"
        onPress={firmProcesses}></CustomButton>
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
});
export default AgentyScreen;
