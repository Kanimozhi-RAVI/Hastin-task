import { call, put, takeLatest } from 'redux-saga/effects';
import { accesscodeSuccess, accesscodeFailure } from '../Action_file/Action';
import { ACCESS_CODE_REQUEST } from '../Type';

function* accessCodeVerifySaga(action) {
  try {
    const token = localStorage.getItem('authToken');
    const { opaque, accessCode } = action.payload;

    const response = yield call(fetch, 'https://hastin-container.com/staging/app/auth/access-code/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `BslogiKey ${token}`,
      },
      body: JSON.stringify({
        opaque,
        accessCode,
      }),
    });

    const data = yield response.json();
    console.log(data)

    if (response.ok && data?.data?.isValidAccessCode) {
      yield put(accesscodeSuccess(data));
    } else {
      yield put(accesscodeFailure(data?.data?.message || 'Invalid OTP'));
    }
  } catch (error) {
    yield put(accesscodeFailure(error.message || 'Network error'));
  }
}

export  function* watchAccessCode() {
  yield takeLatest(ACCESS_CODE_REQUEST, accessCodeVerifySaga);
}
