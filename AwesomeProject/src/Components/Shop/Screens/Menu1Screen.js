import React from 'react';
import {View, Text, Button} from 'react-native';

export default function Menu1Screen({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>MENU 1</Text>
      <Button
        title="open Menu"
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    </View>
  );
}
