import { combineReducers } from 'redux';
import userReducer from './Reducer/UserReducer';
import vendorReducer from './Reducer/VendorReducer';
import userlistReducer from './Reducer/HclReducer'


const rootReducer = combineReducers({
  user: userReducer,
  vendor:vendorReducer,
  bookinguser:userlistReducer,

});



export default rootReducer;
