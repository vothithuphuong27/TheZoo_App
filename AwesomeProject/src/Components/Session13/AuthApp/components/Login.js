import React from 'react';
import {View, Text, Button, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {loginAsync} from '../actions';

export default function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer.user);
  const loading = useSelector((state) => state.AuthReducer.loading);
  console.log(loading);
  return (
    <View style={{flex: 1}}>
      {loading && <ActivityIndicator />}
      {user && (
        <View>
          <Text>{user[0].fullname}</Text>
          <Text>{user[0].email}</Text>
        </View>
      )}
      <Button
        title="Login"
        onPress={() => {
          dispatch(loginAsync('tungnt@softech.vn', '123456789'));
        }}
      />
    </View>
  );
}
