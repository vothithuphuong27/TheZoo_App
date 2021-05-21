import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProductScreen from './ProductScreen';
import ProductDetailScreen from './ProductDetailScreen';
import EditCommentProduct from './EditCommentProduct';
const Stack = createStackNavigator();

const ProductStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{title: 'Sản Phẩm', headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={{title: 'Chi tiết', headerShown: true}}
      />
      <Stack.Screen
        name="EditCommentProduct"
        component={EditCommentProduct}
        options={{title: 'Chỉnh sửa bình luận', headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default ProductStackNavigator;
