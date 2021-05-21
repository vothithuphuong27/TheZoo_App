import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

const ActionButton = ({data}) => {
  return (
    <TouchableOpacity
      style={{
        height: 48,
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0984e3',
        borderRadius: 6,
      }}
      onPress={() => {
        alert(data.name);
      }}>
      <Icon name="shopping-cart" color="white" size={16} />
    </TouchableOpacity>
  );
};

function Product({data}) {
  return (
    <View
      style={{
        flex: 1,
        margin: 8,
      }}>
      <Image
        style={{
          height: 160,
          width: '100%',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
        resizeMode="cover"
        source={{
          uri: data.imageUrl,
        }}
      />
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 16,
          backgroundColor: 'white',
        }}>
        <Text style={{fontWeight: '700'}}>{data.name}</Text>
        <View height={4} />
        {/* <Text style={{fontWeight: '400', color: 'grey', fontSize: 12}}>
          {data.category.name}
        </Text> */}
      </View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}>
        <View style={{flex: 1, paddingHorizontal: 24, paddingVertical: 24}}>
          <Text style={{fontWeight: '700', color: 'black'}}>
            {data.price} $
          </Text>
        </View>
        <View
          style={{
            paddingRight: 12,
            paddingVertical: 12,
          }}>
          <ActionButton data={data} />
        </View>
      </View>
    </View>
  );
}

export default function ProductFireSore() {
  const [Products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
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

  return (
    <View>
      {loading && (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      )}
      {!loading && (
        <FlatList
          data={Products}
          numColumns={2}
          keyExtractor={(p, i) => 'Product+' + p.id}
          renderItem={({item}) => {
            return <Product data={item} />;
          }}
        />
      )}
    </View>
  );
}
