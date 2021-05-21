/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */

import * as Animatable from 'react-native-animatable';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import React from 'react';
import {Button, Headline, useTheme} from 'react-native-paper';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import auth, {firebase} from '@react-native-firebase/auth';
import TextBox from '../../../components/Texbox';
import colors from '../../../constants/color';

// YUP
const Schema = Yup.object().shape({
  title: Yup.string().required(),
  body: Yup.string().required(),
});

const SendNotifiactionScreen = () => {
  const [percent, setPercent] = React.useState(0);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [playerIds, setPlayerId] = React.useState([]);
  const signedInUser = useSelector((state) => state.auth.signedInUser);
  const [dataPlayers, setDataPlayers] = React.useState([]);
  const Touch =
    Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;
  // REDUX
  // const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  // THEMNE
  const paperColor = useTheme().colors;
  const [loading, setLoading] = React.useState(false);

  // NAVIGATION
  const navigation = useNavigation();

  function SendNotificationToAllUser(title, body, imageUrl, playerIds) {
    const url = 'https://onesignal.com/api/v1/notifications';
    const data = {
      app_id: '6ec8c890-6818-4f8a-9424-85935856d8bd',
      include_player_ids: playerIds,
      large_icon: 'ic_action_cloud_upload',
      android_group: 'group-1',
      android_group_message: {en: 'You have $[notif_count] new messages'},
      ios_badgeType: 'Increase',
      ios_badgeCount: 1,
      thread_id: 1,
      summary_arg_count: 1,
      summary_arg: 'React Native',
      body: body,
      type: 'public',
      createdTime: firestore.Timestamp.now(),
      title: title,
      // userUid: signedInUser.uid,
      // type: 'public',
      headings: {
        en: 'Bạn có một thông báo từ Shop Mrkatsu',
      },
      contents: {
        en: body,
      },
      big_picture: imageUrl,

      ios_attachments: {
        id1: imageUrl,
      },
    };

    axios
      .post(url, data)
      .then((response) => {
        firestore()
          .collection('Notifications')
          .add({
            body: data.body,
            createdTime: data.createdTime,
            title: data.title,
            type: data.type,
            content: data.contents,
            imageUrl: data.big_picture,
          })
          .then((ref) => {
            dataPlayers.forEach((p) => {
              // console.log(p.id);
              // if (p.NumberNotification) {
              //   firestore()
              //     .collection('PlayerId')
              //     .doc(p.playerID)
              //     .update({
              //       NumberNotification: 1,
              //     })
              //     .then(() => {
              //       console.log('save player_id updated!');
              //     });
              // } else {
              firestore()
                .collection('PlayerId')
                .doc(p.id)
                .update({
                  NumberNotification: p.NumberNotification + 1,
                })
                .then(() => {
                  console.log('save player_id updated!');
                });
              // }
            });
            // ref
            //   .get()
            //   .then((documentSnapshot) => {
            //     let createdOrder = documentSnapshot.data();
            //     createdOrder.id = documentSnapshot.id;
            //     //   console.log(createdOrder);
            //     // resolve(createdOrder);
            //   })
            //   .catch((error) => {
            //     console.log(error);
            //   });
          });
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
      });
  }

  const getAllPlayerID = () => {
    const data = [];
    firestore()
      .collection('PlayerId')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const playerId = documentSnapshot.data().playerID;
          // playerId.id = documentSnapshot.id;
          data.push(playerId);
        });

        setPlayerId(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Alert.alert('Error', 'Something is wrong!');
        setPlayerId([]);
        setLoading(false);
      });
  };
  // console.log(playerIds);
  React.useEffect(getAllPlayerID, []);

  const getNumberNotificationUser = () => {
    const data = [];
    firestore()
      .collection('PlayerId')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const playerId = documentSnapshot.data();
          playerId.id = documentSnapshot.id;

          data.push(playerId);
        });

        setDataPlayers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Alert.alert('Error', 'Something is wrong!');
        setDataPlayers([]);
        setLoading(false);
      });
  };

  React.useEffect(getNumberNotificationUser, []);

  // RENDER
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        activeOpacity={1}
        style={{flex: 1, backgroundColor: colors.WHITE}}
        onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{flex: 1}}>
          <Formik
            initialValues={{
              title: '',
              type: 'public',
              body: '',
              image: imageUrl,
            }}
            validationSchema={Schema}
            onSubmit={(values) => {
              SendNotificationToAllUser(
                values.title,
                values.body,
                imageUrl,
                playerIds,
              );
              navigation.navigate('UserListScreen');
            }}>
            {(formik) => (
              <React.Fragment>
                <View
                  style={{alignItems: 'center', padding: 16, paddingTop: 36}}>
                  <Headline
                    style={{color: paperColor.primary, fontWeight: '400'}}>
                    Thông Báo
                  </Headline>
                </View>
                <View
                  style={{flex: 0, justifyContent: 'flex-start', padding: 16}}>
                  <TextBox
                    name="title"
                    disabled={loading}
                    placeholder="Tiêu đề "
                    containerStyle={{borderWidth: 0, backgroundColor: 'white'}}
                    inputContainerStyle={{borderBottomWidth: 1.5}}
                    leftIconContainerStyle={{marginLeft: 12}}
                    onBlur={() => formik.handleBlur('title')}
                    onChangeText={formik.handleChange('title')}
                    value={formik.values.title}
                  />

                  <TextBox
                    name="body"
                    autoCapitalize="none"
                    iconName="account"
                    disabled={loading}
                    placeholder="Nội dung"
                    containerStyle={{borderWidth: 0, backgroundColor: 'white'}}
                    inputContainerStyle={{borderBottomWidth: 1.5}}
                    leftIconContainerStyle={{marginLeft: 12}}
                    onBlur={() => formik.handleBlur('body')}
                    onChangeText={formik.handleChange('body')}
                    value={formik.values.body}
                  />
                  <View height={16} />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                      backgroundColor: '#04b040',
                      borderRadius: 15,
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      alignItems: 'center',
                      shadowColor: '#E67E22',
                      shadowOpacity: 0.8,
                      elevation: 8,
                      marginBottom: 10,
                    }}
                    onPress={() => {
                      ImagePicker.openPicker({
                        width: 300,
                        height: 300,
                        cropping: true,
                        // multiple: true,
                        compressImageQuality: 0.7,
                      }).then(async (image) => {
                        // create bucket storage reference to not yet existing image
                        console.log(image);
                        if (image) {
                          const {path} = image;
                          const filename = path.replace(/^.*[\\/]/, '');
                          const reference = storage().ref('images/' + filename);

                          // uploads file
                          const task = reference.putFile(path);

                          // uploading
                          task.on('state_changed', (taskSnapshot) => {
                            let currentPercent =
                              (taskSnapshot.bytesTransferred /
                                taskSnapshot.totalBytes) *
                              100;

                            setPercent(currentPercent);
                          });

                          // completed
                          task.then(() => {
                            storage()
                              .ref('images/' + filename)
                              .getDownloadURL()
                              .then((url) => {
                                console.log(url);
                                setImageUrl(url);
                                setPercent(0);
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          });
                        }
                      });
                    }}>
                    <Text>{percent == 0 ? 'tải ảnh' : 'Đang tải ảnh'}</Text>
                  </TouchableOpacity>
                  <ImageBackground
                    style={{alignItems: 'center', padding: 16, paddingTop: 36}}
                    source={{
                      uri: imageUrl ? imageUrl : null,
                    }}
                    style={{
                      height: 150,
                      width: 250,
                      alignContent: 'center',
                      alignSelf: 'center',
                    }}
                    imageStyle={{borderRadius: 15}}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}></View>
                  </ImageBackground>
                </View>
                <Animatable.View
                  animation="slideInUp"
                  duration={1000}
                  style={{
                    flex: 1,
                    padding: 16,
                    justifyContent: 'flex-end',
                  }}>
                  <Button
                    disabled={loading}
                    loading={loading}
                    labelStyle={{fontSize: 18}}
                    contentStyle={{
                      height: 48,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#00BFFF',
                    }}
                    style={{elevation: 0}}
                    uppercase={false}
                    icon="send"
                    mode="contained"
                    onPress={formik.handleSubmit}
                    dark>
                    {loading ? 'Đang gửi thông báo ...' : 'Gửi thông báo'}
                  </Button>
                </Animatable.View>
              </React.Fragment>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </View>
  );
};

export default SendNotifiactionScreen;
