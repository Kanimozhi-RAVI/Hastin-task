import { combineReducers } from 'redux';
import userReducer from './Reducer/UserReducer';
import vendorReducer from './Reducer/VendorReducer';
import hclReducer from './Reducer/HclReducer';


const rootReducer = combineReducers({
  user: userReducer,
  vendor:vendorReducer,
  booking:hclReducer,

});



export default rootReducer;
