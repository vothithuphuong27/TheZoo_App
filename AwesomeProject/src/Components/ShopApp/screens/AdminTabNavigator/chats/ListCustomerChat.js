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
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/core';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';

export default function ListUserChatScreen() {
  const [users, setUserChat] = React.useState([]);
  const [chats, setChat] = React.useState([]);
  const [userFilter, setUserFilter] = React.useState(users);
  // console.log(users);
  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(0);
  const loggedInUser = useSelector((state) => state.auth.signedInUser);
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

  useFocusEffect(
    React.useCallback(() => {
      getProfile();
      statusActivity();
      getMessages();
    }, [refresh]),
  );
  const getProfile = () => {
    const data = [];
    firestore()
      .collection('Profiles')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const user = documentSnapshot.data();
          user.id = documentSnapshot.id;
          data.push(user);
        });

        setUserChat(data);
        // setProducts(data);
        setLoading(false);
      })

      .catch((error) => {
        console.log(error);
        setUserChat([]);
        setLoading(false);
      });
  };
  const getMessages = () => {
    const data = [];
    firestore()
      .collection('Messages')
      .where('from', '==', loggedInUser?.uid)
      .orderBy('createdTime', 'asc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const user = documentSnapshot.data();
          user.id = documentSnapshot.id;
          data.push(user);
        });
        setChat(data);
        // setProducts(data);
        setLoading(false);
      })

      .catch((error) => {
        console.log(error);
        // Alert.alert('Error', 'Something is wrong!');
        setChat([]);
        setLoading(false);
      });
  };
  // console.log(chats);
  React.useEffect(getProfile, [refresh]);
  React.useEffect(getMessages, [refresh]);
  const navigation = useNavigation();
  // console.log(users);
  const renderItem = ({item, index}) => {
    // console.log();
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        {item.role !== 'Admin' &&
        chats.find((c) => c.username == item.name && c.to == item.id) ? (
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.row, {position: 'relative'}]}
            onPress={() => {
              navigation.navigate('ChatCustomerScreen', item);
            }}>
            <FastImage
              source={{
                uri: item.imageUrl
                  ? item.imageUrl
                  : 'https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png',
              }}
              style={styles.pic}
            />
            <View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>{item.name}</Text>
              </View>
            </View>
            {chats.find(
              (c) =>
                c.to == item.id && // check tin nhắn 2 ng cùng tên
                c.username == item.name &&
                c.badges === false,
            ) ? (
              <Text
                style={{
                  color: 'red',
                  alignSelf: 'center',
                  textAlign: 'center',
                }}>
                <Icon
                  name="chatbox"
                  style={{
                    color: 'red',
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}
                  size={20}
                  color="#70DA30"></Icon>
              </Text>
            ) : (
              <Icon name="chatbox" size={20} color="#70DA30"></Icon>
            )}
          </TouchableOpacity>
        ) : (
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'center',
              // position: 'absolute',
            }}>
            <Text style={{}}>{item.username}</Text>
          </SafeAreaView>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: '#ebebeb',
          marginVertical: 5,
          marginHorizontal: 5,
        }}
        placeholder="search users"
        onChangeText={(text) => {
          setUserFilter(users.filter((u) => u.name.includes(text)));
          // setUserFilter(text);
        }}
      />
      <FlatList
        // extraData={this.state}
        data={userFilter.length > 0 ? userFilter : users}
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
    alignItems: 'center',
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
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
