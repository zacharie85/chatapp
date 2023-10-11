import { FETCH_CHAT_ROOMS_FAILURE, FETCH_CHAT_ROOMS_SUCCESS, GET_MESSAGES_FAILURE, GET_MESSAGES_SUCCESS } from "../constant";

// redux/reducers/messages.js
const initialState = {
    messages: [],
    chatRooms: [],
    error: null,
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: action.messages,
                error: null,
            };
        case GET_MESSAGES_FAILURE:
            return {
                ...state,
                messages: [],
                error: action.error,
            };
        case FETCH_CHAT_ROOMS_SUCCESS:
            return {
                ...state,
                chatRooms: action.chatRooms,
                error: null,
            };
        case FETCH_CHAT_ROOMS_FAILURE:
            return {
                ...state,
                chatRooms: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default messagesReducer;
