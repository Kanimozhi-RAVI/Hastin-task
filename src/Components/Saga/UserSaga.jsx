import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  POST_LOGIN_REQUEST,
  ACCESS_CODE_REQUEST,
  RESEND_OTP_REQUEST,
} from '../Type';
import {
  postloginSuccess,
  postloginFailure,
  accesscodeSuccess,
  accesscodeFailure,
  resendOtpSuccess,
  resendOtpFailure,
} from '../Action_file/Action';

const api = axios.create({
  baseURL: 'https://hastin-container.com/staging/app/auth',
});

function* handleLogin(action) {
  try {
    const { userName, password, recaptcha, origin } = action.payload;
    
    const response = yield call(api.post, '/login', {
      userName,
      password,
      recaptcha,
      origin,
    });

    const data = response.data;

    localStorage.setItem('authToken', data.data.jwt);
    localStorage.setItem('opaque', data.data.opaque);
    localStorage.setItem('accessCode', data.data.accessCode);

    yield put(postloginSuccess(data.data));
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed';
    yield put(postloginFailure(message));
  }
}

function* handleAccessCode(action) {
  try {
    const token = localStorage.getItem('authToken');
    const { opaque, accessCode } = action.payload;

    const config = {
      headers: {
        Authorization: `BslogiKey ${token}`,  // Important: custom header
      },
    };

    const response = yield call(api.post, '/access-code/validate', { opaque, accessCode }, config);
    yield put(accesscodeSuccess(response.data));
  } catch (error) {
    const message = error.response?.data?.message || 'Access code validation failed';
    yield put(accesscodeFailure(message));
  }
}

function* handleResendOtp() {
  try {
    const token = localStorage.getItem('authToken');
    const opaque = localStorage.getItem('opaque');

    const config = {
      headers: {
        Authorization: `BslogiKey ${token}`,
      },
    };

    const response = yield call(api.post, '/access-code/resend', { opaque }, config);

    // ✅ Set new values in localStorage from API response
    const newOpaque = response.data?.data?.opaque;
    const newAccessCode = response.data?.data?.accessCode;

    if (newOpaque && newAccessCode) {
      localStorage.setItem('opaque', newOpaque);
      localStorage.setItem('accessCode', newAccessCode);
    }

    yield put(resendOtpSuccess(response.data));
  } catch (error) {
    const message = error.response?.data?.message || 'Resend OTP failed';
    yield put(resendOtpFailure(message));
  }
}


function* userSaga() {
  yield takeLatest(POST_LOGIN_REQUEST, handleLogin);
  yield takeLatest(ACCESS_CODE_REQUEST, handleAccessCode);
  yield takeLatest(RESEND_OTP_REQUEST, handleResendOtp);
}

export default userSaga;
