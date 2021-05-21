/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconBack from 'react-native-vector-icons/Feather';

import {Button, Appbar, TouchableRipple} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import IconRemove from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {Alert} from 'react-native';
export default function ChatCustomerScreen({route, navigation}) {
  const loggedInUser = useSelector((state) => state.auth.signedInUser);
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const userName = loggedInUser?.displayName;
  const [clickIconImage, setClickIconImage] = React.useState(false);
  const [percent, setPercent] = React.useState(0);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [ImageSelect, setImageSelect] = React.useState(false);
  const [imageView, setImageView] = React.useState('');
  const [seenMassage, setSeenMessage] = React.useState('');

  const send = () => {
    firestore()
      .collection('Messages')
      .add({
        username: loggedInUser?.displayName,
        message: message,
        image: imageUrl,
        from: loggedInUser?.uid,
        to: route.params.id,
        createdTime: firestore.Timestamp.now(),
      })
      .then(() => {
        console.log('Message sent!');
      });
    setMessage('');
    setImageUrl(null);
    setClickIconImage(null);
  };

  const onResult = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((documentSnapshot) => {
      const m = documentSnapshot.data();
      m.id = documentSnapshot.id;
      data.push(m);
    });

    // set state

    setMessages(data);
  };

  const onError = (error) => {
    console.error(error);
  };
  const flatlistRef = React.useRef();
  const onPressFunction = () => {
    flatlistRef.current?.scrollToEnd();
  };
  React.useEffect(() => {
    setTimeout(onPressFunction, 200);
  }, []);

  React.useEffect(() => {
    // componentDidMount

    const subscriber = firestore()
      .collection('Messages')
      // Sắp xếp asc / desc
      .where('to', '==', route.params.id)
      .where('from', '==', loggedInUser.uid)
      .orderBy('createdTime', 'asc')
      .onSnapshot(onResult, onError);

    // componentWillUnmount
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);
  const output = Object.assign({}, ...messages);

  // seenMessage();
  function seenMessage(id) {
    firestore()
      .collection('Messages')
      .doc(id)
      .update({
        badges: true,
      })
      .then(() => {
        console.log('User updated!');
      });
    // Alert.alert();
    console.log('ss');
  }

  const renderItem = ({item}) => {
    if (item?.badges == false) {
      seenMessage(item.id);
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            margin: 4,
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent:
              item.username === userName ? 'flex-end' : 'flex-start',
          }}>
          {item.username !== userName && <Icon name="account" size={24} />}
          <View
            style={{
              // flex: 1,
              width: item.image ? '50%' : null,
              padding: 8,
              backgroundColor:
                item.username === userName ? '#0984e3' : '#636e72',
              borderTopLeftRadius: item.username === userName ? 8 : 0,
              borderBottomLeftRadius: item.username === userName ? 8 : 0,
              borderTopRightRadius: item.username !== userName ? 8 : 0,
              borderBottomRightRadius: item.username !== userName ? 8 : 0,
            }}>
            <Text style={{color: 'white'}}>{item.message}</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setImageSelect(true);
                setImageView(item.image);
              }}>
              <Image
                style={{
                  height:
                    !item.message || (item.message && item.image) ? 150 : 0,
                  width: '100%',
                }}
                resizeMode="cover"
                source={{
                  uri: item.image,
                }}
              />
            </TouchableOpacity>
          </View>

          {/* {item.username === userName && <Icon name="account" size={24} />} */}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />

        <Appbar.Content title="Chat" subtitle={route.params.name} />
      </Appbar.Header>
      <View style={{height: 24}} />
      {!ImageSelect && (
        <React.Fragment>
          <FlatList
            data={messages}
            ref={flatlistRef}
            onContentSizeChange={onPressFunction}
            keyExtractor={(item, index) => 'message-' + index}
            renderItem={renderItem}
            ItemSeparatorComponent={() => {
              return <View style={{height: 4}} />;
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: clickIconImage ? 150 : null,
              justifyContent: 'center',
            }}>
            <TextInput
              style={{
                flex: 1,
                height: 48,
                // position: 'relative',
                backgroundColor: 'white',
                paddingHorizontal: 24,
              }}
              mode="container"
              placeholder="Enter your message"
              underlineColor="transparent"
              value={message}
              onChangeText={(text) => {
                setMessage(text);
              }}

              // onEndEditing={send}
            />
            {clickIconImage && (
              <View
                style={{
                  flex: 1,
                  width: 100,
                  height: 90,
                  position: 'absolute',
                  bottom: 2,
                }}>
                <Text>Đang tải ảnh ....</Text>
              </View>
            )}

            {imageUrl && (
              <View
                style={{
                  flex: 1,
                  width: 100,
                  height: 90,
                  position: 'absolute',
                  bottom: 20,
                }}>
                <ImageBackground
                  source={{
                    uri: imageUrl,
                  }}
                  style={{height: 100, width: 100}}
                  imageStyle={{borderRadius: 15}}>
                  <TouchableRipple
                    onPress={() => {
                      setImageUrl(null);
                      setClickIconImage(null);
                    }}>
                    <IconRemove
                      name="remove"
                      size={20}
                      color="red"
                      style={{}}
                    />
                  </TouchableRipple>
                </ImageBackground>
              </View>
            )}
            <Button
              title="images"
              icon="image"
              // mode="text"
              // onPress={send}
              onPress={() => {
                ImagePicker.openPicker({
                  width: 300,
                  height: 400,
                  cropping: false,
                }).then(async (image) => {
                  // create bucket storage reference to not yet existing image
                  // console.log(image);
                  if (image) {
                    setClickIconImage(true);
                    const {path} = image;
                    const filename = path.replace(/^.*[\\/]/, '');
                    const reference = storage().ref('chats/' + filename);

                    // uploads file
                    const task = reference.putFile(path);

                    // uploading
                    task.on('state_changed', (taskSnapshot) => {
                      let currentPercent =
                        (taskSnapshot.bytesTransferred /
                          taskSnapshot.totalBytes) *
                        100;
                      // console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                      setPercent(currentPercent);
                    });

                    // completed
                    task.then(() => {
                      console.log('Image uploaded to the bucket!');
                      storage()
                        .ref('chats/' + filename)
                        .getDownloadURL()
                        .then((url) => {
                          console.log(url);
                          setImageUrl(url);
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    });
                  }
                });
              }}
              contentStyle={{
                height: 48,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
            <Button
              icon="send"
              mode="text"
              disabled={!message && !imageUrl}
              onPress={send}
              contentStyle={{
                height: 48,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </View>
        </React.Fragment>
      )}
      {ImageSelect && (
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <TouchableRipple
            onPress={() => {
              setImageSelect(false);
            }}
            style={{
              color: 'red',
              textAlign: 'center',
              alignItems: 'center',
              backgroundColor: '#ebebeb',
            }}>
            <IconBack name="x" backgroundColor="red" size={20} />
          </TouchableRipple>
          <ImageBackground
            source={{uri: imageView}}
            resizeMode="contain"
            style={{
              flex: 1,
              marginTop: 3,
            }}></ImageBackground>
        </View>
      )}
    </SafeAreaView>
  );
}
