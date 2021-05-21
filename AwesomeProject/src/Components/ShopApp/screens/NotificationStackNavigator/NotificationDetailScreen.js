import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import color from '../../constants/color';
export default function NotificationDetailScreen({route}) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{route.params.data.title}</Text>
        </View>

        <View style={styles.postContent}>
          {/* <Text style={styles.postTitle}>aaa</Text> */}

          <Text style={styles.postDescription}>{route.params.data.body}</Text>

          {/* <Text style={styles.tags}>
            Lorem, ipsum, dolor, sit, amet, consectetuer, adipiscing, elit.
          </Text> */}
          {route.params.data.imageUrl && (
            <View style={{alignSelf: 'center'}}>
              <Image
                style={{width: 200, height: 200}}
                source={{
                  uri: route.params.data.imageUrl,
                }}
                resizeMode="contain"
              />
            </View>
          )}

          <Text style={styles.date}>
            {route.params.data.createdTime.toDate().getDate()} {'/'}
            {route.params.data.createdTime.toDate().getMonth() + 1} {'/'}
            {route.params.data.createdTime.toDate().getFullYear()}{' '}
            {route.params.data.createdTime.toDate().toLocaleTimeString('vi_VN')}
          </Text>

          {/* <View style={styles.profile}>
            <Image
              style={styles.avatar}
              source={{
                uri: 'https://bootdey.com/img/Content/avatar/avatar1.png',
              }}
            />

            <Text style={styles.name}>Johan Doe</Text>
          </View> */}
          {/* <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Like</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 5,
    alignItems: 'center',
    backgroundColor: color.PRIMARY,
  },
  headerTitle: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  postContent: {
    flex: 1,
    marginTop: -25,
    padding: 15,
  },
  postTitle: {
    fontSize: 26,
    fontWeight: '600',
  },
  postDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  tags: {
    color: '#00BFFF',
    marginTop: 10,
  },
  date: {
    color: '#696969',
    marginTop: 10,
    alignSelf: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#00BFFF',
  },
  profile: {
    flexDirection: 'row',
    marginTop: 20,
  },
  name: {
    fontSize: 22,
    color: '#00BFFF',
    fontWeight: '600',
    alignSelf: 'center',
    marginLeft: 10,
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});
