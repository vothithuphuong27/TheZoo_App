import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './MainScreen.js';
import NotificationDetailScreen from './NotificationDetailScreen';
const Stack = createStackNavigator();

export default function index() {
  return (
    <Stack.Navigator
      // headerMode="none"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Notification"
        component={MainScreen}
        options={{title: 'Thông báo', headerShown: false}}
      />
      <Stack.Screen
        name="NotificationDetailScreen"
        component={NotificationDetailScreen}
        options={{title: 'Chi tiết thông báo', headerShown: true}}
      />
    </Stack.Navigator>
  );
}
