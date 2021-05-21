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
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/core';

export default function Comments({route}) {
  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(0);
  const [comments, setComment] = React.useState([]);
  const uidComment = route.params.userUid;
  const navigation = useNavigation();

  const getComment = () => {
    firestore()
      .collection('StarRate')
      .where('userId', '==', uidComment)
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

  React.useEffect(getComment, [refresh]);

  return (
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
        return (
          <View style={styles.container}>
            <TouchableOpacity onPress={() => {}}>
              <Image style={styles.image} source={{uri: item.item.avatarUrl}} />
            </TouchableOpacity>
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <Text style={styles.name}>{item.item.Name}</Text>
                <Text style={styles.time}>
                  {item.item.timeRate.toDate().getDate()}
                  {'/'}
                  {item.item.timeRate.toDate().getMonth() + 1}
                  {'/'}
                  {item.item.timeRate.toDate().getFullYear()}
                </Text>
              </View>
              <Text rkType="primary3 mediumLine">{item.item.comment}</Text>
            </View>
            <Image
              style={styles.imageProduct}
              source={{uri: item.item.imageProduct}}
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
              <Icon
                name="remove"
                size={25}
                style={{alignSelf: 'center', color: 'red'}}></Icon>
            </TouchableOpacity>
          </View>
        );
      }}
    />
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
