
import {
  ACCESS_CODE_REQUEST,
  ACCESS_CODE_SUCCESS,
  ACCESS_CODE_FAILURE,
  // other action types
} from '../Type';

const initialState = {
  loading: false,
  error: null,
  user: null,
  accessCodeStatus: null,  // store validation response here
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case ACCESS_CODE_REQUEST:
      return { ...state, loading: true, error: null };
    case ACCESS_CODE_SUCCESS:
      return { ...state, loading: false, accessCodeStatus: action.payload, error: null };
    case ACCESS_CODE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // handle other cases (login etc)
    default:
      return state;
  }
}
