import React from 'react';
import {View, Text} from 'react-native';
import Appcontent from './Appcontent';

export default function Lablecout() {
  const {state} = React.useContext(Appcontent);
  return (
    <View>
      <Text>{state.count}</Text>
    </View>
  );
}
