import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/core';
import {useSelector, useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

export default function Comments({route}) {
  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(0);
  const [comments, setComment] = React.useState([]);
  const signedInUser = useSelector((state) => state.auth.signedInUser);

  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      getComment();
    }, [refresh]),
  );

  const getComment = () => {
    firestore()
      .collection('StarRate')
      .where('userId', '==', signedInUser?.uid)
      .get()
      .then((querySnapshot) => {
        const data = [];

        querySnapshot.forEach((documentSnapshot) => {
          const comment = documentSnapshot.data();
          comment.id = documentSnapshot.id;
          data.push(comment);
        });

        setComment(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Alert.alert('Error', 'Something is wrong!');
        setComment([]);
        setLoading(false);
      });
  };

  // React.useEffect(getComment, [refresh]);
  // console.log(comments);
  return (
    <View style={{}}>
      <FlatList
        style={styles.root}
        data={comments}
        // extraData={state}

        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={(item, index) => {
          return 'comment' + index;
        }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setRefresh(refresh + 1);
            }}
          />
        }
        renderItem={(item) => {
          // console.log(item.item);
          return (
            <SafeAreaView>
              {item.item ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.container}
                  onPress={() => {
                    navigation.navigate('ProductDetailScreen', {
                      product: item.item,
                    });
                  }}>
                  <View onPress={() => {}}>
                    <Image
                      style={styles.image}
                      source={{uri: item.item.avatarUrl}}
                    />
                  </View>
                  <View style={styles.content}>
                    <View style={styles.contentHeader}>
                      <Text style={styles.name}>{item.item.Name} </Text>
                      <Text style={{color: 'black'}}>
                        {item.item.numberStar}
                        <Icon name="star" color="orange" />
                      </Text>

                      <Text style={styles.time}>
                        {item.item.timeRate.toDate().getDate()}
                        {'/'}
                        {item.item.timeRate.toDate().getMonth() + 1}
                        {'/'}
                        {item.item.timeRate.toDate().getFullYear()}
                      </Text>
                    </View>
                    <Text rkType="primary3 mediumLine">
                      {item.item.comment}
                    </Text>
                  </View>
                  <Image
                    style={styles.imageProduct}
                    source={{uri: item.item.imageProduct[0]}}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      firestore()
                        .collection('StarRate')
                        .doc(item.item.id)
                        .update({
                          comment: '',
                        })
                        .then(() => {
                          // navigation.navigate('UserDetailScreen');
                          setRefresh(refresh + 1);
                          console.log('comment delete successfully');
                        });
                    }}>
                    {/* <Icon
             name="remove"
             size={25}
             style={{alignSelf: 'center', color: 'red'}}></Icon> */}
                  </TouchableOpacity>
                </TouchableOpacity>
              ) : (
                <Text style={{}}>bạn chưa đánh giá</Text>
              )}
            </SafeAreaView>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  },
  imageProduct: {
    width: 60,
    height: 60,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    paddingLeft: 5,
    color: '#808080',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
