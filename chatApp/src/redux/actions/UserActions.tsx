import axios from "axios";
import { Dispatch } from "redux";
import { ENDPOINT } from "../../constant";
import { FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS } from "../constant";

export const fetchUsers = (token: any) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`${ENDPOINT}/chat/users`, {
                headers: {
                    'Authorization': token, // Include the JWT token in the request header
                },
            });
            dispatch({
                type: FETCH_USERS_SUCCESS,
                users: response.data,
            });
        } catch (error) {
            dispatch({
                type: FETCH_USERS_FAILURE,
                error: error.message,
            });
        }
    }

};