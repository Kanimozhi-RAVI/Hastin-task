import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  ACCESS_CODE_REQUEST,
  ACCESS_CODE_SUCCESS,
  ACCESS_CODE_FAILURE,
  RESEND_OTP_REQUEST,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAILURE,
  CLEAR_ACCESSCODE_STATUS,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILURE,
} from '../Type';


export const clearAccessCodeData = () => {
  localStorage.setItem('opaque', '');
  localStorage.setItem('accessCode', '');

  return {
    type: CLEAR_ACCESSCODE_STATUS,
  };
};

export const postloginRequest = (payload) => ({
  type: POST_LOGIN_REQUEST,
  payload,
});

export const postloginSuccess = (data) => ({
  type: POST_LOGIN_SUCCESS,
  payload: data,
});

export const postloginFailure = (error) => ({
  type: POST_LOGIN_FAILURE,
  payload: error,
});

export const accesscodeRequest = (payload) => ({
  type: ACCESS_CODE_REQUEST,
  payload,
});

export const accesscodeSuccess = (data) => ({
  type: ACCESS_CODE_SUCCESS,
  payload: data,
});

export const accesscodeFailure = (error) => ({
  type: ACCESS_CODE_FAILURE,
  payload: error,
});

export const resendOtpRequest = () => ({
  type: RESEND_OTP_REQUEST,
});

export const resendOtpSuccess = (data) => ({
  type: RESEND_OTP_SUCCESS,
  payload: data,
});

export const resendOtpFailure = (error) => ({
  type: RESEND_OTP_FAILURE,
  payload: error,
});


export const getUserDetailsRequest = () => ({
  type: GET_USER_DETAILS_REQUEST,
});

export const getUserDetailsSuccess = (data) => ({
  type: GET_USER_DETAILS_SUCCESS,
  payload: data,
});

export const getUserDetailsFailure = (error) => ({
  type: GET_USER_DETAILS_FAILURE,
  payload: error,
});
