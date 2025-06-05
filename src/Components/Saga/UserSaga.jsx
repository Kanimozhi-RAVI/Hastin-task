import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {postloginRequest, postloginSuccess,postloginFailure} from '../Action_file/Action';
import '../Login_page/Login.css'

import { POST_LOGIN_REQUEST } from '../Type';

const api = axios.create({
  baseURL: 'https://hastin-container.com/staging/app/auth', 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

function* handleLogin(action) {
  try {
    const { userName, password, recaptcha, origin } = action.payload;

    const response = yield api.post('/login', {
      userName,
      password,
      recaptcha,
      origin
    });

    const data = response.data;

    localStorage.setItem('authToken', data.data.token);

    yield put(postloginSuccess(data.data));
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed';
    yield put(postloginFailure(message));
  }
}

function* userSaga() {
  yield takeLatest(POST_LOGIN_REQUEST, handleLogin);
}

export default userSaga;
