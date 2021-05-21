import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AuthService from '../../services/AuthService';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {updateNotification} from '../../modules/auth/actions';
import {SafeAreaView} from 'react-native';
export default function Notifications() {
  const [refresh, setRefresh] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [announcements, setAnnouncements] = React.useState([]);
  const signedInUser = useSelector((state) => state.auth.signedInUser);
  // const numberBadges = useSelector((e) => e.auth.BadgeNumber);
  const [BadgeNumber, setBadgeNumberNotification] = React.useState(0);
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      getNotification();
      updateNumberNotification();
    }, [refresh]),
  );
  const dispatch = useDispatch();

  const updateNumberNotification = () => {
    dispatch(updateNotification(0));
    firestore()
      .collection('PlayerId')
      .doc(signedInUser?.uid)
      .update({
        NumberNotification: BadgeNumber,
      })
      .then(() => {
        // firestore().collection('PlayerId').doc(signedInUser?.uid).update({
        //   NumberNotification: numberBadges,
        // });
      });
  };
  const getNotification = () => {
    AuthService.getNotifications()
      .then((result) => {
        setAnnouncements(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const renderItem = ({item, index}) => {
    return (
      <SafeAreaView>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.container}
          onPress={() => {
            navigation.navigate('NotificationDetailScreen', {data: item});
          }}>
          <View style={styles.content}>
            <View style={styles.mainContent}>
              <View style={styles.text}>
                <Text style={styles.name}>{item.title}</Text>
              </View>
              {/* <Text style={{color: 'black'}}>{item.body}</Text> */}
              <Text style={styles.timeAgo}>
                {item.createdTime.toDate().getDate()} {'/'}
                {item.createdTime.toDate().getMonth() + 1} {'/'}
                {item.createdTime.toDate().getFullYear()}{' '}
                {item.createdTime.toDate().toLocaleTimeString('vi_VN')}
              </Text>
            </View>
          </View>
          <Image source={{uri: item.imageUrl}} style={styles.image} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <FlatList
      style={styles.root}
      data={announcements}
      ItemSeparatorComponent={() => {
        return <View style={styles.separator} />;
      }}
      keyExtractor={(notification, uid) => 'notification+' + uid}
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
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'flex-start',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 3,
    alignItems: 'center',
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
  },
  img: {
    height: 50,
    width: 50,
    margin: 0,
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  timeAgo: {
    fontSize: 12,
    color: '#696969',
  },
  name: {
    fontSize: 16,
    color: '#1E90FF',
  },
});
