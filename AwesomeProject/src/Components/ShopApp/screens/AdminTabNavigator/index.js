import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ProfileScreen from '../../screens/UserTabNavigator/ProfileStackNavigator';
import HomeScreen from './HomeScreen';
import chats from './chats';
const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => {
            return <Icon name="home" size={24} style={{color: color}} />;
          },
        }}
      />
      <Tab.Screen
        name="chats"
        component={chats}
        options={{
          title: 'chats',
          tabBarIcon: ({color}) => {
            return <Icon name="chat" size={24} style={{color: color}} />;
          },
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({color}) => {
            return <Icon name="account" size={24} style={{color: color}} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
