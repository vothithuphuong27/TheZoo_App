import React from 'react';
import {View, Text} from 'react-native';
const themes = {
  light: {
    foreground: 'red',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};
const ThemeContent = React.createContext(null);

export default function () {
  return (
    <ThemeContent.Provider value={themes.light}>
      <Toolbar />
      <Menu />
    </ThemeContent.Provider>
  );
}

const Menu = () => {
  const theme = React.useContext(ThemeContent);
  return (
    <View>
      <Text style={{color: theme.foreground}}>abc</Text>
    </View>
  );
};
const Toolbar = () => {
  const theme = React.useContext(ThemeContent);

  return (
    <View style={{backgroundColor: theme.background}}>
      <Text style={{color: theme.foreground}}>Ok</Text>
    </View>
  );
};
