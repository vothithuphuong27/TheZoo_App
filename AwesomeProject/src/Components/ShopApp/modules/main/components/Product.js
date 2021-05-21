/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import {useSelector, useDispatch} from 'react-redux';
import OneSignal from 'react-native-onesignal';
import {NumberNotification} from '../../../modules/auth/actions/';
import Cart from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../../../constants/color';
const MainScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const numberBadges = useSelector((e) => e.auth.BadgeNumber);
  const signedInUser = useSelector((state) => state.auth.signedInUser);
  React.useEffect(() => {
    OneSignal.init('6ec8c890-6818-4f8a-9424-85935856d8bd', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2);
    OneSignal.addEventListener('received', (openResult) => {
      // let contentNotification = openResult.payload.additionalData;
      console.log('Notification received data: ', openResult);

      dispatch(NumberNotification(1));
    });

    OneSignal.addEventListener('opened', (openResult) => {
      // console.log('Message: ', openResult.notification.payload.body);
      // console.log('Data: ', openResult.notification.payload.additionalData);
      // dispatch(
      //   NumberNotification(openResult.notification.payload.additionalData),
      // );
      // console.log('isActive: ', openResult.notification.isAppInFocus);
      // console.log('data: ', openResult.notification.isAppInFocus.data);
      navigation.navigate('Notification');
    });

    OneSignal.addEventListener('ids', (device) => {
      // console.log('Device info: ', device);
      if (signedInUser?.uid) {
        firestore()
          .collection('PlayerId')
          .doc(signedInUser?.uid)
          .set({
            playerID: device.userId,
            NumberNotification: numberBadges ? numberBadges : 0,
          })
          .then(() => {});
      }
    });

    return () => {
      OneSignal.removeEventListener('received');
      OneSignal.removeEventListener('opened');
      OneSignal.removeEventListener('ids');
    };
  }, []);
  return null;
};
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
      <Icon name="chevron-right" color={'violet'} size={24} />
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
        color={'violet'}
        size={24}
      />
    </View>
  );
};

