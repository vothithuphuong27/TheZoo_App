import React from 'react';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme} from 'react-native-paper';
import ShoppingCartScreen from './ShoppingCartScreen';
import ProfileStackNavigator from './ProfileStackNavigator';
import NotificationStackNavigator from '../NotificationStackNavigator';
import ProductStackNavigator from './ProductStackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createMaterialBottomTabNavigator();
import {View, Text, TouchableOpacity} from 'react-native';
const Stack = createStackNavigator();
import {createStackNavigator} from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';

import ChatNavigator from '../ChatNavigator/';
const TabNavigator = () => {
  const [cartList, setcartList] = React.useState(null);
  const signedInUser = useSelector((state) => state.auth.signedInUser);
  const numberBadges = useSelector((e) => e.auth.BadgeNumber);
  const updateNotification = () => {
    if (signedInUser?.uid && numberBadges > 0) {
      firestore()
        .collection('PlayerId')
        .doc(signedInUser?.uid)
        .update({
          NumberNotification: numberBadges,
        })
        .then(() => {
          console.log('save player_id updated!');
        });
    }
  };
  React.useEffect(updateNotification, [numberBadges]);
  // console.log(numberBadges);

  const {colors} = useTheme();
  const addedCartList = useSelector(
    (state) => state.main.shoppingCart.addedCartList,
  );

  var notificationNumberCart = 0;
  if (signedInUser) {
    for (var i = 0; i < addedCartList.length; i++) {
      if (addedCartList[i].userid == signedInUser.uid) {
        notificationNumberCart += [addedCartList[i]].length;
      }
    }
  }

  return (
    <Tab.Navigator shifting={false} barStyle={{backgroundColor: '#ffffff'}}>
      <Tab.Screen
        name="ProductStackNavigator"
        component={ProductStackNavigator}
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({focused, color}) => {
            return <Icon name="apps" size={24} style={{color: color}} />;
          },
        }}
      />
      <Tab.Screen
        name="ShoppingCartScreen"
        component={ShoppingCartScreen}
        options={{
          title: 'Giỏ hàng',
          tabBarBadge: notificationNumberCart ? notificationNumberCart : null,
          tabBarIcon: ({focused, color}) => {
            return <Icon name="cart" size={24} style={{color: color}} />;
          },
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationStackNavigator}
        options={{
          tabBarLabel: (
            <Text style={{fontFamily: 'Roboto-Medium', textAlign: 'center'}}>
              Thông báo
            </Text>
          ),
          tabBarBadge: numberBadges ? numberBadges : null,
          tabBarIcon: ({focused, color}) => {
            let iconName = 'bell';
            return (
              <Icon
                name={iconName}
                size={24}
                style={{color}}
                onPress={() => {
                  alert('ok');
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="ChatNavigator"
        component={ChatNavigator}
        options={{
          title: 'Nhắn tin',
          tabBarIcon: ({focused, color}) => {
            return <Icon name="chat" size={24} style={{color: color}} />;
          },
        }}
      />
      <Tab.Screen
        name="ProfileStackNavigator"
        component={ProfileStackNavigator}
        options={{
          title: 'Cá nhân',
          tabBarIcon: ({focused, color}) => {
            return <Icon name="account" size={24} style={{color: color}} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
