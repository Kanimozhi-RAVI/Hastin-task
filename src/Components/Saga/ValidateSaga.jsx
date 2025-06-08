// import { call, put, takeLatest } from 'redux-saga/effects';
// import axios from 'axios';
// import { ACCESS_CODE_REQUEST } from '../Type';
// import { accesscodeSuccess, accesscodeFailure } from '../Action_file/Action';

// function* validateAccessCodeSaga(action) {
//   try {
//     const token = localStorage.getItem('authToken');
//     const { opaque, accessCode } = action.payload;

//     // 🪵 Debug log
//     console.log("🔐 Validating OTP...", { opaque, accessCode, token });

//     const response = yield call(
//       axios.post,
//       'https://hastin-container.com/staging/app/auth/access-code/validate',
//       { opaque, accessCode },
//       {
//         headers: {
//           Authorization: `BslogiKey ${token}`, // ✅ MUST be 'BslogiKey' not Bearer
//         },
//       }
//     );

//     console.log("✅ OTP Validation Success", response.data);

//     yield put(accesscodeSuccess(response.data));
//   } catch (error) {
//     const message = error.response?.data?.message || 'Access code validation failed';
//     console.error("❌ OTP Validation Failed", error.response?.data);
//     yield put(accesscodeFailure(message));
//   }
// }

// export function* watchAccessCode() {
//   yield takeLatest(ACCESS_CODE_REQUEST, validateAccessCodeSaga);
// }
