import axios from "axios";
import { Toast } from "antd-mobile";

import { GET_ERRORS } from "./types";
import { AUTH_LOGIN, AUTH_SIGNUP, SET_USER } from "../constants/action-types";
import { getAuthToken } from "../utils/auth-token";

// Note: for production apps, both localstorage & cookies contain risks to store user & auth data
export const initAuth = () => {
  return (dispatch) => {
    const token = getAuthToken();
    if (token) {
      dispatch({ type: AUTH_LOGIN, payload: { token } });
    }
  };
};

export const submitEmail = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => history.push("/medicals"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

export const loginWithEmail = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/auth/login", payload);
      dispatch({ type: AUTH_LOGIN, payload: res.data });
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      Toast.fail(`Login failed, reason: ${message}`, 3);
    }
  };
};

export const signup = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/auth/signup", payload);
      dispatch({ type: AUTH_SIGNUP, payload: res.data });
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      Toast.fail(`Signup failed, reason: ${message}`, 3);
    }
  };
};
