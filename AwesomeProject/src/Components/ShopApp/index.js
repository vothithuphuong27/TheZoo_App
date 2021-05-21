/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, SafeAreaView, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './navigator/TabNavigator';
import StackNavigator from './navigator/StackNavigator';
// COMPONENT
export default function CounterApp() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
