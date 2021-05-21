import React from 'react';
import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './Screens/HomeScreen';
import RegisterScreen from './Screens/RegisterScreen';
import TabNavigator from './TabNavigator';
import Menu1Screen from './Screens/Menu1Screen';
import Menu2Screen from './Screens/Menu2Screen';
const Drawer = createDrawerNavigator();
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="menu 1" component={Menu1Screen} />
      <Drawer.Screen name="menu 2" component={Menu2Screen} />
    </Drawer.Navigator>
  );
}
