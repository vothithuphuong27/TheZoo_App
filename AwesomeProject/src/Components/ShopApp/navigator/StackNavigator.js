import React from 'react';

// Navigators
import {createStackNavigator} from '@react-navigation/stack';

// Screens

import LoginScreen from '../screens/LoginScreen';

import TabNavigator from './TabNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

// Create stack navigator
const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: true}}>
      {/* <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: true,
        }}
      /> */}
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
