import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ListBannerScreen from './ListBannerScreen';
import EditBannerScreen from './EditBannerScreen';
import CreateBannerScreen from './CreateBannerScreen';
const Stack = createStackNavigator();
export default function index() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListBannerScreen"
        component={ListBannerScreen}
        options={{title: 'ListBannerScreen', headerShown: false}}
      />
      <Stack.Screen
        name="EditBannerScreen"
        component={EditBannerScreen}
        options={{title: 'EditBannerScreen', headerShown: false}}
      />
      <Stack.Screen
        name="CreateBannerScreen"
        component={CreateBannerScreen}
        options={{title: 'Tạo banner', headerShown: true}}
      />
    </Stack.Navigator>
  );
}
