/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import Login from './components/Login';
// COMPONENT
export default function CounterApp() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Login />
    </SafeAreaView>
  );
}
