import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import DrawerNavigator from './DrawerNavigator';
import ProductStackNavigator from './Screens/ProductStackNavigator';
import ProductDetailScreen from './Screens/ProductDetailScreen';
const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator >
      <Tab.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({focused, color}) => {
            return <Icon name="apps" color={color} size={24} />;
          },
        }}
        component={HomeScreen}
      />

      <Tab.Screen
        name="Products"
        component={ProductStackNavigator}
        options={{
          title: 'Products',
          tabBarIcon: ({focused, color}) => {
            return <Icon name="apps" color={color} size={24} />;
          },
        }}
      />
      <Tab.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          tabBarBadge: 10,
          title: 'Drawer ',
          tabBarIcon: ({focused, color}) => {
            return <Icon name="bell" color={color} size={24} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;
