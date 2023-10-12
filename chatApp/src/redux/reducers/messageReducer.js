import {
    FETCH_CHAT_ROOMS_FAILURE,
    FETCH_CHAT_ROOMS_SUCCESS,
    GET_CURRENT_USER,
    GET_MESSAGES_FAILURE,
    GET_MESSAGES_SUCCESS,
    SEND_MESSAGE_ERROR,
    SEND_MESSAGE_SUCCESS
} from "../constant";

const initialState = {
    messages: [],
    chatRooms: [],
    currentUser: {},
    error: null,
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGES_SUCCESS:
            //s   console.log(action.payload)
            return {
                ...state,
                messages: action.payload,
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
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                messages: [...state.messages, action.payload],
                error: null,
            };
        case SEND_MESSAGE_ERROR:
            return {
                ...state,
                error: null,
            };
        case GET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser,
            };
        default:
            return state;
    }
};

export default messagesReducer;
