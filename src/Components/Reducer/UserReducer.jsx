import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE
} from '../Type';

const initialState = {
  loading: false,
  user: null,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null
      };
    case POST_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
