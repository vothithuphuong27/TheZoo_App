import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import colors from '../../../constants/color';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from 'react-native-paper';
import {Card, Chip, TouchableRipple, Subheading} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Animated from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';

const data = [
  {
    id: 1,
    name: 'Giảm 50k cho đơn hàng trên 200k',
    image: 'https://img.icons8.com/clouds/100/000000/groups.png',
    Totalorder: 200,
    discount: 50,
  },
  {
    id: 2,
    name: 'Giảm 100k cho đơn hàng trên 5000k',
    image: 'https://img.icons8.com/color/100/000000/real-estate.png',
    Totalorder: 5000,
    discount: 500,
  },
];
import BottomSheet from 'reanimated-bottom-sheet';
import {
  increaseCartAction,
  decreaseCartAction,
  removeFromCartAction,
  clearCartAction,
} from '../../main/actions';
import {Icon} from 'react-native-elements';
import auth, {firebase} from '@react-native-firebase/auth';
import FirestoreService from '../../../services/FirestoreService';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconRight from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';

import numeral from 'numeral';

export default function ShoppingCarts({route}) {
  const [discount, setDiscount] = React.useState(0);
  const [useDiscount, setUseDiscount] = React.useState(null);
  const [vouchers, setVoucher] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  useFocusEffect(
    React.useCallback(() => {
      getVouchers();
    }, []),
  );
  const getVouchers = () => {
    const data = [];
    firestore()
      .collection('Voucher')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const v = documentSnapshot.data();
          v.id = documentSnapshot.id;
          data.push(v);
        });

        setVoucher(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Alert.alert('Error', 'Something is wrong!');
        setVoucher([]);
        setLoading(false);
      });
  };
  // React.useEffect(getVouchers, []);

  const getAddress = () => {
    if (route.params) {
      let address = route.params.address.address;

      return address;
    } else {
      return false;
    }
  };
  const getName = () => {
    if (route.params) {
      let name = route.params.address.name;

      return name;
    } else {
      return false;
    }
  };
  const getPhone = () => {
    if (route.params) {
      let phone = route.params.address.phone;

      return phone;
    } else {
      return false;
    }
  };
  const navigation = useNavigation();
  const ShoppingCarts = useSelector(
    (state) => state.main.shoppingCart.addedCartList,
  );
  const signedInUser = useSelector((state) => state.auth.signedInUser);

  // console.log(signedInUser.carts);
  const [Products, setProducts] = React.useState(null);

  const getTotal = () => {
    {
      let result = ShoppingCarts.reduce(
        (total, item) =>
          total + (item.products.price * item.quantity * 100) / 100,
        0,
      );

      return result;
    }
  };
  var found = ShoppingCarts.filter((item) => item.userid === signedInUser?.uid);
  function SendNotification() {
    // before
    // this.setState({loading: true});
    // axios
    const url = 'https://onesignal.com/api/v1/notifications';
    const data = {
      app_id: '6ec8c890-6818-4f8a-9424-85935856d8bd',
      include_player_ids: ['8fb9570e-82d8-40c5-bb6a-ba7c1cd4f910'],
      large_icon: 'ic_action_cloud_upload',
      android_group: 'group-1',
      android_group_message: {en: 'You have $[notif_count] new messages'},
      ios_badgeType: 'Increase',
      ios_badgeCount: 1,
      thread_id: 1,
      summary_arg_count: 1,
      summary_arg: 'React Native',
      body: 'Đặt hàng ',
      type: 'private',
      createdTime: firestore.Timestamp.now(),
      title: 'Thông báo đặt hàng từ ' + route.params.address.name,
      userUid: signedInUser.uid,
      // type: 'public',
      headings: {
        en: 'Bạn có một đơn hàng từ ' + route.params.address.name,
      },
      contents: {
        en: 'Đặt hàng',
      },
      // big_picture:
      //   'https://media-cdn.laodong.vn/Storage/NewsPortal/2020/4/29/802088/Huan-Hoa-Hong.jpg?w=414&h=276&crop=auto&scale=both',
      // ios_attachments: {
      //   id1:
      //     'https://images.unsplash.com/photo-1530555328699-3ac77bc66854?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      // },
    };

    axios
      .post(url, data)
      .then((response) => {
        firestore()
          .collection('Notifications')
          .add({
            body: data.body,
            createdTime: data.createdTime,
            title: data.title,
            type: data.type,
            content: data.contents,
            userUid: data.userUid,
          })
          .then((ref) => {
            // OK
            // TODO: Send a email to customers (THANK YOU)
            // TODO: Send notification to call center
            ref
              .get()
              .then((documentSnapshot) => {
                let createdOrder = documentSnapshot.data();
                createdOrder.id = documentSnapshot.id;
                console.log(createdOrder);
                // resolve(createdOrder);
              })
              .catch((error) => {
                console.log(error);
              });
          });
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
      });
  }
  const dispatch = useDispatch();
  const renderItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            borderColor: colors.PRIMARY_BORDER,
            borderWidth: 1,
          }}>
          <View style={{flex: 1}}>
            <FastImage
              style={{
                borderRadius: 8,
                height: 90,
                width: '100%',
                flexDirection: 'row',
                marginVertical: 10,
                padding: 4,

                // backgroundColor: colors.PRIMARY_BORDER,
              }}
              resizeMode="contain"
              source={{
                uri: item.products.imageUrl[0],
                priority: FastImage.priority.normal,
              }}
            />
          </View>
          <View style={{flex: 2, backgroundColor: 'white'}}>
            <Text style={{fontWeight: '700', fontSize: 18}}>
              {item.products.name}
            </Text>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 20,
                color: 'green',
                textAlign: 'right',
              }}>
              {item.products.price}$
            </Text>
            <Text> Instock</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableRipple
                onPress={() => dispatch(decreaseCartAction(item.products, 1))}>
                <Icon
                  name="minus-circle"
                  type="font-awesome"
                  color={colors.PRIMARY}
                  size={25}
                />
              </TouchableRipple>
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 3,
                  borderColor: colors.PRIMARY_BORDER,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontWeight: '400'}}>{item.quantity}</Text>
              </View>

              <TouchableRipple
                onPress={() =>
                  dispatch(
                    increaseCartAction(item.products, 1, signedInUser.uid),
                  )
                }>
                <Icon
                  name="plus-circle"
                  type="font-awesome"
                  color={colors.PRIMARY}
                  size={25}
                />
              </TouchableRipple>
              <TouchableRipple
                onPress={() =>
                  dispatch(removeFromCartAction(item.products.id))
                }>
                <Icon
                  style={{marginHorizontal: 16}}
                  name="cart-remove"
                  type="material-community"
                  color={colors.DARK_RED}
                  size={25}
                />
              </TouchableRipple>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const sheetRef = React.useRef(null);
  const renderContent = () => (
    <View style={{backgroundColor: 'white', padding: 16, height: 450}}>
      <FlatList
        style={{}}
        data={vouchers}
        keyExtractor={(item) => {
          return 'voucher' + item.id;
        }}
        renderItem={({item}) => {
          let mm = item.expired.toDate().getMonth() + 1;
          let dd = item.expired.toDate().getDate();
          let yyyy = item.expired.toDate().getFullYear();
          return (
            <React.Fragment>
              {firestore.Timestamp.now() < item.expired && (
                <View style={styles.card} onPress={() => {}}>
                  <Image style={styles.image} source={{uri: item.image}} />
                  <View style={styles.cardContent}>
                    <Text style={styles.name}>{item.name}</Text>

                    <Text style={{color: 'red', fontSize: 13}}>
                      Hết hạn: {dd + '/' + mm + '/' + yyyy} {''}
                    </Text>

                    <Button
                      style={{width: '80%', marginVertical: 10}}
                      // disabled={getTotal() > item.Totalorder ? false : true}
                      disabled={
                        useDiscount != item.id && getTotal() > item.Totalorder
                          ? false
                          : true
                      }
                      mode="contained"
                      color="#1dd1a1"
                      borderRadius="20"
                      onPress={() => {
                        // setUseDiscount(useDiscount);
                        if (useDiscount == item.id) {
                          setUseDiscount(null);
                        } else {
                          setUseDiscount(item.id);
                          setDiscount(item.discount);
                        }

                        // setUseDiscount(null);
                        sheetRef.current.snapTo(1);
                      }}>
                      <Text style={styles.followButtonText}>
                        {useDiscount == item.id && discount > 0
                          ? 'Đang sử dụng'
                          : 'Sử Dụng'}
                      </Text>
                    </Button>
                    {useDiscount == item.id && discount > 0 && (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                          position: 'absolute',
                          bottom: 3,
                          right: 3,

                          borderRadius: 3,
                          borderWidth: 0.5,
                          borderColor: '#7efff5',
                          backgroundColor: '#7efff5',
                        }}
                        onPress={() => {
                          setUseDiscount(null);
                          setDiscount(null);
                        }}>
                        <Text style={{textAlign: 'center', fontSize: 13}}>
                          bỏ chọn
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
            </React.Fragment>
          );
        }}
      />
    </View>
  );
  // console.log(discount);
  const renderHeader = () => (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            width: 40,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#00000040',
            marginBottom: 10,
          }}
        />
      </View>
    </View>
  );
  return (
    <View style={{flex: 1, padding: 12, backgroundColor: 'white'}}>
      {/* {getTotal() == 0 && (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>Bạn chưa có sản phẩm</Text>
        </View>
      )} */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('AddressStackNavigator');
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {!getAddress() && (
            <Text
              style={{
                textAlign: 'center',
                color: 'red',
              }}>
              Vui lòng chọn địa chỉ
            </Text>
          )}

          {getAddress() && (
            <Text style={{color: 'green', width: '90%'}}>
              Tên:{getName()},SĐT:{getPhone()}, Địa chỉ: {getAddress()}
            </Text>
          )}
          <IconRight style={{paddingVertical: 5}} name="right" size={20} />
        </View>
      </TouchableOpacity>
      <FlatList
        data={ShoppingCarts}
        renderItem={renderItem}
        keyExtractor={(item, index) => 'cart-' + index.toString()}
      />
      <View>
        <View
          style={{
            backgroundColor: colors.PRIMARY_BORDER,
            height: 1,
            marginVertical: 4,
          }}
        />

        <View style={{height: 12}} />

        <View style={{height: 12}} />
        <TouchableOpacity
          onPress={() => sheetRef.current.snapTo(0)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={{color: '#ff9f1a'}}>Mã Khuyến mãi</Text>
          </View>

          <Text style={{color: 'red'}}>
            {discount > 0 && `Giảm:${discount}đ `}
            <IconRight
              style={{paddingVertical: 5, color: 'black'}}
              name="right"
              size={18}
            />
          </Text>
        </TouchableOpacity>

        <BottomSheet
          ref={sheetRef}
          snapPoints={[300, 0]}
          borderRadius={10}
          initialSnap={1}
          renderContent={renderContent}
          renderHeader={renderHeader}

          // renderContent={renderContent}
        />
        {ShoppingCarts.length > 0 && (
          <View>
            <Text
              style={{
                fontWeight: '700',
                color: colors.PRIMARY,
                textAlign: 'right',
              }}>
              Tổng cộng: {getTotal() - discount}đ
            </Text>
            <Button
              mode="outlined"
              style={{
                borderColor: '#ff3838',
                marginVertical: 3,
              }}
              disabled={ShoppingCarts && ShoppingCarts.length === 0}
              onPress={() => {
                if (getAddress()) {
                  setLoading(true);
                  FirestoreService.createOrder({
                    Name: route.params.address.name,
                    Phone: route.params.address.phone,
                    Address: route.params.address.address,
                    createdDate: firestore.Timestamp.now(),
                    schedule: moment().add(2, 'days').toDate(),
                    productOrders: ShoppingCarts,
                    discount: discount,
                    status: 'confirmed',
                    uid: signedInUser.uid,
                  }).then((createdOrder) => {
                    SendNotification();
                    setUseDiscount(null);
                    setDiscount(null);

                    // Clear cart
                    dispatch(clearCartAction());
                    navigation.navigate('CongratulationScreen');

                    setLoading(false);
                  });
                } else {
                  navigation.navigate('AddressStackNavigator');
                }
              }}>
              <Text style={{color: loading ? '#d2dae2' : 'red'}}>
                {loading ? 'Đang gửi đơn hàng' : 'Xác nhận đơn hàng'}
              </Text>
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#ebf0f7',
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
    width: '60%',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    marginTop: 3,
    marginHorizontal: 2,
    borderColor: '#ebf0f7',
  },

  card: {
    shadowColor: '#00000021',
    marginTop: 10,
    backgroundColor: 'white',
    borderColor: '#1dd1a1',
    flexDirection: 'row',
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
  },

  name: {
    fontSize: 13,
    flex: 1,
    alignSelf: 'center',
    color: '#3399ff',
    fontWeight: 'bold',
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: '#6666ff',
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#1dd1a1',
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  followButtonText: {
    color: 'black',
    fontSize: 12,
  },
});
