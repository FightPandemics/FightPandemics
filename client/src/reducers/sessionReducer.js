import { AUTH_LOGOUT, AUTH_SUCCESS } from "constants/action-types";

const initialState = {
  accessToken: null,
  isAuthenticated: false,
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
