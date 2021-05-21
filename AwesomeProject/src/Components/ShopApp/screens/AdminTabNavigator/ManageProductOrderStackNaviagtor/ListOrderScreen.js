import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Arrow from 'react-native-vector-icons/AntDesign';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
export default function ListOrderScreen() {
  const [loading, setLoading] = React.useState(true);
  const [Orders, setOrder] = React.useState([]);
  const [ProductOrder, SetProductOrder] = React.useState(Orders);
  const [refresh, setRefresh] = React.useState(0);
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      getOrders();
    }, [refresh]),
  );

  const getOrders = () => {
    const data = [];
    firestore()
      .collection('Orders')
      // .where('status', '!=', 'delivery')
      // .orderBy('createdDate', 'desc')
      .orderBy('createdDate', 'desc')
      .get()
      .then((querySnapshot) => {
        // lặp qua từng document
        querySnapshot.forEach((documentSnapshot) => {
          const Order = documentSnapshot.data();
          Order.id = documentSnapshot.id;
          data.push(Order);
        });
        // set state
        setOrder(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setOrder([]);
      });
  };
  React.useEffect(getOrders, []);

  return (
    <React.Fragment>
      <View
        style={{
          flexDirection: 'row',
          height: 45,
          alignItems: 'center',
          backgroundColor: '#F5F5F8',
          borderWidth: 1,
          borderRadius: 10,
          borderColor: '#898B9A',
          marginHorizontal: 3,
        }}>
        <View style={{padding: 10}}>
          <Arrow name="search1" size={20} color="#898B9A" />
        </View>

        <TextInput
          style={{flex: 1}}
          placeholder="Search Category"
          onChangeText={(text) => {
            SetProductOrder(Orders.filter((u) => u.Name.includes(text)));
            // setSelectedCategory(null);
          }}
        />
      </View>
      <FlatList
        style={styles.contentList}
        columnWrapperStyle={styles.listContainer}
        data={ProductOrder.length > 0 ? ProductOrder : Orders}
        keyExtractor={(item) => {
          return item.id;
        }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setRefresh(refresh + 1);
            }}
          />
        }
        renderItem={({item}) => {
          // console.log(item);
          return (
            <SafeAreaView>
              {item.status !== 'delivery' && item.status !== 'cancel order' && (
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.card}
                    onPress={() => {
                      navigation.navigate('ProductStateScreen', {data: item});
                    }}>
                    {item.productOrders.map((e, index) => (
                      <View key={'product' + index}>
                        <Image
                          style={styles.image}
                          source={{uri: e.products.imageUrl[0]}}
                        />
                      </View>
                    ))}
                    <View
                      style={{
                        fontSize: 14,
                        flex: 1,
                        fontWeight: '700',
                        alignSelf: 'center',
                        alignItems: 'center',
                        color: 'green',
                      }}>
                      <Text style={styles.name}>{item.Name}</Text>
                      <Text style={{color: 'black'}}>Trạng thái đơn hàng </Text>
                      <Text style={{color: 'red'}}>
                        {item.status == 'confirmed'
                          ? 'đang chờ duyệt '
                          : item.status}
                      </Text>
                      <Text style={styles.followButtonText}>
                        Ngày đặt: {''}
                        {item.createdDate.toDate().getDate()}
                        {'/'}
                        {item.createdDate.toDate().getMonth() + 1}
                        {'/'}
                        {item.createdDate.toDate().getFullYear()}{' '}
                        {item.createdDate.toDate().toLocaleTimeString('vi_VN')}
                      </Text>
                    </View>

                    {/* <View style={styles.cardContent}>
              <Text style={styles.nameOrder}>{item.Name}</Text>
              <Text style={styles.name}>{e.products.name}</Text>
              <Text style={styles.price}>{e.products.price}$</Text>
              <Text style={styles.address}>{item.Address}</Text>
              <TouchableOpacity
                style={styles.followButton}
                onPress={() => this.clickEventListener(item)}>
                <Text style={styles.followButtonText}>
                  {item.createdDate.toDate().getMonth()}
                  {'/'}
                  {item.createdDate.toDate().getDate()}
                  {'/'}
                  {item.createdDate.toDate().getFullYear()}{' '}
                  {item.createdDate.toDate().toLocaleTimeString('vi_VN')}
                </Text>
              </TouchableOpacity>
            </View> */}
                  </TouchableOpacity>
                </View>
              )}
            </SafeAreaView>
          );
        }}
      />
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#ebf0f7',
    justifyContent: 'center',
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
  },
  image: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderRadius: 10,
  },

  card: {
    marginHorizontal: 8,
    width: '95%',
    borderWidth: 1,
    borderColor: 'green',
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
  },
  nameOrder: {
    fontSize: 13,
    flex: 1,
    alignSelf: 'center',
    color: '#3399ff',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    flex: 1,
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    flex: 1,
    fontWeight: '700',
    alignSelf: 'center',
    color: 'red',
  },
  price: {
    fontSize: 14,
    flex: 1,
    fontWeight: '700',
    alignSelf: 'center',
    color: 'red',
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 130,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'green',
  },
  followButtonText: {
    color: 'green',
    fontSize: 12,
  },
});
