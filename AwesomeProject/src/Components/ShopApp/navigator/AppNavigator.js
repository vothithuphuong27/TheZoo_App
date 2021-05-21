import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import TabNavigator from './TabNavigator';

const AppNavigator = () => {
  return (
    <NavigationContainer>

      <TabNavigator />
    </NavigationContainer>
  );
};
export default AppNavigator;
