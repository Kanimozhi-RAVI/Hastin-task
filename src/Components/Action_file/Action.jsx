import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE, ACCESS_CODE_REQUEST, ACCESS_CODE_SUCCESS, ACCESS_CODE_FAILURE
} from '../Type';

export const postloginRequest = (payload) => ({
  type: POST_LOGIN_REQUEST,
  payload
});

export const postloginSuccess = (payload) => ({
  type: POST_LOGIN_SUCCESS,
  payload
});

export const postloginFailure = (data) => ({
  type: POST_LOGIN_FAILURE,
  payload:data,
});


export const accesscodeRequest = (error) => ({
  type: ACCESS_CODE_REQUEST,
  payload:error,
});

export const accesscodeSuccess = (data) => ({
  type: ACCESS_CODE_SUCCESS,
  payload: data,
});

export const accesscodeFailure = (error) => ({
  type: ACCESS_CODE_FAILURE,
  payload: error,
});
