import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AgentyScreen from '../screens/AgentyScreen';
import FirmAddScreen from '../screens/FirmAddScreen';
import FirmsScreen from '../screens/FirmsScreen';
import HotelPaymentScreen from '../screens/HotelPaymentScreen';
import HotelReserveScreen from '../screens/HotelReserveScreen';
import PayingScreen from '../screens/PayingScreen';
import SelectScreen from '../screens/SelectScreen';
import SuccessScreen from '../screens/SuccessScreen';
import TicketBuyScreen from '../screens/TicketBuyScreen';
import UserAddScreen from '../screens/UserAddScreen';
import UserInputScreen from '../screens/UserInputScreen';
import UserTicketsHotelsScreen from '../screens/UserTicketsHotelsScreen';

export type RootStackParams = {
  LoginScreen: undefined;
  AgentyScreen: undefined;
  UserInputScreen: undefined;
  SelectScreen: undefined;
  UserAddScreen: undefined;
  TicketBuyScreen: undefined;
  FirmsScreen: undefined;
  PayingScreen: undefined;
  SuccessScreen: undefined;
  FirmAddScreen: undefined;
  HotelReserveScreen: undefined;
  UserTicketsHotelsScreen: undefined;
  HotelPaymentScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AgentyScreen">
        <Stack.Screen
          name="SelectScreen"
          component={SelectScreen}></Stack.Screen>
        <Stack.Screen
          name="UserInputScreen"
          component={UserInputScreen}></Stack.Screen>
        <Stack.Screen
          name="AgentyScreen"
          component={AgentyScreen}></Stack.Screen>
        <Stack.Screen
          name="UserAddScreen"
          component={UserAddScreen}></Stack.Screen>
        <Stack.Screen
          name="TicketBuyScreen"
          component={TicketBuyScreen}></Stack.Screen>
        <Stack.Screen name="FirmsScreen" component={FirmsScreen}></Stack.Screen>
        <Stack.Screen
          name="PayingScreen"
          component={PayingScreen}></Stack.Screen>
        <Stack.Screen
          name="SuccessScreen"
          component={SuccessScreen}></Stack.Screen>
        <Stack.Screen
          name="FirmAddScreen"
          component={FirmAddScreen}></Stack.Screen>
        <Stack.Screen
          name="HotelReserveScreen"
          component={HotelReserveScreen}></Stack.Screen>
        <Stack.Screen
          name="UserTicketsHotelsScreen"
          component={UserTicketsHotelsScreen}></Stack.Screen>
        <Stack.Screen
          name="HotelPaymentScreen"
          component={HotelPaymentScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
