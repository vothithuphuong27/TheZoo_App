import {all, fork} from 'redux-saga/effects';
import authSagas from '../modules/auth/sagas';
import mainSagas from '../modules/main/sagas';

export default function* rootSagas() {
  yield all([fork(authSagas, mainSagas)]);
}
