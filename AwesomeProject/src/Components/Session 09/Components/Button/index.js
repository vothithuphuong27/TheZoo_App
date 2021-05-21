/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActivityIndicator, Colors} from 'react-native-paper';

import styles from './style';
export default function index({
  title,
  color,
  styleIcon,
  iconName,
  loading,
  disabled,
}) {
  const TouchComponent = disabled ? View : TouchableOpacity;
  return (
    <TouchComponent
      style={styles.container}
      disabled={false}
      onPress={() => {
        if (disabled) return;
      }}>
      {!loading && (
        <Icon
          name={iconName}
          size={24}
          style={[styles.IconDefault, styleIcon]}
        />
      )}
      {loading && (
        <ActivityIndicator
          animating={true}
          color={Colors.red800}
          style={{marginRight: 8}}
        />
      )}
      <Text style={[{color}, styles.colorTextDefault]}>{title}</Text>
    </TouchComponent>
  );
}
