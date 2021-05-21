import React from 'react';
import {View, Text, Alert} from 'react-native';
import * as ActionTypes from '../actions/types';
import AuthService from '../../../services/AuthService';
import FirestoreService from '../../../services/FirestoreService';
import {put, takeLatest} from 'redux-saga/effects';
import {MAIN_CLEAR_CART} from '../../main/actions/types';
import {MAIN_TEMP_CART} from '../../main/actions/types';
import {MAIN_PRODUCT_FAVORITE_LIST} from '../../main/actions/types';

import {AUTH_GET_ADDRESS_SUCCESS} from '../../auth/actions/types';
import {AUTH_GET_NOTIFICATIONS} from '../../auth/actions/types';
import auth, {firebase} from '@react-native-firebase/auth';

import {AUTH_CLEAR_ADDRESS} from '../../auth/actions/types';
import {useNavigation} from '@react-navigation/native';

function* signIn(action) {
  try {
    const response = yield AuthService.signIn(action.email, action.password);
    const profile = yield AuthService.getProfile(response.user.uid); //wPwSP9TLQeIR7g4IYR8j
    const tempCarts = yield AuthService.getCarts_id(response.user.uid); // emty & data
    const address = yield AuthService.getAdress_id(response.user.uid); // emty & data
    const productFavorites = yield AuthService.getFavorite_id(
      response.user.uid,
    ); // emty & data
    const getNotification = yield AuthService.getPlayer_Id(response.user.uid);

    let user = response.user;
    user.profile = profile; // map profile vo
    if (address && tempCarts && productFavorites) {
      yield put({
        type: AUTH_GET_ADDRESS_SUCCESS,
        addressOrder: address,
      });
      yield put({
        type: MAIN_TEMP_CART,
        addedCartList: tempCarts,
      });
      yield put({
        type: MAIN_PRODUCT_FAVORITE_LIST,
        productFavorites: productFavorites,
      });
    }
    if (getNotification) {
      yield put({
        type: ActionTypes.AUTH_GET_NOTIFICATIONS_SUCCESS,
        NotificationData: getNotification,
      });
    }
    yield put({
      type: ActionTypes.AUTH_SIGNIN_SUCCESS,
      signedInUser: user,
    });

    // console.log(profile);
  } catch (error) {
    yield put({type: ActionTypes.AUTH_SIGNIN_FAILED, error: error.code});
  }
}

function* signOut() {
  try {
    yield put({
      type: AUTH_CLEAR_ADDRESS,
    });
    yield put({
      type: MAIN_CLEAR_CART,
    });

    yield put({
      type: ActionTypes.AUTH_SIGNOUT_SUCCESS,
    });
  } catch (error) {
    console.log(error);
  }
}
function* register(action) {
  // try {
  //   const response = yield AuthService.register(
  //     action.email,
  //     action.password,
  //     action.name,
  //     action.role,
  //   );
  //   if (response == 'User account created') {
  //     Alert.alert('SUCCESS');
  //     const navigation = useNavigation();
  //     navigation.navigate('SignInScreen');
  //   }
  // console.log(response);
  // const profile = yield AuthService.getProfile(response.user._user.uid); //wPwSP9TLQeIR7g4IYR8j
  // console.log(profile);
  // console.log(response);
  //   // Get profile theo uid
  //   const profile = yield AuthService.getProfile(response.user._user.uid);
  // let user = response.user;
  // user.profile = profile;
  // yield put({
  //   type: ActionTypes.AUTH_REGISTER_SUCCESS,
  // });
  // console.log(profile);
  // } catch (error) {
  //   console.log(error);
  //   yield put({type: ActionTypes.AUTH_REGISTER_FAILD, error: error});
  // }
}
function* addAddress(action) {
  try {
    // const response = yield FirestoreService.AddAddress(action);
    yield put({
      type: ActionTypes.AUTH_ADD_ADDRESS_SUCCESS,
      addressOrder: action,
    });
  } catch (error) {
    console.log(error);
    // yield put({type: ActionType.AUTH_ADD_ADDRESS_SUCCESS, error: error});
  }
}
function* updateProfile(action) {
  try {
    let uid = auth().currentUser.uid;
    const profile = yield AuthService.getProfile(uid);

    const user_messages = yield AuthService.getMessageChatUser(profile.name);
    const Admin_messages = yield AuthService.getMessageChatAdmin(profile.name);

    if (Admin_messages) {
      Admin_messages.forEach((m) => {
        const id_message = m.id; // Eirsqdpb5Qz34a7XlF3J
        const userName_message = action.name; //New name
        AuthService.UpdateUsernameChat_id(id_message, userName_message);
      });
    }

    if (user_messages) {
      user_messages.forEach((m) => {
        const id_message = m.id; // Eirsqdpb5Qz34a7XlF3J
        const userName_message = action.name; //New name
        AuthService.UpdateUsernameChat_id(id_message, userName_message);
      });
    }

    const response = yield AuthService.updateProfile(
      action.name,
      action.image,
      action.phone,
    );

    let user = response;
    user.profile = profile;
    yield AuthService.updateInforProfile(response, profile.role);
    const comentData = yield AuthService.getStarRate();
    if (comentData) {
      comentData.forEach((p) => {
        AuthService.getComment_id(p.id, response);
      });
    }
    yield put({
      type: ActionTypes.AUTH_UPDATE_SUCCESS_PROFILE,
      signedInUser: user,
      loading: true,
    });
  } catch (error) {
    console.log(error);
  }
}
function* sagas() {
  yield takeLatest(ActionTypes.AUTH_SIGNIN, signIn);
  yield takeLatest(ActionTypes.AUTH_REGISTER, register);
  yield takeLatest(ActionTypes.AUTH_SIGNOUT, signOut);
  yield takeLatest(ActionTypes.AUTH_ADD_ADDRESS, addAddress);
  yield takeLatest(ActionTypes.AUTH_UPDATE_PROFILE, updateProfile);
}

export default sagas;
