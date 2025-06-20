import { combineReducers } from 'redux';
import userReducer from './Reducer/UserReducer';
import vendorReducer from './Reducer/VendorReducer';
import loaderReducer from './Reducer/LoaderReducer';


const rootReducer = combineReducers({
  user: userReducer,
  vendor:vendorReducer,
   loader: loaderReducer,

});



export default rootReducer;
