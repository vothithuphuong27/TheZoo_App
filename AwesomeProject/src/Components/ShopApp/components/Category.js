import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import Product from './Product';
export default function Category({data}) {
  const [Products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState([]);

  const getProducts = () => {
    const data = [];
    firestore()
      .collection('Products')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const product = documentSnapshot.data();
          product.id = documentSnapshot.id;
          data.push(product);
        });

        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Alert.alert('Error', 'Something is wrong!');
        setProducts([]);
        setLoading(false);
      });
  };

  React.useEffect(getProducts, []);
  const getCategories = () => {
    const data = [];
    firestore()
      .collection('Categories')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const category = documentSnapshot.data();
          category.id = documentSnapshot.id;
          console.log(category);
          data.push(category);
        });

        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Alert.alert('Error', 'Something is wrong!');
        setCategories([]);
        setLoading(false);
      });
  };
  React.useEffect(getCategories, []);
  function CategoyList() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            backgroundColor:
              selectedCategory?.id == item.id ? '#FF6C44' : 'white',
            width: 146,
            height: 48,
            borderRadius: 8,
            marginRight: 15,
            ...styles.shadow,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          onPress={() => {
            OnSelectedCategory(item);
          }}>
          <Image
            source={{
              uri: item.images,
            }}
            style={{width: 30, height: 30}}
          />
          <Text
            style={{
              marginLeft: 10,
              color: selectedCategory?.id == item.id ? 'white' : 'black',
              fontWeight: '700',
              fontSize: 15,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{padding: 20}}>
        <FlatList
          data={categories}
          horizontal
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: 10}}
        />
      </View>
    );
  }
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [ProductFilter, setProductList] = React.useState([]);

  function OnSelectedCategory(item) {
    let ProductList = Products.filter((a) => a.categories.includes(item.id));
    setProductList(ProductList);
    setSelectedCategory(item);
  }

  return (
    <View>
      {CategoyList()}
      {!loading && (
        <Product data={!selectedCategory ? Products : ProductFilter} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
