import { AUTH_LOGOUT, AUTH_SUCCESS, SET_USER } from "constants/action-types";

const initialState = {
  accessToken: null,
  isAuthenticated: false,
  email: null,
  emailVerified: false,
  user: null,
};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.token,
        emailVerified: action.payload.emailVerified,
        email: action.payload.email,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        initialState,
      };
    default:
      return state;
  }
}

export default sessionReducer;
