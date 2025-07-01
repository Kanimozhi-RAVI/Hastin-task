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
} from '../Types_File/VendorType';

const initialState = {
  loading: false,
  error: null,
  loginData: null,
  accessCodeStatus: null,

  loadingUserDetails: false,
  errorUserDetails: null,
  userDetails: null,
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

    case GET_USER_DETAILS_REQUEST:
      return {
        ...state,
        loadingUserDetails: true,
        errorUserDetails: null,
      };

    // Success handlers
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginData: action.payload,
        error: null,
      };

    case ACCESS_CODE_SUCCESS:
    case RESEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        accessCodeStatus: action.payload,
        error: null,
      };

    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loadingUserDetails: false,
        userDetails: action.payload,
        errorUserDetails: null,
      };

    // Failure handlers
    case POST_LOGIN_FAILURE:
    case ACCESS_CODE_FAILURE:
    case RESEND_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        loadingUserDetails: false,
        errorUserDetails: action.payload,
      };

    case CLEAR_ACCESSCODE_STATUS:
      return {
        ...state,
        accessCodeStatus: null,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default userReducer;
