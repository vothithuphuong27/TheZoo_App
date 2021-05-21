import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigationExample from './StackNavigationExample';
import TabNavigator from './TabNavigator';
import DrawerNavigator from './DrawerNavigator';
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
      {/* <TabNavigator /> */}
      {/* <DrawerNavigator /> */}
    </NavigationContainer>
  );
};
export default AppNavigator;
