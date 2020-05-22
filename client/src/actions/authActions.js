import axios from "axios";
import { Toast } from "antd-mobile";

import { GET_ERRORS } from "./types";
import { AUTH_SUCCESS } from "constants/action-types";
import { getAuthToken } from "utils/auth-token";

// Note: for production apps, both localstorage & cookies contain risks to store user & auth data
export const initAuth = () => {
  return (dispatch) => {
    const { token, emailVerified } = getAuthToken();

    if (token) {
      dispatch({ type: AUTH_LOGIN, payload: { token, emailVerified } });
    }
  };
};
