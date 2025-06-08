// // resendCodeReducer.js
// import {
//   RESEND_OTP_SUCCESS,
//   RESEND_OTP_REQUEST,
//   RESEND_OTP_FAILURE,
//   CLEAR_OTP,
//   CLEAR_ACCESSCODE_ERROR,
// } from '../Type';


//  const initialState = {
//   accessCode: '',
//   opaque: '',
//   loading: false,
//   error: null,
// };

// const resendCodeReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case RESEND_OTP_REQUEST:
//       return { ...state, isResending: true, error: null };


// case RESEND_OTP_SUCCESS:
//   return {
//     ...state,
//     accessCode: action.payload.accessCode,
//     opaque: action.payload.opaque,
//     loading: false,
//   };

//     case RESEND_OTP_FAILURE:
//       return { ...state, isResending: false, error: action.payload };

//     default:
//       return state;
//   }
// };

// export default resendCodeReducer;
