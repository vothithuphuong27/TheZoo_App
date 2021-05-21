import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ListUserChatScreen from './ListUserChatScreen';
import ChatScreen from './ChatScreen';

const Stack = createStackNavigator();

export default function ChatApplication() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListUserChatScreen"
        component={ListUserChatScreen}
        options={{title: 'ListUserChatScreen', headerShown: false}}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{title: 'Đăng nhập', headerShown: false}}
      />
    </Stack.Navigator>
  );
}
