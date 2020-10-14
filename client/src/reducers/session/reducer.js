import { SESSION_ACTIONS } from "./actions";

const initialState = {
  isAuthenticated: false,
  authError: null,
  authLoading: false,
  email: null,
  emailVerified: false,
  firstName: null,
  lastName: null,
  error: null,
  forgotPasswordRequested: false,
  user: null,
  organisationIndex: null,
};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_ACTIONS.AUTH_ERROR:
      return {
        ...initialState,
        authError: action.error,
      };
    case SESSION_ACTIONS.AUTH_SUCCESS:
      return {
        ...state,
        emailVerified: action.payload.emailVerified,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case SESSION_ACTIONS.FORGOT_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        forgotPasswordRequested: true,
        isAuthenticated: true, // required for redirect logic to verify-email
      };
    case SESSION_ACTIONS.SET_USER:
      const {
        payload: { user },
      } = action;
      return {
        ...state,
        emailVerified: !!user, // user can't exist in db if email not verified
        isAuthenticated: !!user,
        authLoading: false,
        user,
      };
    case SESSION_ACTIONS.SET_AUTH_LOADING:
      return {
        ...state,
        authLoading: action.payload,
      };
    case SESSION_ACTIONS.AUTH_LOGOUT:
      return {
        ...initialState,
      };
    case SESSION_ACTIONS.SET_ORGANISATION_INDEX:
      return {
        ...state,
        organisationIndex: action.payload,
      };
    default:
      return state;
  }
}

export default sessionReducer;
