import React from 'react';
import {Button, ActivityIndicator, Colors} from 'react-native-paper';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};
export default function ButtonPaper() {
  return (
    // <PaperProvider theme={theme}>
    //   <Button
    //     icon="camera"
    //     mode="contained"
    //     onPress={() => console.log('Pressed')}>
    //     Press mes
    //   </Button>
    // </PaperProvider>
    <ActivityIndicator animating={true} color={Colors.red800} />
  );
}
