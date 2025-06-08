import { combineReducers } from 'redux';
import userReducer from './Reducer/UserReducer';
// import accessCodeReducer from './Reducer/AccessCodeReducer';
// import resendCodeReducer from './Reducer/ResendCodeReducer';

const rootReducer = combineReducers({
  user: userReducer,
  // accessCode: accessCodeReducer,
  // resend: resendCodeReducer,
});



export default rootReducer;
