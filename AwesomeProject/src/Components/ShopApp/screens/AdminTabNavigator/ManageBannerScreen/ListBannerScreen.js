import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {TouchableRipple} from 'react-native-paper';
import Arrow from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';

export default function ListBannerScreen() {
  const [Banners, setBanners] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(0);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      getBanner();
    }, [refresh]),
  );
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
  //   React.useEffect(getBanner, [refresh]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* //search */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 55,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
          padding: 15,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Arrow name="arrowleft" size={26} />
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Danh sách banner</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreateBannerScreen');
          }}>
          <Arrow name="plus" size={30} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#F5F5F8',
        }}>
        {/* <View style={{padding: 10}}>
          <Arrow name="search1" size={20} color="#898B9A" />
        </View> */}
        {/* <TextInput
          style={{flex: 1}}
          placeholder="Search banner"
          onChangeText={(text) => {
            setProductFilter(Products.filter((u) => u.name.includes(text)));
          }}
        /> */}
      </View>

      <FlatList
        data={Banners}
        keyExtractor={(item) => {
          return 'Product' + item.id;
        }}
        renderItem={({item, index}) => {
          return (
            <View>
              <TouchableRipple
                activeOpacity={1}
                rippleColor="red"
                onPress={() => {
                  navigation.navigate('EditBannerScreen', {data: item});
                }}>
                <View style={styles.box}>
                  <Image style={styles.image} source={{uri: item.imageUrl}} />
                  <View style={styles.boxContent}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text
                      style={{
                        color: 'red',
                        fontWeight: '700',
                        alignSelf: 'center',
                      }}>
                      Ảnh {index}
                    </Text>
                    {/* <Text style={styles.description}>ảnh</Text> */}
                  </View>
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
