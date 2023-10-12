// redux/actions/messages.js
import axios from 'axios';
import {
    FETCH_CHAT_ROOMS_FAILURE, FETCH_CHAT_ROOMS_SUCCESS,
    GET_CURRENT_USER,
    GET_MESSAGES_FAILURE, GET_MESSAGES_SUCCESS,
    SEND_MESSAGE_ERROR, SEND_MESSAGE_SUCCESS
} from '../constant';
import { Dispatch } from 'redux';
import { ENDPOINT } from '../../constant';
import socket from '../../utils/Socket';

export const getMessages = (chatId: any, token: any) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`${ENDPOINT}/chat/get-messages/${chatId}`, {
                headers: {
                    'Authorization': token,
                },
            });
            const payload = response.data;
            dispatch({ type: GET_MESSAGES_SUCCESS, payload });
        } catch (error) {
            dispatch({ type: GET_MESSAGES_FAILURE, error: error.message });
        }
    };
};

export const sendMessage = (messageData: any, token: any) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await fetch(`${ENDPOINT}/chat/send-message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify(messageData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            socket.emit('send-message', messageData);

        } catch (error) {
            dispatch({ type: SEND_MESSAGE_ERROR, error: error.message });
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

export const getCurrentUser = (token: any) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`${ENDPOINT}/chat/current-user`, {
                headers: {
                    'Authorization': token, // Include the JWT token in the request header
                },
            });
            dispatch({
                type: GET_CURRENT_USER,
                currentUser: response.data,
            });
        } catch (error) {
            throw error;
        }
    }

};
