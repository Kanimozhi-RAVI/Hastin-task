// import { call, put, takeLatest } from 'redux-saga/effects';
// import {
//   resendOtpSuccess,
//   resendOtpFailure,
// } from '../Action_file/Action';
// import { RESEND_OTP_REQUEST } from '../Type';


// function* resendOtpSaga() {
//   try {
//     const token = localStorage.getItem('authToken');

//     const response = yield call(fetch, 'https://hastin-container.com/staging/app/auth/access-code/resend', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `BslogiKey ${token}`,
//       },
//     });

//     const data = yield response.json();

//     console.log("🔁 Resend OTP API Response:", data);

//     if (response.ok && data?.accessCode && data?.opaque) {
//       yield put(resendOtpSuccess({
//   accessCode: data.accessCode,
//   opaque: data.opaque,
// }));

//     } else {
//       yield put(resendOtpFailure(data?.message || 'Resend OTP failed.'));
//     }
//   } catch (error) {
//     yield put(resendOtpFailure(error.message || 'Network error'));
//   }
// }



// export function* watchResendOtp() {
//   yield takeLatest(RESEND_OTP_REQUEST, resendOtpSaga);
// }