/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, SafeAreaView, Text} from 'react-native';

// COMPONENT
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

export default function CounterApp() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>THANH TOÁN </Text>
      <View style={{flex: 1, padding: 24}}>
        <Products />
        <View style={{marginTop: 5}}>
          <ShoppingCart />
        </View>
      </View>
    </SafeAreaView>
  );
}
