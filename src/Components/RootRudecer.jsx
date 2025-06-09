import { combineReducers } from 'redux';
import userReducer from './Reducer/UserReducer';


const rootReducer = combineReducers({
  user: userReducer,

});



export default rootReducer;
