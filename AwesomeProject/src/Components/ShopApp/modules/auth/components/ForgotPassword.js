/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */

import * as Animatable from 'react-native-animatable';
import * as Yup from 'yup';
import FastImage from 'react-native-fast-image';
import React from 'react';
import {Button, Headline, useTheme} from 'react-native-paper';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth, {firebase} from '@react-native-firebase/auth';

import TextBox from '../../../components/Texbox';
import colors from '../../../constants/color';
import {signInAction} from '../actions/';

// YUP
const SignInSchema = Yup.object().shape({
  email: Yup.string().required(),
});

const ForgotPassword = () => {
  const Touch =
    Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;
  // REDUX
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  // THEMNE
  const paperColor = useTheme().colors;

  // NAVIGATION
  const navigation = useNavigation();
  // REFS
  const containerRef = React.useRef(null);
  const logoRef = React.useRef(null);

  // EFFECTS
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        containerRef.current.transitionTo({height: 0}, 1000);
        containerRef.current.fadeOutUpBig(750);
        logoRef.current.transitionTo({height: 0}, 750);
        logoRef.current.fadeOutUpBig(500);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        containerRef.current.transitionTo({height: 240}, 500);
        containerRef.current.fadeInDownBig(750);

        logoRef.current.transitionTo({height: 240}, 150);
        logoRef.current.fadeInDownBig(1000);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
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
            }}
            validationSchema={SignInSchema}
            onSubmit={(values) => {
              // dispatch(signInAction(values.email, values.password));
              var auth = firebase.auth();
              auth
                .sendPasswordResetEmail(values.email)
                .then(function () {
                  // Email sent
                  Alert.alert(`Check Gmail : ${values.email}`);
                })
                .catch(function (error) {
                  // An error happened.
                  Alert.alert(`Email: Not Exists`);
                });
            }}>
            {(formik) => (
              <React.Fragment>
                <Animatable.View
                  ref={containerRef}
                  duration={1000}
                  animation="slideInDown"
                  style={{
                    height: 240,
                    backgroundColor: paperColor.primary,
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Animatable.View
                      style={{
                        height: 200,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      ref={logoRef}>
                      <FastImage
                        style={{width: 100, height: 80}}
                        source={{
                          uri: 'http://tranhuuthang.com/app/logo.png',
                        }}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: '700',
                          fontSize: 20,
                        }}>
                        SHOP MRKATSU
                      </Text>
                      <View height={4} />
                      <Text style={{color: 'white', fontWeight: '700'}}>
                        The Zoo Team
                      </Text>
                    </Animatable.View>
                  </View>
                </Animatable.View>
                <View
                  style={{alignItems: 'center', padding: 16, paddingTop: 36}}>
                  <Headline
                    style={{color: paperColor.primary, fontWeight: '400'}}>
                    Nhập Email
                  </Headline>
                </View>
                <View
                  style={{flex: 0, justifyContent: 'flex-start', padding: 16}}>
                  <TextBox
                    name="email"
                    autoCapitalize="none"
                    iconName="email"
                    disabled={loading}
                    placeholder="Nhập email của bạn"
                    containerStyle={{borderWidth: 0, backgroundColor: 'white'}}
                    inputContainerStyle={{borderBottomWidth: 1.5}}
                    leftIconContainerStyle={{marginLeft: 12}}
                    onBlur={() => formik.handleBlur('email')}
                    onChangeText={formik.handleChange('email')}
                    value={formik.values.email}
                  />
                  <View height={16} />

                  <View
                    style={{
                      alignItems: 'flex-end',
                      marginBottom: 12,
                      marginTop: 12,
                    }}></View>
                </View>
                <Animatable.View
                  animation="slideInUp"
                  duration={1000}
                  style={{flex: 1, padding: 16, justifyContent: 'flex-end'}}>
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
                    {loading ? 'Đang gửi Mã ...' : 'OK'}
                  </Button>

                  <Touch
                    onPress={() => {
                      navigation.navigate('RegisterScreen');
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

export default ForgotPassword;
