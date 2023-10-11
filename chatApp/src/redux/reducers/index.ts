// store/reducers/index.ts
import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Import your individual reducers here
import messagesReducer from './messageReducer';

const rootReducer = combineReducers({
  auth: authReducer, // Example reducer, replace with your reducers
  message: messagesReducer
  // Add other reducers here
});

export default rootReducer;
