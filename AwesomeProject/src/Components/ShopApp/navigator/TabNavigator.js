import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Category from '../components/Category';
import ProductStackNavigator from './ProductStackNavigator';
const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
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
      {/* <Tab.Screen
        name="Category"
        options={{
          title: 'Home',
          tabBarIcon: ({focused, color}) => {
            return <Icon name="apps" color={color} size={24} />;
          },
        }}
        component={Category}
      /> */}
    </Tab.Navigator>
  );
};
export default TabNavigator;
