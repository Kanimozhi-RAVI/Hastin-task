import { call, put, takeLatest } from 'redux-saga/effects';
import api from './api'; // your axios instance file
import { ACCESSCODE_REQUEST, accessCodeSuccess, accessCodeFailure } from './actions';

function* handleAccessCodeValidation(action) {
  try {
    const response = yield call(api.post, '/auth/access-code/validate', action.payload);
    yield put(accessCodeSuccess(response.data));
  } catch (error) {
    const message = error.response?.data?.message || 'Validation Failed';
    yield put(accessCodeFailure(message));
  }
}

function* accessCodeSaga() {
  yield takeLatest(ACCESSCODE_REQUEST, handleAccessCodeValidation);
}

export default accessCodeSaga;
