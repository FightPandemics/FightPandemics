import {
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  SET_AUTH_LOADING,
  SET_USER,
} from "constants/action-types";

const initialState = {
  isAuthenticated: false,
  authError: null,
  authLoading: false,
  email: null,
  emailVerified: false,
  error: null,
  user: null,
};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_ERROR:
      return {
        ...initialState,
        authError: action.error,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        emailVerified: action.payload.emailVerified,
        email: action.payload.email,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case SET_USER:
      const { payload: { user } } = action;
      return {
        ...state,
        emailVerified: !!user, // user can't exist in db if email not verified
        isAuthenticated: !!user,
        authLoading: false,
        user,
      };
    case SET_AUTH_LOADING:
      return {
        ...state,
        authLoading: action.payload,
      }
    case AUTH_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export default sessionReducer;
