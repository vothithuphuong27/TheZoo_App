/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */

import * as Animatable from 'react-native-animatable';
import * as Yup from 'yup';
import FirestoreService from '../../../services/FirestoreService';

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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

import auth, {firebase} from '@react-native-firebase/auth';
import TextBox from '../../../components/Texbox';
import colors from '../../../constants/color';
import {UpdateAddressAction} from '../../../modules/auth/actions';

// YUP
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required(),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  address: Yup.string().required(),
});

const EditAddress = ({route}) => {
  const Touch =
    Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;
  // REDUX
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  // THEMNE
  const paperColor = useTheme().colors;
  const signedInUser = useSelector((state) => state.auth.signedInUser);

  // NAVIGATION
  const navigation = useNavigation();
  const addressList = useSelector((state) => state.auth.addressOrder);

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
              name: route.params.address.name,
              phone: route.params.address.phone,
              address: route.params.address.address,
              id: route.params.id,
              //   uid: signedInUser ? signedInUser.uid : null,
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
              dispatch(
                UpdateAddressAction(
                  values.name,
                  values.phone,
                  values.address,
                  values.id,
                ),
              );
              navigation.navigate('AddressStackNavigator');
            }}>
            {(formik) => (
              <React.Fragment>
                <View
                  style={{flex: 0, justifyContent: 'flex-start', padding: 16}}>
                  <TextBox
                    name="name"
                    iconName="account"
                    disabled={loading}
                    placeholder="Họ Tên "
                    containerStyle={{borderWidth: 0, backgroundColor: 'white'}}
                    inputContainerStyle={{borderBottomWidth: 1.5}}
                    leftIconContainerStyle={{marginLeft: 12}}
                    onBlur={() => formik.handleBlur('name')}
                    onChangeText={formik.handleChange('name')}
                    value={formik.values.name}
                  />
                  <TextBox
                    name="phone"
                    autoCapitalize="none"
                    iconName="phone"
                    disabled={loading}
                    placeholder="Số điện thoại"
                    containerStyle={{borderWidth: 0, backgroundColor: 'white'}}
                    inputContainerStyle={{borderBottomWidth: 1.5}}
                    leftIconContainerStyle={{marginLeft: 12}}
                    onBlur={() => formik.handleBlur('phone')}
                    onChangeText={formik.handleChange('phone')}
                    value={formik.values.phone}
                  />
                  <TextBox
                    name="address"
                    autoCapitalize="none"
                    disabled={loading}
                    placeholder="Địa chỉ giao hàng"
                    containerStyle={{borderWidth: 0, backgroundColor: 'white'}}
                    inputContainerStyle={{borderBottomWidth: 1.5}}
                    leftIconContainerStyle={{marginLeft: 12}}
                    onBlur={() => formik.handleBlur('address')}
                    onChangeText={formik.handleChange('address')}
                    value={formik.values.address}
                  />
                  <View height={16} />
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
                    {loading ? 'Đang cập nhật địa chỉ ...' : 'Cập nhật địa chỉ'}
                  </Button>

                  <Touch
                    onPress={() => {
                      navigation.navigate('AddressStackNavigator');
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        padding: 12,
                      }}></View>
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

export default EditAddress;
