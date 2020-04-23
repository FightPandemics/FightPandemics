import axios from "axios";
import { Toast } from "antd-mobile";

import { GET_ERRORS } from "./types";
import { AUTH_LOGIN, AUTH_SIGNUP, SET_USER, SET_ERROR, SET_SUCCESS  } from "../constants/action-types";
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
    .catch((err) => {
      console.log("err.response", err.response);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
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

export const forgotPassword = (payload) => {
  console.log("payload forgotPassword : ", payload);
  return (dispatch) => {
    return axios
      .post("/api/users/forgot_password", payload, {})
      .then((res) => {
        console.log("res", res);
        dispatch({
          type: SET_SUCCESS,
          payload:
            "We have sent you an email for resetting your password. Please check your email inbox/spam/junk folder :)",
        });
      })
      .catch((err) => {
        //console.log("error.response", error.response);
        //dispatch({ type: SET_ERROR, payload: error.response.data });
        const message = err.response?.data?.message || err.message;
        Toast.fail(`Signup failed, reason: ${message}`, 3);
      })
      .finally(() => {});
  };
};

export function setError(payload) {
  return {
    type: SET_ERROR,
    payload,
  };
}

export function setSuccess(payload) {
  return {
    type: SET_SUCCESS,
    payload,
  };
}
