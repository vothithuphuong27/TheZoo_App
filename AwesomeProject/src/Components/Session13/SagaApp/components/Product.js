import React from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../actions';
export default function product() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.sagaReducer);
  // console.log(products);
  return (
    <View>
      <Button
        title="Get Product"
        onPress={() => {
          dispatch(getProducts());
        }}></Button>
    </View>
  );
}
