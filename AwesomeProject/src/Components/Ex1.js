import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';

class Header extends Component {
  render() {
    return (
      <View style={styles.Header}>
        <View style={styles.content_Header}>
          <Text style={styles.TextHeader}>Classify transaction</Text>
          <Text style={styles.SubHeader}>Classify this transaction into a</Text>
          <Text style={styles.SubHeader}>particular category</Text>
        </View>
      </View>
    );
  }
}

export default class Ex1 extends Component {
  render() {
    return (
      <View style={styles.Body}>
        <Header></Header>
        <View
          style={{
            flex: 2,
            backgroundColor: '#272942',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          <View style={styles.ContainerBlock}>
            <View style={styles.ItemBlock}>
              <AntDesignIcon
                name="appstore1"
                style={styles.Item}></AntDesignIcon>
            </View>
            <Text style={styles.ItemText}>General</Text>
          </View>

          <View style={styles.ContainerBlock}>
            <View style={[styles.ItemBlock, {backgroundColor: '#8359FF'}]}>
              <FontAwesome5Icon
                name="bus"
                style={styles.Item}></FontAwesome5Icon>
            </View>
            <Text style={[styles.ItemText, {color: '#8359FF'}]}>Transport</Text>
          </View>
          <View style={styles.ContainerBlock}>
            <View style={[styles.ItemBlock, {backgroundColor: '#FF76EA'}]}>
              <FontAwesome5Icon
                name="shopping-bag"
                style={[styles.Item, {right: 3}]}></FontAwesome5Icon>
            </View>
            <Text style={[styles.ItemText, {color: '#FA44E2'}]}>Shopping</Text>
          </View>
          <View style={styles.ContainerBlock}>
            <View style={[styles.ItemBlock, {backgroundColor: '#FDB484'}]}>
              <FontAwesomeIcon
                name="file-text"
                style={[styles.Item, {right: 3}]}></FontAwesomeIcon>
            </View>
            <Text style={[styles.ItemText, {color: '#FE9149'}]}>Bills</Text>
          </View>
          <View style={styles.ContainerBlock}>
            <View style={[styles.ItemBlock, {backgroundColor: '#7298FD'}]}>
              <FontAwesomeIcon
                name="youtube-play"
                style={[styles.Item, {right: 1}]}></FontAwesomeIcon>
            </View>
            <Text style={[styles.ItemText, {color: '#4C78FC'}]}>
              Entertainment
            </Text>
          </View>
          <View style={styles.ContainerBlock}>
            <View style={[styles.ItemBlock, {backgroundColor: '#49E66B'}]}>
              <FontAwesomeIcon
                name="shopping-basket"
                style={[styles.Item, {right: 1}]}></FontAwesomeIcon>
            </View>
            <Text style={[styles.ItemText, {color: '#49E66B'}]}>Grocery</Text>
          </View>
        </View>
        <Footer></Footer>
      </View>
    );
  }
}
class Footer extends Component {
  render() {
    return (
      <View
        style={{
          height: 200,
          backgroundColor: '#373856',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <View>
          <FontAwesomeIcon style={[styles.FooterItem]} name="shopping-cart" />
        </View>
        <View>
          <Ionicon
            style={[styles.FooterItem, {margin: 50}]}
            name="md-stats-chart"
          />
        </View>
        <View>
          <FontistoIcon style={styles.FooterItem} name="person" />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Body: {
    height: 800,
  },
  Header: {
    height: 150,
    backgroundColor: '#272942',
  },
  content_Header: {
    position: 'absolute',
    top: 34,
    left: 32,
  },
  TextHeader: {
    color: 'white',
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 10,
  },
  SubHeader: {
    color: 'white',
  },
  ContainerBlock: {
    marginTop: 5,
    width: 170,
    height: 130,
    backgroundColor: '#404272',
    borderRadius: 25,
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ItemBlock: {
    width: 60,
    height: 60,
    backgroundColor: '#37A7F7',
    borderRadius: 50,
    marginTop: 20,
  },
  Item: {
    fontSize: 40,
    position: 'absolute',
    marginHorizontal: 10,
    top: 9,
    color: 'white',
  },
  ItemText: {
    color: '#6B9DD8',
    position: 'absolute',
    bottom: 15,
    fontSize: 15,
  },
  FooterItem: {fontSize: 30, marginTop: 14, color: '#73729A', fontSize: 25},
});
