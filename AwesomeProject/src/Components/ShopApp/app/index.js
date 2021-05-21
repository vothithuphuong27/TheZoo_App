import 'react-native-gesture-handler';

import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {createStore, combineReducers, applyMiddleware} from 'redux';
// Saga (import)
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import authReducer from '../modules/auth/reducers';
import mainReducer from '../modules/main/reducers';

// Saga (root)
import rootSagas from './rootSagas.js';

import AppNavigator from '../screens/AppNavigator';
import colors from '../constants/color';

// ROOT REDUCER
const rootReducer = combineReducers({
  auth: authReducer,
  main: mainReducer,
  // shoppingReducer,
});

// MIDDLEWARE
// Saga(middleware);
const sagaMiddleware = createSagaMiddleware();
const middewares = [
  // Custom Middleware
  // logger

  // SAGA
  sagaMiddleware,
];

// STORE
const store = createStore(
  rootReducer,
  // ONLY FOR DEBUG
  composeWithDevTools(applyMiddleware(...middewares)),
);
// Root Saga

// Saga (run)
sagaMiddleware.run(rootSagas);

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.PRIMARY,
    accent: '#f1c40f',
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
}
