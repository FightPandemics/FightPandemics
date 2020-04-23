import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SIGNUP,
  SET_USER,
  SET_ERROR, 
  SET_SUCCESS,
} from "../constants/action-types";


const initialState = {
  accessToken: null,
  isAuthenticated: false,
  emailVerified: false,
  user: null,
  error: null,
  success: null,
};

function rootReducer(state = initialState, action) {
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
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
