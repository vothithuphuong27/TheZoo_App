import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addToCartAction} from '../../main/actions/';
import FastImage from 'react-native-fast-image';
import Star from 'react-native-vector-icons/AntDesign';
import {Button, TouchableRipple} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';
import Iconchevron from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {addProductFavoriteAction} from '../actions/';
import numeral from 'numeral';
import {SafeAreaView} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconHeart from 'react-native-vector-icons/AntDesign';

import Color from '../../../constants/color';

// console.log(StarProduct);

function CommentProduct({data}) {
  // console.log(data);
  const signedInUser = useSelector((state) => state.auth.signedInUser);
  const navigation = useNavigation();
  let mm = data.timeRate.toDate().getMonth() + 1;
  let dd = data.timeRate.toDate().getDate();
  let yyyy = data.timeRate.toDate().getFullYear();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback>
        <React.Fragment>
          {data.comment !== '' && (
            <Animatable.View style={styles.container}>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  style={styles.image}
                  source={{
                    uri: data.avatarUrl
                      ? data.avatarUrl
                      : 'data:image/png;base64,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',
                  }}
                />
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <View>
                    <Text style={styles.name}>
                      {data.Name} {''}
                      {data.numberStar}
                      <FastImage
                        style={{
                          width: 20,
                          height: 20,
                          resizeMode: 'cover',
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                        source={{
                          uri:
                            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png',
                          priority: FastImage.priority.normal,
                        }}
                      />
                    </Text>
                  </View>

                  {data.userId == signedInUser?.uid && (
                    <View>
                      <TouchableRipple
                        onPress={() => {
                          navigation.navigate('EditCommentProduct', {
                            comment: data.comment,
                            producId: data,
                          });
                        }}>
                        <Icon
                          name="edit"
                          style={{
                            color: 'green',
                            paddingTop: 7,
                            paddingRight: 5,
                            shadowColor: '#ebebeb',
                            textAlign: 'center',
                          }}>
                          Edit
                        </Icon>
                      </TouchableRipple>
                    </View>
                  )}
                  <Text style={styles.time}>
                    {dd + '/' + mm + '/' + yyyy} {''}
                  </Text>
                </View>

                <Text rkType="primary3 mediumLine">{data.comment}</Text>
              </View>
            </Animatable.View>
          )}
        </React.Fragment>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const NextButton = () => {
  return (
    <View
      style={{
        height: 32,
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        opacity: 1,
      }}>
      <Icon name="chevron-right" color={Color.PRIMARY} size={24} />
    </View>
  );
};

const PreviousButton = () => {
  return (
    <View
      style={{
        height: 32,
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        opacity: 1,
      }}>
      <Icon
        style={{textAlign: 'center', alignItems: 'center'}}
        name="chevron-left"
        color={Color.PRIMARY}
        size={24}
      />
    </View>
  );
};

const Dot = () => {
  return (
    <View
      style={{
        backgroundColor: Color.DARK_GRAY,
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginBottom: -53,
      }}
    />
  );
};
export default function ProductDetail({data}) {
  const dispatch = useDispatch();
  const signedInUser = useSelector((state) => state.auth.signedInUser);
  // console.log(signedInUser);
  const productFavorites = useSelector(
    (state) => state.main.shoppingCart.productFavoriteList,
  );
  const [StarProduct, setStarProduct] = React.useState(null);
  var producId = data.productId ? data.productId : data.id; // check my rate and detail product ( (đánh giá của tôi trong mục profile screen))

  const [loading, setLoading] = React.useState(false);
  const productFv = data.productId
    ? productFavorites.find((e) => e.id == data.productId) //check product rate sceen  (đánh giá của tôi trong mục profile screen)
    : productFavorites.find((e) => e.id == data.id);
  // console.log(productFv);
  const [favoriteProduct, setFavoriteProduct] = React.useState(
    productFavorites.length > 0 ? productFv?.status : false,
  );
  const updateProductListFavorite = () => {
    if (signedInUser?.uid) {
      firestore()
        .collection('productFavorite')
        .doc(signedInUser?.uid)
        .set({
          productFavorites: productFavorites,
          userId: signedInUser?.uid,
        })
        .then(() => {
          // console.log('User updated!');
        });
    }
  };
  React.useEffect(updateProductListFavorite, [productFavorites]);
  const getTotalRateStar = () => {
    if (StarProduct) {
      let result = StarProduct.reduce(
        (total, item) => total + item.numberStar / StarProduct.length,
        0,
      );
      // setLoading(false);
      return result.toFixed(1);
    }
  };
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      getStarRate();
    }, []),
  );

  const getStarRate = () => {
    const data = [];
    firestore()
      .collection('StarRate')
      .where('productId', '==', producId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const starRate = documentSnapshot.data();
          starRate.id = documentSnapshot.id;
          data.push(starRate);
        });
        setStarProduct(data);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        // Alert.alert('Error', 'Something is wrong!');
        // setstate([]);
        setLoading(false);
      });
  };
  // console.log(StarProduct);
  const getHeader = () => {
    return (
      <SafeAreaView>
        {loading && (
          <View style={{flex: 1, alignItems: 'center', marginVertical: 10}}>
            {/* <FastImage
            style={[styles.productImg, {marginVertical: 10, borderRadius: 10}]}
            source={{
              uri: data.imageUrl,
              priority: FastImage.priority.normal,
            }}
          /> */}
            <Text style={[styles.name, {textAlign: 'center', paddingLeft: 15}]}>
              {data.name} {'  '}
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setFavoriteProduct(!favoriteProduct);
                  // dispatch(signInAction(values.email, values.password));
                  dispatch(
                    addProductFavoriteAction(
                      data.id,
                      !favoriteProduct,
                      data.imageUrl,
                      data.description,
                      data.name,
                      data.price,
                    ),
                  );
                }}>
                <IconHeart
                  size={19}
                  color={productFv?.status ? 'red' : 'black'}
                  name={productFv?.status ? 'heart' : 'hearto'}></IconHeart>
                {/* <Icon size={14} color="red" name="heart"></Icon> */}
              </TouchableOpacity>
            </Text>
            <Text style={[styles.price, {paddingRight: 10}]}>
              ${data.price}
            </Text>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 4,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    paddingRight: 3,
                  }}>
                  {getTotalRateStar()}
                </Text>

                <FastImage
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'cover',
                  }}
                  source={{
                    uri:
                      'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png',
                    priority: FastImage.priority.normal,
                  }}
                />
              </View>
              <Text style={[styles.description]}>{data.description}</Text>
            </View>
          </View>
        )}
        <View style={styles.separator}></View>
        <View style={[styles.addToCarContainer, {marginVertical: 5}]}>
          <Button
            style={{borderRadius: 40}}
            mode="contained"
            onPress={() => {
              // Alert.alert('Thông báo', 'Chức năng đang được phát triển');
              dispatch(addToCartAction(data, 1, signedInUser.uid));
            }}>
            Thêm vào giỏ hàng
          </Button>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      {loading ? (
        <View
          style={{
            flex: 1,
          }}>
          <Swiper
            activeDotStyle={{marginBottom: -50, backgroundColor: 'orange'}}
            dot={<Dot />}
            showsButtons={true}
            nextButton={<View></View>}
            prevButton={<View></View>}>
            {data.imageUrl.map((item, key) => (
              <View key={key} style={{alignItems: 'center'}}>
                <FastImage
                  style={[
                    styles.productImg,
                    {marginVertical: 5, borderRadius: 10},
                  ]}
                  source={{
                    uri: item,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
            ))}
          </Swiper>
        </View>
      ) : (
        <ActivityIndicator
          style={{textAlign: 'center'}}
          size="small"
          color="#0000ff"
        />
      )}

      <View style={{flex: 2}}>
        {loading ? (
          <View>
            <FlatList
              data={loading ? StarProduct : null}
              numColumns={1}
              keyExtractor={(item) => {
                return 'product-' + item.id;
              }}
              renderItem={({item}) => {
                return <CommentProduct data={item} />;
              }}
              ListHeaderComponent={getHeader}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide1: {
    backgroundColor: 'rgba(20,20,200,0.3)',
  },
  slide2: {
    backgroundColor: 'rgba(20,200,20,0.3)',
  },
  slide3: {
    backgroundColor: 'rgba(200,20,20,0.3)',
  },
  //

  productImg: {
    width: 190,
    height: 190,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: 'bold',
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: '#696969',
  },
  star: {
    width: 40,
    height: 40,
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3,
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: '#778899',
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  contentColors: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  contentSize: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  separator: {
    height: 2,
    backgroundColor: '#eeeeee',
    marginTop: 10,
    marginHorizontal: 30,
  },
  shareButton: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  addToCarContainer: {
    marginHorizontal: 30,
  },
  root: {
    backgroundColor: '#ffffff',
  },

  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: '#808080',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
