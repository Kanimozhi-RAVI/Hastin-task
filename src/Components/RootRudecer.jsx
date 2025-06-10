import { combineReducers } from 'redux';
import userReducer from './Reducer/UserReducer';
import vendorReducer from './Reducer/VendorReducer';


const rootReducer = combineReducers({
  user: userReducer,
  vendor:vendorReducer

});



export default rootReducer;
