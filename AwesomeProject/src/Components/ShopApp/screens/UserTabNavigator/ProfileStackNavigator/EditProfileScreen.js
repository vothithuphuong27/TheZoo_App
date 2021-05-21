/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import * as Yup from 'yup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {FancyAlert} from 'react-native-expo-fancy-alerts';
import color from '../../../constants/color';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

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
  StyleSheet,
  ImageBackground,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {updateProfileAction} from '../../../modules/auth/actions/';
import auth, {firebase} from '@react-native-firebase/auth';
import TextBox from '../../../components/Texbox';
import colors from '../../../constants/color';

// YUP
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required(),
  phone: Yup.string().required(),
});

const EditProfileScreen = ({route}) => {
  const Touch =
    Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;
  // REDUX
  const loading = useSelector((state) => state.auth.loading);
  // console.log(loading);
  const dispatch = useDispatch();
  // THEMNE
  const paperColor = useTheme().colors;

  // NAVIGATION
  const navigation = useNavigation();

  const [imageUrl, setImageUrl] = React.useState(route.params.imageUrl);
  const [percent, setPercent] = React.useState(0);
  const [loadingImage, setLoadingImage] = React.useState(false);

  const {colors} = useTheme();
  const [visible, setVisible] = React.useState(false);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
      multiple: true,
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
          let currentPercent = (
            (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            100
          ).toFixed(2);
          // console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
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
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    });

    // setImageUrl(image.path);
    this.bs.current.snapTo(1);
  };
  const uploadAndDowload = () => {};
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      // multiple: true,
      compressImageQuality: 0.7,
    }).then(async (image) => {
      // create bucket storage reference to not yet existing image
      // console.log(image);
      if (image) {
        const {path} = image;
        const filename = path.replace(/^.*[\\/]/, '');
        const reference = storage().ref('images/' + filename);

        // uploads file
        const task = reference.putFile(path);

        // uploading
        task.on('state_changed', (taskSnapshot) => {
          let currentPercent =
            (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
          // console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
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
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    });
    this.bs.current.snapTo(1);
  };

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  bs = React.createRef();
  fall = new Animated.Value(1);

  return (
    <View style={{flex: 1}}>
      {/* console.log(imageUrl); */}
      <TouchableOpacity
        style={{flex: 1, backgroundColor: colors.WHITE}}
        onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{flex: 1}}>
          <Formik
            initialValues={{
              name: route.params.name,
              phone: '123',
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
              // console.log(imageUrl);

              dispatch(
                updateProfileAction(values.name, imageUrl, values.phone),
              );
              // <AppErrorModal/>
              setVisible(true);
            }}>
            {(formik) => (
              <View style={styles.container}>
                <BottomSheet
                  ref={this.bs}
                  snapPoints={[330, 0]}
                  renderContent={this.renderInner}
                  renderHeader={this.renderHeader}
                  initialSnap={1}
                  callbackNode={this.fall}
                  enabledGestureInteraction={true}
                />

                <Animated.View
                  style={{
                    margin: 20,
                    opacity: Animated.add(
                      0.1,
                      Animated.multiply(this.fall, 1.0),
                    ),
                  }}>
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.bs.current.snapTo(0);
                      }}>
                      <View
                        style={{
                          height: 100,
                          width: 100,
                          borderRadius: 15,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <ImageBackground
                          source={{
                            uri: imageUrl ? imageUrl : route.params.imageUrl,
                          }}
                          style={{height: 100, width: 100}}
                          imageStyle={{borderRadius: 15}}>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Icon
                              name="camera"
                              size={35}
                              color="#fff"
                              style={{
                                opacity: 0.7,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: '#fff',
                                borderRadius: 10,
                              }}
                            />
                          </View>
                        </ImageBackground>
                      </View>
                    </TouchableOpacity>
                    {percent !== 0 && <Text>{percent}%</Text>}
                    {/* <Text>{imageUrl}</Text> */}
                    <Text
                      style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
                      {route.params.name}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 0,
                      justifyContent: 'flex-start',
                      paddingTop: 10,
                    }}>
                    <TextBox
                      name="name"
                      disabled={loading}
                      iconName="account"
                      placeholder="Họ Tên "
                      containerStyle={{
                        borderWidth: 0,
                        backgroundColor: null,
                      }}
                      inputContainerStyle={{borderBottomWidth: 1.5}}
                      leftIconContainerStyle={{marginLeft: 12}}
                      onBlur={() => formik.handleBlur('name')}
                      onChangeText={formik.handleChange('name')}
                      value={formik.values.name}
                    />
                  </View>

                  {/* <View
                    style={{
                      flex: 0,
                      justifyContent: 'flex-start',
                      paddingTop: 10,
                    }}>
                    <TextBox
                      name="phone"
                      disabled={loading}
                      placeholder="số điện thoại "
                      containerStyle={{
                        borderWidth: 0,
                        backgroundColor: null,
                      }}
                      iconName="phone"
                      inputContainerStyle={{borderBottomWidth: 1.5}}
                      
                      leftIconContainerStyle={{marginLeft: 12}}
                      onBlur={() => formik.handleBlur('phone')}
                      onChangeText={formik.handleChange('phone')}
                      value={formik.values.phone}
                    />
                  </View> */}
                  {visible && (
                    <View>
                      <FancyAlert
                        visible={visible}
                        icon={
                          <View
                            style={{
                              flex: 1,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#4CB748',
                              borderRadius: 50,
                              width: '100%',
                            }}>
                            <Text>
                              <Icon name="check" size={30} color="white"></Icon>
                            </Text>
                          </View>
                        }
                        style={{backgroundColor: 'white'}}>
                        <View style={styles.content}>
                          <Text style={{}}>
                            Cập nhật thông tin thành công...!
                          </Text>
                          <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                              setVisible(false);
                              navigation.navigate('ProfileScreen');
                            }}>
                            <Text style={styles.btnText}>OK</Text>
                          </TouchableOpacity>
                        </View>
                      </FancyAlert>
                    </View>
                  )}
                  {!visible && (
                    <TouchableOpacity
                      disabled={loading}
                      style={styles.commandButton}
                      onPress={formik.handleSubmit}>
                      <Text style={styles.panelButtonTitle}>Submit</Text>
                    </TouchableOpacity>
                  )}
                </Animated.View>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: color.PRIMARY,
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: color.PRIMARY,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  alert: {
    backgroundColor: '#EEEEEE',
  },
  icon: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C3272B',
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -16,
    marginBottom: 16,
  },
  contentText: {
    textAlign: 'center',
  },
  btn: {
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
    backgroundColor: '#4CB748',
    marginTop: 16,
    minWidth: '50%',
    paddingHorizontal: 16,
  },
  btnText: {
    color: '#FFFFFF',
  },
});
