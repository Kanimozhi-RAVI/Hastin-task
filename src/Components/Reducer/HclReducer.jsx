import { GET_BOOKING_LIST_FAILURE, GET_BOOKING_LIST_REQUEST, GET_BOOKING_LIST_SUCCESS } from "../Type"


const initialState = {
  bookinguser: [],
  loading: false,
  error: null
};

const userlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKING_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_BOOKING_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        bookinguser: action.payload
      };
    case GET_BOOKING_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state; 
  }
};

export default userlistReducer;
