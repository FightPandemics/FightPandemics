import { AUTH_SUCCESS, AUTH_LOGOUT } from "constants/action-types";
import { getAuthToken, removeAuthToken } from "utils/auth-token";

// Note: for production apps, both localstorage & cookies contain risks to store user & auth data
export const initAuth = () => {
  return (dispatch) => {
    const token = getAuthToken();

    if (token) {
      dispatch({ type: AUTH_SUCCESS, payload: { token } });
    }
  };
};

export const authLogout = () => {
  removeAuthToken();
  return { type: AUTH_LOGOUT };
};
