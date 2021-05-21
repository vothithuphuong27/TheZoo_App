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
import {registerAction} from '../actions/';
//Alert
import {FancyAlert} from 'react-native-expo-fancy-alerts';

// YUP
const RegisterSchema = Yup.object().shape({
  email: Yup.string().required('Địa chỉ email không được trống'),
  password: Yup.string()
    .required('Mật khẩu không được trống')
    .min(6, 'mật khẩu phải lớn hơn 5 kí tự'),
  name: Yup.string().required('Tên không được trống'),
  confirmPassword: Yup.string()
    .required('Mật khẩu không được để trống')
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Mật khẩu bạn nhập không khớp',
      ),
    }),
});

const SignIn = () => {
  const [visible, setVisible] = React.useState(false);
  const Touch =
    Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;
  // REDUX
  // const loading = useSelector((state) => state.auth.loading);
  const [loading, setLoading] = React.useState(false);
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
            initialValues={{
              email: '',
              password: '',
              role: 'User',
              name: '',
              confirmPassword: '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
              setLoading(true);
              auth()
                .createUserWithEmailAndPassword(values.email, values.password)
                .then(() => {
                  let uid = auth().currentUser.uid;
                  auth().currentUser.updateProfile({displayName: values.name});
                  // Update role
                  firestore().collection('Profiles').doc(uid).set({
                    role: 'User',
                    name: values.name,
                  });
                  setVisible(true);
                })
                .catch((error) => {
                  if (error.code === 'auth/email-already-in-use') {
                    setLoading(false);

                    Alert.alert('Email này đã tồn tại!');
                  }

                  if (error.code === 'auth/invalid-email') {
                    setLoading(false);

                    Alert.alert('Địa chỉ email không hợp lệ!');
                  }

                  // console.error(error);
                });
            }}>
            {(formik) => (
              <React.Fragment>
                <View
                  style={{alignItems: 'center', padding: 16, paddingTop: 36}}>
                  <Headline
                    style={{color: paperColor.primary, fontWeight: '400'}}>
                    ĐĂNG KÝ
                  </Headline>
                </View>
                <View
                  style={{flex: 0, justifyContent: 'flex-start', padding: 16}}>
                  <TextBox
                    name="name"
                    disabled={loading}
                    iconName="account"
                    placeholder="Họ Tên "
                    containerStyle={{borderWidth: 0, backgroundColor: 'white'}}
                    inputContainerStyle={{borderBottomWidth: 1.5}}
                    leftIconContainerStyle={{marginLeft: 12}}
                    onBlur={() => formik.handleBlur('name')}
                    onChangeText={formik.handleChange('name')}
                    value={formik.values.name}
                  />
                  <TextBox
                    name="email"
                    autoCapitalize="none"
                    iconName="email"
                    disabled={loading}
                    placeholder="Tài khoản gmail"
                    containerStyle={{borderWidth: 0, backgroundColor: 'white'}}
                    inputContainerStyle={{borderBottomWidth: 1.5}}
                    leftIconContainerStyle={{marginLeft: 12}}
                    onBlur={() => formik.handleBlur('email')}
                    onChangeText={formik.handleChange('email')}
                    value={formik.values.email}
                  />
                  <View height={16} />
                  <TextBox
                    name="password"
                    iconName="lock"
                    secureTextEntry
                    disabled={loading}
                    placeholder="Mật khẩu"
                    containerStyle={{borderWidth: 0, backgroundColor: 'white'}}
                    inputContainerStyle={{borderBottomWidth: 1.5}}
                    leftIconContainerStyle={{marginLeft: 12}}
                    onBlur={() => formik.handleBlur('password')}
                    onChangeText={formik.handleChange('password')}
                    value={formik.values.password}
                  />

                  <TextBox
                    name="confirmPassword"
                    iconName="shield-lock"
                    secureTextEntry
                    disabled={loading}
                    placeholder="Nhập lại mật khẩu"
                    containerStyle={{borderWidth: 0, backgroundColor: 'white'}}
                    inputContainerStyle={{borderBottomWidth: 1.5}}
                    leftIconContainerStyle={{marginLeft: 12}}
                    onBlur={() => formik.handleBlur('confirmPassword')}
                    onChangeText={formik.handleChange('confirmPassword')}
                    value={formik.values.confirmPassword}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('SignInScreen');
                    }}>
                    <View style={{alignItems: 'flex-end', padding: 12}}>
                      <Text>Đã có tài khoản</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Animatable.View
                  animation="slideInUp"
                  duration={1000}
                  style={{
                    flex: 1,
                    padding: 16,
                    justifyContent: 'flex-end',
                  }}>
                  {!visible && (
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
                      {loading ? 'Đang đăng ký ...' : 'Đăng ký'}
                    </Button>
                  )}
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
                          <Text style={{}}>Đăng ký thành công ..!</Text>
                          <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                              setVisible(false);
                              navigation.navigate('SignInScreen');
                            }}>
                            <Text style={styles.btnText}>OK</Text>
                          </TouchableOpacity>
                        </View>
                      </FancyAlert>
                    </View>
                  )}
                  <Touch
                    onPress={() => {
                      navigation.navigate('SignInScreen');
                    }}>
                    <View style={{alignItems: 'center', padding: 12}}></View>
                  </Touch>
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
