import {fromPairs} from 'lodash';
import React from 'react';
import {View, Text} from 'react-native';
import Addcount from './Addcount';
import {initialState, reducer} from './Reducer';
import Appcontent from './Appcontent';
import Lablecout from './Lablecout';
import Subcout from './Subcout';
export default function index() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Appcontent.Provider value={{state, dispatch}}>
      <Addcount Text="+" />
      <Lablecout />
      <Subcout Text="-" />
    </Appcontent.Provider>
  );
}
