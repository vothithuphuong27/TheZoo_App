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
  RefreshControl,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';

export default function Users() {
  const navigation = useNavigation();
  const [refresh, setRefresh] = React.useState(0);
  const [profile, setProfile] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(profile);

  const getProfiles = () => {
    const data = [];
    firestore()
      .collection('Profiles')
      .get()
      .then((querySnapshot) => {
        // lặp qua từng document
        querySnapshot.forEach((documentSnapshot) => {
          const user = documentSnapshot.data();
          user.id = documentSnapshot.id;
          data.push(user);
        });
        // set state
        setProfile(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setProduct([]);
      });
  };
  React.useEffect(getProfiles, [refresh]);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', marginVertical: 2}}>
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
            setUser(profile.filter((u) => u.name.includes(text)));
            // setSelectedCategory(null);
          }}
          placeholder="search user"
        />
        <Icon
          style={{paddingTop: 25, paddingLeft: 20, position: 'absolute'}}
          name="search"
        />
      </View>

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={user.length > 0 ? user : profile}
        horizontal={false}
        numColumns={2}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setRefresh(refresh + 1);
            }}
          />
        }
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.card}
              onPress={() => {
                navigation.navigate('UserDetailScreen', {profile: item});
              }}>
              <View style={styles.cardHeader}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      'https://img.icons8.com/flat_round/64/000000/hearts.png',
                  }}
                />
              </View>

              <FastImage
                style={styles.userImage}
                source={{
                  uri: item.imageUrl
                    ? item.imageUrl
                    : 'https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png',
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View style={styles.cardFooter}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.email}>{item.email}</Text>
                  <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followButtonText}>{item.role}</Text>
                  </TouchableOpacity>
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
    marginTop: 2,
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
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor: 'white',
    flexBasis: '46%',
    marginHorizontal: 5,
  },
  cardFooter: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  userImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    alignSelf: 'center',
    borderColor: '#DCDCDC',
    borderWidth: 3,
  },
  name: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
    color: '#008080',
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    width: '90%',
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#696969',
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  icon: {
    height: 20,
    width: 20,
  },
});
