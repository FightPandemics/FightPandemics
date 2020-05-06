import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_SIGNUP,
    SET_USER,
} from "../constants/action-types";

const initialState = {
    accessToken: null,
    isAuthenticated: false,
    emailVerified: false,
};

function sessionReducer(state = initialState, action) {
    switch (action.type) {
    case AUTH_LOGIN:
    case AUTH_SIGNUP:
        return {
            ...state,
            accessToken: action.payload.token,
            emailVerified: action.payload.emailVerified,
            isAuthenticated: true,
        };
    case AUTH_LOGOUT:
        return {
            ...state,
            accessToken: null,
            isAuthenticated: false,
        };
    case SET_USER:
        return {
            ...state,
            user: action.payload,
        };
    default:
        return state;
    }
}

export default sessionReducer;
