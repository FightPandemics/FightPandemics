import axios from "axios";
import { checkRememberCookie, clearRememberCookie } from "utils/cookie";
import {
  AUTH_ERROR,
  AUTH_LOGOUT,
  SET_AUTH_LOADING,
  SET_USER,
} from "constants/action-types";

import TagManager from "react-gtm-module";

const GET_CURRENT_USER_ENDPOINT = "/api/users/current";
const CHECK_REMEMBER_COOKIE_INTERVAL = 3000;

// Token stored in httpOnly cookie set/cleared by server
export const initAuth = () => {
  return async (dispatch) => {
    if (!checkRememberCookie()) return;

    dispatch({ type: SET_AUTH_LOADING, payload: true });
    try {
      const { data: user } = await axios.get(GET_CURRENT_USER_ENDPOINT);
      TagManager.dataLayer({
        dataLayer: {
          userId: user.id,
        },
      });
      dispatch({ type: SET_USER, payload: { user } });
    } catch (error) {
      dispatch({ error, type: AUTH_ERROR });
    } finally {
      dispatch({ type: SET_AUTH_LOADING, payload: false });
    }
  };
};

export const refetchUser = () => {
  return async (dispatch) => {
    try {
      const { data: user } = await axios.get(GET_CURRENT_USER_ENDPOINT);
      dispatch({ type: SET_USER, payload: { user } });
    } catch (error) {
      dispatch({ error, type: AUTH_ERROR });
    }
  };
};

export const authLogout = () => {
  return (dispatch) => {
    clearRememberCookie();
    TagManager.dataLayer({
      dataLayer: {
        userId: -1,
      },
    });
    dispatch({ type: AUTH_LOGOUT });
  };
};

export const startCheckCookieInterval = () => {
  const checkRememberCookieInterval = setInterval(() => {
    if (!checkRememberCookie()) {
      clearInterval(checkRememberCookieInterval);
      authLogout();
      sessionStorage.setItem("postredirect", window.location.pathname);
      return window.location.reload();
    }
  }, CHECK_REMEMBER_COOKIE_INTERVAL);
};
