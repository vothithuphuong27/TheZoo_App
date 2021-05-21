/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import shoppingReducer from './ShoppingCartApp/reducers';
import AuthReducer from './AuthApp/reducers';
import sagaReducer from './SagaApp/reducers';

// Saga (import)
import createSagaMiddleware from 'redux-saga';

// REDUX-THUNK: ASYNC ACTIONS
import thunkMiddleware from 'redux-thunk';

// Saga (root)
import rootSagas from './rootSaga';
import AuthApp from './AuthApp';

// COMPONENT
import CounterApp from './CounterApp';
import ShoppingApp from './ShoppingCartApp';
import SagaApp from './SagaApp';
// ROOT REDUCER
const rootReducer = combineReducers({
  // shoppingReducer,
  // AuthReducer,
  sagaReducer,
});

//Saga (middleware)
const sagaMiddleware = createSagaMiddleware();
// MIDDLEWARE
const middewares = [thunkMiddleware, sagaMiddleware];

// STORE
const store = createStore(
  rootReducer,

  // ONLY FOR DEBUG
  composeWithDevTools(applyMiddleware(...middewares)),
);
// Saga (run)
sagaMiddleware.run(rootSagas);
export default function Session13() {
  return (
    <Provider store={store}>
     {/* { console.log(store.state)} */}
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, padding: 24}}>
          {/* <CounterApp /> */}
          {/* <ShoppingApp /> */}
          {/* <AuthApp /> */}
          <SagaApp />
        </View>
      </SafeAreaView>
    </Provider>
  );
}
