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
  RefreshControl,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Entypo';
import IconVeri from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {Card, Chip, TouchableRipple, Subheading} from 'react-native-paper';
import FastImage from 'react-native-fast-image';

export default function ListUserChatScreen() {
  const [users, setUserChat] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [status, setStatus] = React.useState(false);
  // const statusActivity = (uidAdmin) => {
  //   const data = [];
  //   const onValueChange = database()
  //     .ref(`/online/${uidAdmin}`)
  //     .on('value', (snapshot) => {
  //       data.push({id: snapshot.val()});
  //       setStatus(data);
  //     });

  //   // Stop listening for updates when no longer required
  //   return () =>
  //     database().ref(`/online/${uidAdmin}`).off('value', onValueChange);
  // };
  // console.log(status);
  const getProfile = () => {
    const data = [];
    firestore()
      .collection('Profiles')
      .where('role', '==', 'Admin')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const user = documentSnapshot.data();
          user.id = documentSnapshot.id;
          database()
            .ref(`/online/${user.id}`)
            .on('value', (snapshot) => {
              // const user = documentSnapshot.data();
              // user.id = documentSnapshot.id;

              user.activity = snapshot.val();
            });
          data.push(user);
        });
        setUserChat(data);

        // setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Alert.alert('Error', 'Something is wrong!');
        setUserChat([]);
        setLoading(false);
      });
  };
  // console.log(status);
  // console.log(users);
  React.useEffect(getProfile, []);
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    return (
      <TouchableRipple
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('ChatScreen', item);
        }}>
        <View style={[styles.row, {alignSelf: 'center'}]}>
          <FastImage
            source={{uri: item.imageUrl}}
            style={styles.pic}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <View
              style={[
                styles.nameContainer,
                {alignSelf: 'center', marginTop: 2},
              ]}>
              <Text style={styles.nameTxt}>{item.name}</Text>
              {/* <Text style={styles.nameTxt}>{item.activity}</Text> */}
            </View>
            <View style={{paddingLeft: 15}}>
              <Text style={{padding: 1, paddingRight: 3}}>
                Đội ngũ hỗ trợ
                <IconVeri name="verified-user" color="green" />
              </Text>
              {/* {status.find((e)=>e.id===true) ?( <Text style={styles.time}>
                {item.date} {item.time}
              </Text>): null} */}
            </View>
          </View>
          <Text>
            <Icon
              name="dot-single"
              size={16}
              color={item.activity ? 'green' : 'red'}
            />
          </Text>
          {/* <Image
            style={[styles.icon, {marginRight: 50}]}
            source={{uri: item.imageUrl}}
          /> */}
        </View>
      </TouchableRipple>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        // extraData={this.state}
        data={users}
        keyExtractor={(item) => {
          return 'item' + item.id;
        }}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setRefresh(refresh + 1);
            }}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 3,
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 6,
    justifyContent: 'space-between',
  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  end: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
  },
  icon: {
    height: 28,
    width: 28,
  },
});
