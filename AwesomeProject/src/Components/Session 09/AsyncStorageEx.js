import React from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@LoginInUser', JSON.stringify(value));
  } catch (e) {
    // saving error
    alert('failded');
  }
};
const getData = async () => {
  try {
    let data = await AsyncStorage.getItem('@LoginInUser');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (e) {
    // saving error
    alert('get failded');
  }
};

export default function AsyncStorageEx() {
  const [state, setState] = React.useState(null);

  return (
    <View>
      <Button
        title="Store Data"
        onPress={() => {
          storeData({email: 'tranhuuthangcoi@gmail.com', password: '123456'});
        }}
      />
      <Button
        title="Get Data"
        onPress={() => {
          getData().then((u) => {
            // console.log(u);
            setState(u);
          });
        }}
      />
      {state && (
        <React.Fragment>
          <Text>{state.email}</Text>
          <Text>{state.password}</Text>
        </React.Fragment>
      )}
    </View>
  );
}
