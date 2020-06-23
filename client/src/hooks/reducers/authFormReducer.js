import {
  AUTH_FORM_LOGIN,
  AUTH_FORM_LOGIN_ERROR,
  AUTH_FORM_SIGNUP,
  AUTH_FORM_SIGNUP_ERROR,
  AUTH_FORM_SOCIAL,
  AUTH_FORM_SOCIAL_ERROR,
  AUTH_FORM_FORGOT_PASSWORD,
  AUTH_FORM_FORGOT_PASSWORD_ERROR,
} from "../actions/authFormActions";

export const initialState = {
  error: null,
  loading: false,
};

export const authFormReducer = (state, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case AUTH_FORM_LOGIN:
    case AUTH_FORM_SIGNUP:
      return { ...state, email: payload.email };
    case AUTH_FORM_FORGOT_PASSWORD:
    case AUTH_FORM_SOCIAL:
      return { ...state, loading: true, error: null };
    case AUTH_FORM_LOGIN_ERROR:
    case AUTH_FORM_SIGNUP_ERROR:
    case AUTH_FORM_FORGOT_PASSWORD_ERROR:
    case AUTH_FORM_SOCIAL_ERROR:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
