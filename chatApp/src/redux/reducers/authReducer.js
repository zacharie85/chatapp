import { USER_LOGIN_FAILURE, USER_LOGIN_SUCCESS, USER_REGISTER_FAILURE, USER_REGISTER_SUCCESS } from "../constant";

const initialState = {
    user: null,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                user: action.user,
                error: null,
            };
        case USER_REGISTER_FAILURE:
            return {
                ...state,
                user: null,
                error: action.error,
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                error: null,
            };
        case USER_LOGIN_FAILURE:
            return {
                ...state,
                user: null,
                error: action.error,
            };
        default:
            return state;
    }
};

export default authReducer;