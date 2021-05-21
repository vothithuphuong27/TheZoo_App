import React from 'react';
import {View, Text} from 'react-native';
import SignInScreen from './SignInScreen';
import RegisterScreen from './RegisterScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function index() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{title: 'Đăng nhập', headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{title: 'Đăng ký', headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{title: 'Quên Mật Khẩu', headerShown: false}}
      />
    </Stack.Navigator>
  );
}
