import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {addtocart} from '../actions';
import {useDispatch} from 'react-redux';

const products = [
  {id: 1, name: 'iPhone 6', price: 600, discount: '20'},
  {id: 2, name: 'iPhone 7', price: 800, discount: '5'},
  {id: 3, name: 'iPhone 8', price: 1000, discount: '0'},
  {id: 4, name: 'iPhone X', price: 1200, discount: '0'},
];
export default function Products() {
  const dispatch = useDispatch();
  const renderItem = ({item}) => {
    return (
      <View style={{flex: 1, marginVertical: 2}}>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text>{item.name}</Text>
          </View>
          <View style={{justifyContent: 'center', marginRight: 8}}>
            <Text style={{paddingRight: 2}}>{item.price}</Text>
          </View>
          <View style={{justifyContent: 'center', paddingRight: 8}}>
            <Text style={{fontSize: 12}}>{item.discount}%</Text>
          </View>
          <TouchableOpacity
            style={{padding: 4}}
            onPress={() => {
              dispatch(addtocart(item, 1));
            }}>
            <Icon name="cart" size={16} color="#0984e3" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View>
      <Text>Product List</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item, index) => 'product-' + index.toString()}
      />
    </View>
  );
}
