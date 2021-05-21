import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
class Mode extends Component {
  render() {
    return (
      <View>
        <Ionicons name="ios-grid" size={24}></Ionicons>
      </View>
    );
  }
}

class Grid extends Component {
  render() {
    return (
      <View>
        <Ionicons
          name="list"
          size={24}
          style={{paddingLeft: 7, paddingRight: 7}}></Ionicons>
      </View>
    );
  }
}
class Square extends Component {
  render() {
    return (
      <View>
        <Ionicons name="ios-square" size={24}></Ionicons>
      </View>
    );
  }
}

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      mode: 'gird',
      selectImage: null,
    };
  }
  GetPhoto = () => {
    fetch('https://picsum.photos/v2/list')
      .then((response) => response.json())
      .then((json) => {
        this.setState({photos: json});
      })
      .catch((error) => {
        console.error(error);
      });
  };
  componentDidMount() {
    this.GetPhoto();
  }
  renderItem = ({item}) => {
    return (
      <View style={{flex: 1, margin: 2}}>
        <View
          style={{
            width: '100%',
            height: this.state.mode === 'list' ? height / 3 : height / 6,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                mode: 'view',
                selectedImage: item,
              });
            }}>
            <Image
              source={{
                uri: 'https://picsum.photos/400/400/?image=' + item.id,
              }}
              style={{height: '100%', width: '100%'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.MenuList}>
          <TouchableOpacity
            onPress={() => {
              this.setState({mode: 'grid'});
            }}>
            <Mode></Mode>
          </TouchableOpacity>
          {/* ----- */}
          <TouchableOpacity
            onPress={() => {
              this.setState({mode: 'list'});
            }}>
            <Grid></Grid>
          </TouchableOpacity>
          {/* ------ */}
          <TouchableOpacity
            onPress={() => {
              this.setState({mode: 'slide'});
            }}>
            <Square></Square>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          {this.state.mode !== 'slide' && (
            <FlatList
              data={this.state.photos}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={this.state.mode === 'list' ? 1 : 3}
              key={this.state.mode === 'list' ? 1 : 0}
            />
          )}
          {this.state.mode === 'slide' && (
            <View
              style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
              <FlatList
                style={{marginLeft: 2, marginRight: 2}}
                data={this.state.photos}
                renderItem={({item}) => (
                  <Image
                    resizeMode="contain"
                    source={{
                      uri: 'https://picsum.photos/1600/1200/?image=' + item.id,
                    }}
                    style={{width: width - 5, height: '100%'}}
                  />
                )}
                horizontal={true}
                pagingEnabled={true}
              />
            </View>
          )}
          {this.state.mode === 'view' && (
            <View
              style={{
                height: height,
                width: width,
                position: 'absolute',
                justifyContent: 'center',
                backgroundColor: '#000000',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({mode: 'grid'});
                }}>
                <View style={{}}>
                  <Image
                    source={{
                      uri:
                        'https://picsum.photos/800/600/?image=' +
                        this.state.selectedImage.id,
                    }}
                    style={{height: height / 2, width: '100%'}}></Image>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 800,
  },
  MenuList: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 6,
    backgroundColor: 'red',
    alignItems: 'center',
  },
});
