import React from 'react';
import {View, Text} from 'react-native';

export default function ProductDetailScreen({navigation, route}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'orange',
        alignItems: 'center',
      }}>
      <Text>Sản phẩm có ID : {route.params.product.id}</Text>
      <Text>Tên Sản Phẩm : {route.params.product.name}</Text>
      <Text>Số Tiền : {route.params.product.price}</Text>
    </View>
  );
}
