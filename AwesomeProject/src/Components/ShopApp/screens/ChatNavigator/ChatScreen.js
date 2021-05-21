/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  ImageBackground,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import IconRemove from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Appbar, TouchableRipple} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import IconBack from 'react-native-vector-icons/Feather';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
export default function ChatScreen({route, navigation}) {
  const loggedInUser = useSelector((state) => state.auth.signedInUser);
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [percent, setPercent] = React.useState(0);
  const [clickIconImage, setClickIconImage] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(null);
  const flatlistRef = React.useRef();
  const [ImageSelect, setImageSelect] = React.useState(false);
  const [imageView, setImageView] = React.useState('');
  const [status, setStatus] = React.useState(false);

  const onPressFunction = () => {
    flatlistRef.current.scrollToEnd();
  };
  React.useEffect(() => {
    setTimeout(onPressFunction, 200);
  }, []);
  const userName = loggedInUser?.displayName;
  const uidAdmin = route.params.id;

  useEffect(() => {
    const onValueChange = database()
      .ref(`/online/${uidAdmin}`)
      .on('value', (snapshot) => {
        setStatus(snapshot.val());
      });

    // Stop listening for updates when no longer required
    return () =>
      database().ref(`/online/${uidAdmin}`).off('value', onValueChange);
  }, []);

  const send = () => {
    firestore()
      .collection('Messages')
      .add({
        username: loggedInUser.displayName,
        image: imageUrl,
        message: message,
        badges: false,
        to: loggedInUser.uid,
        from: uidAdmin,
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

    // lặp qua từng document

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

  React.useEffect(() => {
    // componentDidMount
    const subscriber = firestore()
      .collection('Messages')
      // Sắp xếp asc / desc

      .where('to', '==', loggedInUser.uid)
      .where('from', '==', route.params.id)
      .orderBy('createdTime', 'asc')

      .onSnapshot(onResult, onError);

    // componentWillUnmount
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const renderItem = ({item}) => {
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

        <Appbar.Content
          titleStyle={{fontSize: 18}}
          title={route.params.name}
          subtitle={status ? 'Online ' : 'Offline'}
          subtitleStyle={{color: status ? '#4CAF50' : 'red', fontWeight: '700'}}
        />

        {/* <Text style={{color: 'green'}}> </Text> */}
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
            {/* <ImageBackground
          source={{
            uri: imageUrl,
          }}
          style={{height: 100, width: 100}}
          imageStyle={{borderRadius: 15}}>
          <View style={{}}>
            <Icon name="camera" size={35} color="#fff" style={{}} />
          </View>
        </ImageBackground> */}
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
              disabled={!imageUrl && !message}
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
