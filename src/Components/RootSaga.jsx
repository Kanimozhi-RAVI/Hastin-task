import { all } from 'redux-saga/effects';
import userSaga from './Saga/UserSaga';

export default function* rootSaga() {
  yield all([userSaga()]);
}
