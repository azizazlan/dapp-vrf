import { all, fork } from 'redux-saga/effects';

import vrfSagas from './vrf/sagas';

export default function* rootSaga() {
  yield all([fork(vrfSagas)]);
}
