import {all, fork} from 'redux-saga/effects';
import appSagas from './SagaApp/sagas';
export default function* rootSagas() {
  yield all([fork(appSagas)]);
  // yield all([fork(authSagas)]);
}
