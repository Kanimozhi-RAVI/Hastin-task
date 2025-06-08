import { all } from 'redux-saga/effects';
import userSaga from './Saga/UserSaga';
// import {watchAccessCode} from './Saga/ValidateSaga';
// import {watchResendOtp}   from './Saga/ResendOtpSaga'

export default function* rootSaga() {
  yield all([userSaga(),
    // watchAccessCode(),
    // watchResendOtp(),

  ]);
}
