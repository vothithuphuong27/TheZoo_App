/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */

import * as Animatable from 'react-native-animatable';
import * as Yup from 'yup';

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
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

import auth, {firebase} from '@react-native-firebase/auth';
import TextBox from '../../../components/Texbox';
import colors from '../../../constants/color';
//Alert
import {FancyAlert} from 'react-native-expo-fancy-alerts';
import {set} from 'lodash';

// YUP
const ChangePaswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Mật khẩu không được trống'),
  newPassword: Yup.string()
    .required('Vui lòng nhập mật khẩu mới')
    .min(6, 'mật khẩu phải lớn hơn 6 kí tự'),
  confirmPassword: Yup.string()
    .required('vui lòng xác nhận mật khẩu')
    .when('newPassword', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('newPassword')],
        'Mật khẩu bạn nhập không khớp',
      ),
    }),
});

const SignIn = () => {
  const [visible, setVisible] = React.useState(false);
  const Touch =
    Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;
  // REDUX

  //   const a = useSelector((state) => console.log(state.auth.password));
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  // THEMNE
  const paperColor = useTheme().colors;

  // NAVIGATION
  const navigation = useNavigation();
  //   var user = firebase.auth().currentUser;
  //   console.log(user.email);
  // RENDER
  const user = firebase.auth().currentUser;

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
              email: user.email,
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={ChangePaswordSchema}
            onSubmit={(values) => {
              setLoading(!loading);
              if (values.currentPassword === values.newPassword) {
                Alert.alert('Mật khẩu mới không được giống mật khẩu cũ');
                setLoading(false);
                return;
              }

              firebase
                .auth()
                .signInWithEmailAndPassword(
                  values.email,
                  values.currentPassword,
                )
                .then((userCredential) => {
                  console.log(userCredential);
                  user.updatePassword(values.newPassword).then((p) => {
                    setVisible(true);
                    setLoading(false);
                  });
                })
                .catch((error) => {
                  console.log(error);
                  if (error.code === 'auth/wrong-password') {
                    setLoading(false);
                    Alert.alert('Mật khẩu cũ bạn nhập không đúng!');
                  }
                  if (error.code === 'auth/too-many-requests') {
                    setLoading(false);
                    Alert.alert(
                      'Bạn đã đạt tối đa số lần đổi mật khẩu trong ngày.',
                    );
                  }
                });
            }}>
            {(formik) => (
              <React.Fragment>
                <View
                  style={{flex: 0, justifyContent: 'flex-start', padding: 16}}>
                  <TextBox
                    name="currentPassword"
                    secureTextEntry
                    disabled={loading}
                    placeholder="Nhập mật khẩu hiện tại "
                    containerStyle={{borderWidth: 0, backgroundColor: 'white'}}
                    inputContainerStyle={{borderBottomWidth: 1.5}}
                    leftIconContainerStyle={{marginLeft: 12}}
                    onBlur={() => formik.handleBlur('currentPassword')}
                    onChangeText={formik.handleChange('currentPassword')}
                    value={formik.values.currentPassword}
                  />

                  <TextBox
                    name="newPassword"
                    secureTextEntry
                    iconName="lock"
                    disabled={loading}
                    placeholder="Mật khẩu mới"
                    containerStyle={{borderWidth: 0, backgroundColor: 'white'}}
                    inputContainerStyle={{borderBottomWidth: 1.5}}
                    leftIconContainerStyle={{marginLeft: 12}}
                    onBlur={() => formik.handleBlur('newPassword')}
                    onChangeText={formik.handleChange('newPassword')}
                    value={formik.values.newPassword}
                  />

                  <TextBox
                    name="confirmPassword"
                    iconName="shield-lock"
                    secureTextEntry
                    disabled={loading}
                    placeholder="Xác nhận mật khẩu mới"
                    containerStyle={{borderWidth: 0, backgroundColor: 'white'}}
                    inputContainerStyle={{borderBottomWidth: 1.5}}
                    leftIconContainerStyle={{marginLeft: 12}}
                    onBlur={() => formik.handleBlur('confirmPassword')}
                    onChangeText={formik.handleChange('confirmPassword')}
                    value={formik.values.confirmPassword}
                  />
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
                    }}
                    style={{elevation: 0}}
                    uppercase={false}
                    icon="key"
                    mode="contained"
                    onPress={formik.handleSubmit}
                    dark>
                    {loading ? 'Đang đổi mật khẩu...' : 'Đổi mật khẩu'}
                  </Button>

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
                          <Text style={{}}>Đổi mật khẩu thành công ..!</Text>
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
                </Animatable.View>
              </React.Fragment>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
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
export default SignIn;
