import { AUTH_LOGOUT, AUTH_SUCCESS } from "constants/action-types";

const initialState = {
  accessToken: null,
  isAuthenticated: false,
  emailVerified: false,
};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.token,
        emailVerified: action.payload.emailVerified,
        isAuthenticated: true,
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
