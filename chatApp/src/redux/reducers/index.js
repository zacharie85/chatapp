import { combineReducers } from 'redux';
import authReducer from './authReducer';
import messagesReducer from './messageReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  message: messagesReducer,
  users: userReducer
});

export default rootReducer;
