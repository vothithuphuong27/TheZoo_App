import React from 'react';
import {View, Text, Button} from 'react-native';
import Appcontent from './Appcontent';
export default function Subcount({Text}) {
  const {dispatch} = React.useContext(Appcontent);
  return (
    <View>
      <Button title={Text} onPress={() => dispatch({type: 'sub'})}></Button>
    </View>
  );
}
