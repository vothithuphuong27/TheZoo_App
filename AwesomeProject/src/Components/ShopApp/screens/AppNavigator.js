import React from 'react';
import {View, Text} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import LoginStackNavigator from './LoginStackNavigator';
import AdminTabNavigator from './AdminTabNavigator/';
import auth from '@react-native-firebase/auth';
import UserTabNavigator from './UserTabNavigator';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const AuthenticationStackNavigator = () => {
  const signedInUser = useSelector((state) => state.auth.signedInUser);
  if (!signedInUser) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={'routes.AUTH_SIGNIN_STACK_NAVIGATOR'}
          component={LoginStackNavigator}
        />
      </Stack.Navigator>
    );
  }
  return signedInUser.profile.role === 'User' ? (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={'routes.USER_TAB_NAVIGATOR'}
        component={UserTabNavigator}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={'routes.ADMIN_TAB_NAVIGATOR'}
        component={AdminTabNavigator}
      />
    </Stack.Navigator>
  );
};
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AuthenticationStackNavigator />
    </NavigationContainer>
  );
};
export default AppNavigator;
