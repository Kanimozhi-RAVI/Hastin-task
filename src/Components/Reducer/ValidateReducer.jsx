// import {
//   ACCESS_CODE_REQUEST,
//   ACCESS_CODE_SUCCESS,
//   ACCESS_CODE_FAILURE,
// } from '../Type';

// const initialState = {
//   loading: false,
//   accessCodeStatus: null,
//   error: null,
// }

// const accessCodeReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ACCESS_CODE_REQUEST:
//       return { ...state, loading: true, error: null };

//     case ACCESS_CODE_SUCCESS:
//   return {
//     ...state,
//     loading: false,
//     opaque: action.payload.opaque,
//     accessCode: action.payload.accessCode,
//     accessCodeStatus: {
//       ...action.payload,
//       success: true,
//     },
//     error: null,
//   };

//     case ACCESS_CODE_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload?.message || 'Something went wrong',
//       };

//     default:
//       return state;
//   }
// };


// export default accessCodeReducer;
