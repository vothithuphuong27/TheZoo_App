import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {SafeAreaView} from 'react-native';
import Arrow from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useNavigation} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';
import {TouchableRipple} from 'react-native-paper';
import {FancyAlert} from 'react-native-expo-fancy-alerts';

export default function ProductList() {
  const [Products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(0);
  const [productFilter, setProductFilter] = React.useState(Products);
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      getProducts();
    }, [refresh]),
  );

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
        setProducts([]);
        setLoading(false);
      });
  };

  //   React.useEffect(getProducts, [refresh]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Arrow name="arrowleft" style={{}} size={30} />
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold', fontSize: 20, padding: 10}}>
          Danh sách sản phẩm
        </Text>
        <TouchableRipple
          onPress={() => {
            navigation.navigate('CreateProductScreen');
          }}>
          <Arrow name="plus" size={30} />
        </TouchableRipple>
      </View>

      {/* //search */}
      <View
        style={{
          flexDirection: 'row',
          height: 45,
          alignItems: 'center',
          backgroundColor: '#F5F5F8',
        }}>
        <View style={{padding: 10}}>
          <Arrow name="search1" size={20} color="#898B9A" />
        </View>

        <TextInput
          style={{flex: 1}}
          placeholder="Search Products"
          onChangeText={(text) => {
            setProductFilter(Products.filter((u) => u.name.includes(text)));
          }}
        />
      </View>

      <FlatList
        data={productFilter.length > 0 ? productFilter : Products}
        keyExtractor={(item) => {
          return 'Product' + item.id;
        }}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableRipple
                activeOpacity={1}
                rippleColor="red"
                onPress={() => {
                  navigation.navigate('EditProductScreen', {data: item});
                }}>
                <View style={styles.box}>
                  <Image
                    style={styles.image}
                    source={{uri: item.imageUrl[0]}}
                  />
                  <View style={styles.boxContent}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={{color: 'red', fontWeight: '700'}}>
                      {item.price}$
                    </Text>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.icon]}
                    onPress={() => {
                      firestore()
                        .collection('Products')
                        .doc(item.id)
                        .delete()
                        .then(() => {
                          console.log('product updated!');
                          setRefresh(refresh + 1);
                        });
                    }}>
                    <Icon
                      name="delete-forever"
                      style={{lineHeight: 20, color: 'red'}}
                      size={25}></Icon>
                  </TouchableOpacity>
                </View>
              </TouchableRipple>
            </View>
          );
        }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setRefresh(refresh + 1);
            }}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    alignSelf: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    textAlign: 'center',
    paddingLeft: 10,
  },
  box: {
    flex: 1,
    padding: 20,
    marginTop: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  boxContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
    overflow: 'hidden',
    height: 100,
  },
  description: {
    fontSize: 15,
    color: '#646464',
    width: '100%',
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    color: '#151515',
  },
});
