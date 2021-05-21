import {useNavigation} from '@react-navigation/core';
import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import Arrow from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

export default function CategoryList() {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);
  const [CategoryFilter, setCategoryFilter] = React.useState(categories);
  const [categories, setCategory] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);
  useFocusEffect(
    React.useCallback(() => {
      getCategories();
    }, [refresh]),
  );
  const getCategories = () => {
    firestore()
      .collection('Categories')
      .get()
      .then((querySnapshot) => {
        const data = [];

        querySnapshot.forEach((documentSnapshot) => {
          const category = documentSnapshot.data();
          category.id = documentSnapshot.id;
          data.push(category);
        });

        setCategory(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Alert.alert('Error', 'Something is wrong!');
        setCategory([]);
        setLoading(false);
      });
  };
  React.useEffect(getCategories, [refresh]);
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 8,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditCategoryScreen', {item});
          }}>
          <View>
            <Image
              style={{width: 50, height: 50, alignSelf: 'center'}}
              source={{
                uri: item.imageUrl,
              }}
            />
          </View>
          <View>
            <Text>{item.id}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 150,
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Arrow name="arrowleft" size={30} />
          </TouchableOpacity>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Category</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreateCategoryScreen');
            }}>
            <Arrow name="plus" size={30} />
          </TouchableOpacity>
        </View>
        <View height={20} />
        <View
          style={{
            flexDirection: 'row',
            height: 45,
            alignItems: 'center',
            backgroundColor: '#F5F5F8',
          }}>
          <View style={{padding: 10}}>
            <Arrow name="search1" size={20} color="#898B9A" />
          </View>

          <TextInput
            style={{flex: 1}}
            placeholder="Search Category"
            onChangeText={(text) => {
              setCategoryFilter(
                categories.filter((u) => u.name.includes(text)),
              );
              // setSelectedCategory(null);
            }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingTop: 25,
          alignItems: 'center',
        }}>
        <FlatList
          data={CategoryFilter ? CategoryFilter : categories}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id.toString()}
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
    </View>
  );
}