const Dot = () => {
  return (
    <View
      style={{
        backgroundColor: colors.DARK_GRAY,
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: -180,
        marginBottom: 3,
      }}
    />
  );
};
function ProductList({data}) {
  const navigation = useNavigation();

  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       margin: 8,
  //     }}>
  //     <TouchableOpacity
  //       activeOpacity={0.8}
  //       onPress={() => {
  //         navigation.navigate('ProductDetailScreen', {product: data});
  //       }}>
  //       <FastImage
  //         style={{
  //           height: 130,
  //           width: '100%',
  //           borderTopLeftRadius: 16,
  //           borderTopRightRadius: 16,
  //         }}
  //         resizeMode="cover"
  //         source={{
  //           uri: data.imageUrl,
  //           priority: FastImage.priority.normal,
  //         }}
  //       />

  //       <View
  //         style={{
  //           paddingHorizontal: 16,
  //           paddingTop: 16,
  //           backgroundColor: 'white',
  //         }}>
  //         <Text style={{fontWeight: '700', textAlign: 'center', fontSize: 14}}>
  //           {data.name}
  //         </Text>
  //         <View height={4} />
  //         {/* <Text style={{fontWeight: '400', color: 'grey', fontSize: 12}}>
  //         {data.category.name}
  //       </Text> */}
  //       </View>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           backgroundColor: 'white',
  //           borderBottomLeftRadius: 16,
  //           borderBottomRightRadius: 16,
  //         }}>
  //         <View style={{flex: 1, paddingHorizontal: 20, paddingVertical: 20}}>
  //           <Text
  //             style={{fontWeight: '700', color: 'red', textAlign: 'center'}}>
  //             Giá: {data.price} $
  //           </Text>
  //         </View>
  //         <View
  //           style={{
  //             paddingRight: 12,
  //             paddingVertical: 12,
  //           }}>
  //           {/* <ActionButton data={data} /> */}
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   </View>
  // );
  return (
    <View
      style={{
        flex: 1,
        margin: 5,
        marginTop: 1,
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('ProductDetailScreen', {product: data});
        }}
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
        }}>
        <View
          style={{
            width: '100%',
            height: 150,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            marginVertical: 5,
          }}>
          <FastImage
            source={{
              uri: data.imageUrl[0],
              priority: FastImage.priority.normal,
            }}
            style={{
              width: '100%',
              height: 150,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              marginVertical: 5,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>

        <View
          style={{padding: 10, height: 110, justifyContent: 'space-between'}}>
          <View>
            <Text
              style={{color: 'black', fontWeight: '700', textAlign: 'center'}}>
              {data.name}
            </Text>
            <Text style={{color: '#079992', textAlign: 'center'}}>InStock</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{alignItems: 'center', color: 'black', fontWeight: '700'}}>
              {data.price} $
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('ProductDetailScreen', {product: data});
              }}
              style={{
                width: 40,
                height: 40,
                backgroundColor: color.PRIMARY,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Cart name="cart-outline" color="white" size={15} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const Banner = () => {
  const [Banners, setBanners] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const getBanner = () => {
    const data = [];
    firestore()
      .collection('Banners')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const banner = documentSnapshot.data();
          banner.id = documentSnapshot.id;
          data.push(banner);
        });

        setBanners(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Alert.alert('Error', 'Something is wrong!');
        setBanners([]);
        setLoading(false);
      });
  };
  React.useEffect(getBanner, []);

  return (
    <View>
      {Banners.length > 0 && (
        <View
          style={{height: 150}}
          onIndexChanged={(index) => {
            console.log(Banners[index]);
          }}>
          <Swiper
            activeDotStyle={{backgroundColor: 'white'}}
            showsButtons={true}
            loop={true}
            autoplay={true}
            nextButton={<NextButton />}
            prevButton={<PreviousButton />}>
            {Banners.map((item, key) => (
              <BannerList key={key} item={item} />
            ))}
          </Swiper>
        </View>
      )}
    </View>
  );
};
const BannerList = ({item}) => {
  return (
    <React.Fragment>
      <FastImage
        style={styles.logo}
        source={{
          uri: item.imageUrl,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </React.Fragment>
  );
};
export default function Product({data}) {
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

        setProductList(data);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Alert.alert('Error', 'Something is wrong!');
        setProductList([]);
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
          activeOpacity={2}
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
          <FastImage
            source={{
              uri: item.imageUrl,
              priority: FastImage.priority.normal,
            }}
            style={{width: 30, height: 30}}
            resizeMode={FastImage.resizeMode.contain}
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
      <View style={{paddingHorizontal: 20}}>
        <FlatList
          data={categories}
          horizontal
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{paddingVertical: 10}}
        />
      </View>
    );
  }
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  // const [ProductFilter, setProductFilter] = React.useState(Products);

  function OnSelectedCategory(item) {
    if (item.id == 'All') {
      setProductList(Products);
      setSelectedCategory(null);
      return;
    }
    let ProductList = Products.filter((a) => a.categories.includes(item.id));
    setProductList(ProductList);
    setSelectedCategory(item);
  }
  const [ProducList, setProductList] = React.useState(Products);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MainScreen />

      {/* <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator />
    //   </View> */}
      {/* {searchProduct(Products)} */}
      <View style={{flexDirection: 'row', marginBottom: -20}}>
        <TextInput
          style={{
            flex: 1,
            height: 40,
            margin: 12,
            paddingHorizontal: 25,
            borderWidth: 1,
            borderRadius: 23,
          }}
          onChangeText={(text) => {
            setProductList(Products.filter((i) => i.name.includes(text)));
            setSelectedCategory(null);
          }}
          placeholder="search Product"
        />
        <Icon
          style={{paddingTop: 25, paddingLeft: 20, position: 'absolute'}}
          name="search"
        />
      </View>
      {/* selectedCategory ? ProductFilter */}
      {CategoyList()}
      {!loading ? (
        <FlatList
          data={ProducList ? ProducList : Products}
          numColumns={2}
          keyExtractor={(p, i) => 'Product+' + p.id}
          renderItem={({item}) => {
            return <ProductList data={item} />;
          }}
          ListHeaderComponent={Banner}
        />
      ) : (
        <ActivityIndicator size="small" color="#0000ff" />
      )}
    </SafeAreaView>
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
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  logo: {
    flex: 1,
  },
});
