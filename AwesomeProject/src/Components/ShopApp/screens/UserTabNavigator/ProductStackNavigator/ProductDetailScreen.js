import React from 'react';
import {View, Text, Button} from 'react-native';

import ProductDetail from '../../../modules/main/components/ProductDetail';

const ProductDetailScreen = ({navigation, route}) => {
  // console.log(route.params);
  return <ProductDetail data={route.params.product} />;
};

export default ProductDetailScreen;
