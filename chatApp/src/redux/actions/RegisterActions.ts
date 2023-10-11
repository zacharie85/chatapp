// store/actions/authActions.ts
import { Dispatch } from 'redux';
import { USER_REGISTER_FAILURE, USER_REGISTER_SUCCESS,
  USER_LOGIN_SUCCESS,USER_LOGIN_FAILURE } from '../constant';
import { ENDPOINT } from '../../constant';

export const registerUser = (userData: { username: string; email: string; password: string; }) => {
    return async (dispatch:Dispatch) => {
      try {
        const response = await fetch(`${ENDPOINT}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }
  
        const responseData = await response.json();
        dispatch({ type: USER_REGISTER_SUCCESS, user: responseData.user });
      } catch (error) {
        dispatch({ type: USER_REGISTER_FAILURE, error: error.message });
      }
    };
  };

  export const loginUser = (credentials: { username: string; password: string; }) => {
    return async (dispatch:Dispatch) => {
      try {
        const response = await fetch(`${ENDPOINT}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }
  
        const responseData = await response.json();
        dispatch({ type: USER_LOGIN_SUCCESS, user: responseData.token });
      } catch (error) {
        dispatch({ type: USER_LOGIN_FAILURE, error: error.message });
      }
    };
  };