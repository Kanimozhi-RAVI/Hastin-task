import { RESEND_OTP_REQUEST } from '../Type';
import { resendOtpSuccess, resendOtpFailure } from '../Action_file/Action';
import { call, put, takeLatest } from 'redux-saga/effects';

function* resendOtpWorker() {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Token missing. Login again.');

    const response = yield call(fetch, 'https://hastin-container.com/staging/app/auth/access-code/resend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `BslogiKey ${token}`,
      },
    });

    const data = yield response.json();
    console.log(data)

    if (response.ok && data?.accessCode) {
      yield put(resendOtpSuccess(data));
    } else {
      throw new Error(data?.message || 'Resend failed. Try again.');
    }
  } catch (error) {
    yield put(resendOtpFailure(error.message || 'Network error during resend.'));
  }
}


export function* watchResendOtp() {
  yield takeLatest(RESEND_OTP_REQUEST, resendOtpWorker);
}
