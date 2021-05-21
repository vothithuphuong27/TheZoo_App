import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ListCustomerChatScreen from './ListCustomerChat';
import ChatCustomerScreen from './ChatCustomerScreen';

const Stack = createStackNavigator();

const ProductStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListCustomerChatScreen"
        component={ListCustomerChatScreen}
        options={{title: 'Danh sách tin nhắn', headerShown: false}}
      />
      <Stack.Screen
        name="ChatCustomerScreen"
        component={ChatCustomerScreen}
        options={{title: 'ChatCustomerScreen', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ProductStackNavigator;
