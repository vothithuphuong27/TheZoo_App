import React from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
// Navigators
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StackNavigator from './StackNavigator';
import TabNavigator from './TabNavigator';
const Stack = createStackNavigator();

const AuthendicatorStack = () => {
  const [signedInUser, setSignedInUser] = React.useState(null);

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    if (user) {
      setSignedInUser(user);
    } else {
      setSignedInUser(null);
    }
  };

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Not signed in
  if (!signedInUser) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="StackNavigator" component={StackNavigator} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
};
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <AuthendicatorStack />
    </NavigationContainer>
  );
}
