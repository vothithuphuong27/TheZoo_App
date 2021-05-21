import React from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import Product from './components/Product';

import axios from 'axios';
import react from 'react';
// const products = [
//   {
//     id: 1,
//     name: 'QUẦN ÁO',
//     coverImageUrl:
//       'https://ae01.alicdn.com/kf/HTB1ZrrYNXXXXXc9aXXXq6xXFXXXP/New-2016-Hot-Sale-Kids-Overalls-Spring-Autumn-Denim-Jumpsuit-Kids-Children-Cotton-Loose-Blue-Jeans.jpg',
//     price: 20,
//     status: 'In Stock',
//     color: 'red',
//     sizes: ['M', 'L'],
//     freship: true,
//   },
//   {
//     id: 2,
//     name: 'QUẦN ÁO TÂY',
//     coverImageUrl:
//       'https://ae01.alicdn.com/kf/HTB1ZrrYNXXXXXc9aXXXq6xXFXXXP/New-2016-Hot-Sale-Kids-Overalls-Spring-Autumn-Denim-Jumpsuit-Kids-Children-Cotton-Loose-Blue-Jeans.jpg',
//     status: 'In Stock',
//     price: 10,
//     color: 'pink',
//     sizes: ['M', 'L', 'XL'],
//     freship: false,
//   },
// ];

export default function ProductScreen({navigation}) {
  const [products, setProducts] = react.useState([]);
  const [loading, setLoading] = react.useState(false);
  react.useEffect(() => {
    try {
      axios.get('https://training.softech.cloud/api/products').then((res) => {
        setProducts(res.data);
        setLoading(true);
      });
    } catch (error) {
      console.log('error');
      setLoading(false);
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <FlatList
        data={products}
        keyExtractor={(item) => {
          return 'product-' + item.id;
        }}
        renderItem={({item}) => {
          // alert(item.price);
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProductDetail', {product: item});
              }}>
              <Product data={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
