import { combineReducers } from 'redux';
import userReducer from './Reducer/UserReducer';
import accessCodeReducer from './Reducer/ValidateReducer';

const rootReducer = combineReducers({
  user: userReducer,
  accessCode:accessCodeReducer,
});

export default rootReducer;
