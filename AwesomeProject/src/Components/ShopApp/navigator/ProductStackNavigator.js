import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Category from '../components/Category';
import Product from '../components/Product';

import ProductDetailScreen from '../screens/ProductDetail';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
export default function ProductStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Products" component={Product} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}
