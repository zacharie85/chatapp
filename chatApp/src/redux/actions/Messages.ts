// redux/actions/messages.js
import axios from 'axios';
import { FETCH_CHAT_ROOMS_FAILURE, FETCH_CHAT_ROOMS_SUCCESS, GET_MESSAGES_FAILURE, GET_MESSAGES_SUCCESS } from '../constant';
import { Dispatch } from 'redux';
import { ENDPOINT } from '../../constant';

export const getMessages = (chatId: any) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`${ENDPOINT}/messages/${chatId}`);
            const messages = response.data;
            dispatch({ type: GET_MESSAGES_SUCCESS, messages });
        } catch (error) {
            dispatch({ type: GET_MESSAGES_FAILURE, error: error.message });
        }
    };
};

export const fetchChatRooms = (token: any) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`${ENDPOINT}/chat/get-all-rooms`, {
                headers: {
                    'Authorization': token, // Include the JWT token in the request header
                },
            });
            dispatch({
                type: FETCH_CHAT_ROOMS_SUCCESS,
                chatRooms: response.data,
            });
        } catch (error) {
            dispatch({
                type: FETCH_CHAT_ROOMS_FAILURE,
                error: error.message,
            });
        }
    }

};
