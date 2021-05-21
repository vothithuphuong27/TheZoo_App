/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView} from 'react-native';
import ShoppingCarts from '../../modules/main/components/ShoppingCarts';
const Stack = createStackNavigator();
import {createStackNavigator} from '@react-navigation/stack';
import AddressStackNavigator from './AddressStackNavigator';
import AddAddress from './AddressStackNavigator/AddAddress';
import EditAddress from './AddressStackNavigator/EditAddress';
import CongratulationScreen from './ProductStackNavigator/CongratulationScreen';
import ProductOrderScreen from './ProfileStackNavigator/ProductOrderScreen';
import ProductScreen from '../../screens/UserTabNavigator/ProductStackNavigator/ProductScreen';
const ShoppingCartScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator>
        <Stack.Screen
          name="ShoppingCarts"
          component={ShoppingCarts}
          options={{title: 'Sản Phẩm', headerShown: false}}
        />
        <Stack.Screen
          name="AddressStackNavigator"
          component={AddressStackNavigator}
          options={{title: 'Danh sách địa chỉ', headerShown: true}}
        />
        <Stack.Screen
          name="EditAddress"
          component={EditAddress}
          options={{title: 'Sửa địa chỉ', headerShown: true}}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{title: 'Thêm địa chỉ', headerShown: true}}
        />
        <Stack.Screen
          name="CongratulationScreen"
          component={CongratulationScreen}
          options={{title: 'thanh toán thành công', headerShown: false}}
        />
        <Stack.Screen
          name="ProductOrderScreen"
          component={ProductOrderScreen}
          options={{title: 'Đơn hàng', headerShown: true}}
        />
        <Stack.Screen
          name="ProductScreen"
          component={ProductScreen}
          options={{title: 'Danh sách sản phẩm', headerShown: false}}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default ShoppingCartScreen;
