import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AgentyScreen from '../screens/AgentyScreen';
import SelectScreen from '../screens/SelectScreen';
import UserAddScreen from '../screens/UserAddScreen';
import UserInputScreen from '../screens/UserInputScreen';

export type RootStackParams = {
  LoginScreen: undefined;
  AgentyScreen: undefined;
  UserInputScreen: undefined;
  SelectScreen: undefined;
  UserAddScreen: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
