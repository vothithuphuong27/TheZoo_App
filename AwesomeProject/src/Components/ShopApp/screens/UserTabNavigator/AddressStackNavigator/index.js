import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AddressScreen from './AddressScreen';
const Stack = createStackNavigator();

const AddressStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddressScreen"
        component={AddressScreen}
        options={{title: 'địa chỉ', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AddressStackNavigator;
