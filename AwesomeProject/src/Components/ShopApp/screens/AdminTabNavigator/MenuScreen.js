import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import OneSignal from 'react-native-onesignal';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';

const data = [
  {
    id: 1,
    title: 'Quản lý danh mục',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAwIJlP5lvmuWmHuJmXZ8luzaAFzm2EYQBsSVqCORUJ9epSAbbLhoCHWGlx7w-Bxe8ukY&usqp=CAU',
    screen: 'MenuCategory',
  },
  {
    id: 5,
    title: 'Quản lý user',
    screen: 'UserListScreen',
    image: 'https://img.icons8.com/color/70/000000/administrator-male.png',
  },
  {
    id: 2,
    title: 'Quản lý sản phẩm',
    image: 'https://img.icons8.com/color/70/000000/filled-like.png',
    screen: 'ListProductScreen',
  },

  {
    id: 3,
    title: 'Quản lý đơn hàng',
    screen: 'ListOrderScreen',
    image:
      'https://www.iconbunny.com/icons/media/catalog/product/1/0/1036.12-cancel-order-icon-iconbunny.jpg',
  },
  {
    id: 4,
    title: 'Gửi thông báo',
    screen: 'SendNotifiactionScreen',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPfMVyQVvU0cfiyUYUQW63bHDO_SInGf-H-Q&usqp=CAU',
  },
  {
    id: 5,
    title: 'Quản lý banner',
    screen: 'ListBannerScreen',
    image:
      'https://logos.flamingtext.com/Name-Logos/Banner-design-china-name.png',
  },
];
import {useFocusEffect} from '@react-navigation/native';

const statusActivity = () => {
  // Assuming user is logged in
  const userId = auth().currentUser.uid;
  const reference = database().ref(`/online/${userId}`);
  // Set the /users/:userId value to true
  reference.set(true).then(() => console.log('Online presence set'));
  // Remove the node whenever the client disconnects
  reference
    .onDisconnect()
    .remove()
    .then(() => console.log('On disconnect function configured.'));
};

export default function Home() {
  const navigation = useNavigation();
  const signedInUser = useSelector((state) => state.auth.signedInUser);

  useFocusEffect(
    React.useCallback(() => {
      statusActivity();
    }, []),
  );

  // const dispatch = useDispatch();
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

      // dispatch(NumberNotification(1));
    });

    OneSignal.addEventListener('opened', (openResult) => {
      // console.log('Message: ', openResult.notification.payload.body);
      // console.log('Data: ', openResult.notification.payload.additionalData);
      // dispatch(
      //   NumberNotification(openResult.notification.payload.additionalData),
      // );
      // console.log('isActive: ', openResult.notification.isAppInFocus);
      // console.log('data: ', openResult.notification.isAppInFocus.data);
    });

    OneSignal.addEventListener('ids', (device) => {
      // console.log('Device info: ', device);
      if (signedInUser?.uid) {
        firestore()
          .collection('PlayerId')
          .doc(signedInUser?.uid)
          .set({
            playerID: device.userId,
          })
          .then(() => {
            console.log('save player_id updated!');
          });
      }
    });

    return () => {
      OneSignal.removeEventListener('received');
      OneSignal.removeEventListener('opened');
      OneSignal.removeEventListener('ids');
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={data}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.card}
              onPress={() => {
                navigation.navigate(item.screen);
              }}>
              <View style={styles.cardFooter}></View>
              <FastImage
                style={styles.cardImage}
                source={{uri: item.image, priority: FastImage.priority.normal}}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View style={styles.cardHeader}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
  listContainer: {
    alignItems: 'center',
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    borderRadius: 15,

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 10,
    backgroundColor: 'white',
    flexBasis: '42%',
    marginHorizontal: 10,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#696969',
  },
});
