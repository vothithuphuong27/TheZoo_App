import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AppNavigator from './AppNavigator';

import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import TabNavigator from './TabNavigator';
import ProductFireSore from '../Session 11/ProductFireStore';
import ProductDetailScreen from './Screens/ProductDetailScreen';
const Stack = createStackNavigator();

export default class StackNavigationExample extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Product" component={ProductFireSore} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}

        {/* <Stack.Screen name="Tab" component={TabNavigator} /> */}
      </Stack.Navigator>
    );
  }
}
