//client/src/redux/reducers/index.js

import { combineReducers } from 'redux';
import instructorReducer from './instructorReducer';
import paymentReducer from './paymentReducer';

const rootReducer = combineReducers({
  instructors: instructorReducer,
  payments: paymentReducer,
});

export default rootReducer;