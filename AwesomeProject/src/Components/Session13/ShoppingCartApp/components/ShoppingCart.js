import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removecart} from '../actions';
import numeral from 'numeral';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.shoppingReducer.addedProducts);

  const getTotal = () => {
    let result = data.reduce(
      (total, item) =>
        total +
        (item.product.price * item.quantity * (100 - item.product.discount)) /
          100,
      0,
    );
    return numeral(result).format('0,0');
  };
  const renderItem = ({item}) => {
    return (
      <View style={{flex: 1, marginVertical: 2}}>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text>{item.product.name}</Text>
          </View>
          <View style={{justifyContent: 'center', marginRight: 8}}>
            <Text style={{paddingRight: 2}}>{item.product.price}</Text>
          </View>
          <Text style={{paddingRight: 3}}>{item.quantity}</Text>
          <View style={{justifyContent: 'center', paddingRight: 8}}>
            <Text style={{fontSize: 12}}>{item.product.discount}%</Text>
          </View>
          <TouchableOpacity
            style={{padding: 4}}
            onPress={() => {
              dispatch(removecart(item.product.id));
            }}>
            <Icon name="cart-off" size={16} color="#d63031" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View>
      <Text>GIỎ HÀNG</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => 'cart-' + index.toString()}
      />
      <Text>TOTAL : {getTotal()}</Text>
    </View>
  );
}
