import React from 'react';
import {View, Text} from 'react-native';
const initialState = {count: 0};
function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return {count: state.count + 1};
    case 'sub':
      return {count: state.count - 1};
  }
}
export {initialState, reducer};
