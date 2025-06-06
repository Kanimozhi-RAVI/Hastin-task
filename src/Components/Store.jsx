import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../Components/RootSaga'; // your rootSaga.js
import accessCodeReducer from './Reducer/ValidateReducer';
import resendOtpReducer from './Reducer/ResendOtpReducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    accessCodeReducer: accessCodeReducer,
    resendOtpReducer: resendOtpReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
