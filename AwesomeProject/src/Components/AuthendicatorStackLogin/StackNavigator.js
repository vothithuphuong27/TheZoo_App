/* eslint-disable react-native/no-inline-styles */
import React from 'react';

// Navigators
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import Loginscreens from './screens/Loginscreens';

// Create stack navigator
const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Loginscreens} />
    </Stack.Navigator>
  );
}
