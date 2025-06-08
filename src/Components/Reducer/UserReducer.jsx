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

} from '../Type';

const initialState = {
  loading: false,
  error: null,
  loginData: null,
  accessCodeStatus: null,  // response from access code validation & resend
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN_REQUEST:
    case ACCESS_CODE_REQUEST:
    case RESEND_OTP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginData: action.payload,  // Save login response (opaque, accessCode, jwt)
        error: null,
      };
    case ACCESS_CODE_SUCCESS:
    case RESEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        accessCodeStatus: action.payload, // Save validate or resend response data
        error: null,
      };
    case POST_LOGIN_FAILURE:
    case ACCESS_CODE_FAILURE:
    case RESEND_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ACCESSCODE_STATUS:
      return { ...initialState };
    default:
      return state;
  }
};


export default userReducer;
