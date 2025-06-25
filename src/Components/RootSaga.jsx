import { all } from 'redux-saga/effects';
import userSaga from './Saga/UserSaga';
import vendorSaga  from './Saga/VendorSaga';
import hclSaga from './Saga/HclBookingSaga';


export default function* rootSaga() {
  yield all([userSaga(),
    vendorSaga(),
    hclSaga(),
    
  ]);
}
