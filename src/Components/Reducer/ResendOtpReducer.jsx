import {
  ACCESS_CODE_REQUEST,
  ACCESS_CODE_SUCCESS,
  ACCESS_CODE_FAILURE,
} from '../Type';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const accessCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCESS_CODE_REQUEST:
      return { ...state, loading: true };
    case ACCESS_CODE_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case ACCESS_CODE_FAILURE:
      return { loading: false, data: null, error: action.payload };
    default:
      return state;
  }
};

export default accessCodeReducer;
