import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import ProductOrderScreen from './ProductOrderScreen';
import EditProfileScreen from './EditProfileScreen';
import AddressStackNavigator from '../AddressStackNavigator';
import StartRateProductScreen from '../ProductStackNavigator/StartRateProductScreen';
import ProductFavoriteScreen from '../ProductStackNavigator/ProductFavoriteScreen';
import ProductDetailScreen from '../ProductStackNavigator/ProductDetailScreen';
import ProductRateScreen from '../ProfileStackNavigator/ProductRateScreen';
import EditCommentProduct from '../ProductStackNavigator/EditCommentProduct';
import ChangePasswordScreen from './ChangePasswordScreen';
const Stack = createStackNavigator();

const ProductStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{title: 'ProfileScreen', headerShown: false}}
      />
      <Stack.Screen
        name="ProductOrderScreen"
        component={ProductOrderScreen}
        options={{title: 'Đơn hàng', headerShown: true}}
      />

      <Stack.Screen
        name="StartRateProductScreen"
        component={StartRateProductScreen}
        options={{title: 'Đánh giá sản phẩm', headerShown: true}}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{title: 'Chỉnh sửa thông tin', headerShown: true}}
      />
      <Stack.Screen
        name="AddressStackNavigator"
        component={AddressStackNavigator}
        options={{title: 'Địa chỉ', headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={{title: 'Chi tiết', headerShown: true}}
      />
      <Stack.Screen
        name="ProductFavoriteScreen"
        component={ProductFavoriteScreen}
        options={{title: 'Sản phẩm yêu thích', headerShown: true}}
      />
      <Stack.Screen
        name="ProductRateScreen"
        component={ProductRateScreen}
        options={{title: 'Đánh giá của tôi', headerShown: true}}
      />
      <Stack.Screen
        name="EditCommentProduct"
        component={EditCommentProduct}
        options={{title: 'Chỉnh sửa bình luận', headerShown: true}}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{title: 'Đổi mật khẩu', headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default ProductStackNavigator;
