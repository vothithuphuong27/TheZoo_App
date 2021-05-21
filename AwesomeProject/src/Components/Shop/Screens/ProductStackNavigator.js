import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ProductDetailScreen from './ProductDetailScreen';
import ProductScreen from './ProductScreen';
const Stack = createStackNavigator();
export default function ProductStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Products" component={ProductScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}
