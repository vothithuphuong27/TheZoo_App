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
import {createCategoryAction} from '../../../modules/main/actions';
// YUP
// const Schema = Yup.object().shape({
//   nameCategory: Yup.string().required(),
// });

// function CreateCategory() {}

const CreateBannerScreen = () => {
  const [percent, setPercent] = React.useState(0);
  const [imageUrl, setImageUrl] = React.useState(null);
  const signedInUser = useSelector((state) => state.auth.signedInUser);

  const Touch =
    Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;
  // REDUX
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  // THEMNE
  const paperColor = useTheme().colors;

  // NAVIGATION
  const navigation = useNavigation();

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
            initialValues={{}}
            // validationSchema={Schema}
            onSubmit={(values) => {
              if (imageUrl) {
                //  FirestoreService.CreateCategory(values.nameCategory, imageUrl)
                //    .then((result) => {
                //      console.log(result);
                //      navigation.goBack();
                //    })
                //    .catch(() => {
                //      console.log('error');
                //    });
                firestore()
                  .collection('Banners')
                  .add({
                    imageUrl: imageUrl,
                  })
                  .then(() => {
                    console.log('banner added!');
                    navigation.goBack();
                  });
              } else {
                alert('bạn chưa tải ảnh danh mục');
              }
              // navigation.navigate('UserListScreen');
            }}>
            {(formik) => (
              <React.Fragment>
                {/* <View
                  style={{alignItems: 'center', padding: 16, paddingTop: 36}}>
                  <Headline
                    style={{color: paperColor.primary, fontWeight: '400'}}>
                  </Headline>
                </View> */}
                <View
                  style={{flex: 0, justifyContent: 'flex-start', padding: 16}}>
                  {/* <TextBox
                    name="nameCategory"
                    disabled={loading}
                    placeholder="Tên danh mục "
                    containerStyle={{borderWidth: 0, backgroundColor: 'white'}}
                    inputContainerStyle={{borderBottomWidth: 1.5}}
                    leftIconContainerStyle={{marginLeft: 12}}
                    onBlur={() => formik.handleBlur('nameCategory')}
                    onChangeText={formik.handleChange('nameCategory')}
                    value={formik.values.nameCategory}
                  /> */}

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
                        if (image) {
                          const {path} = image;
                          const filename = path.replace(/^.*[\\/]/, '');
                          const reference = storage().ref(
                            'banners/' + filename,
                          );

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
                              .ref('banners/' + filename)
                              .getDownloadURL()
                              .then((url) => {
                                // console.log(url);
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
                    style={{
                      flex: 1,
                    }}
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
                    {loading ? 'Đang tạo banner ...' : 'Tạo banner'}
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

export default CreateBannerScreen;
