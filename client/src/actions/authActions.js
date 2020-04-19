import axios from "axios";
import { GET_ERRORS } from "./types";
import { AUTH_INIT, AUTH_LOGIN, SET_USER } from "../constants/action-types";
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
    const res = await axios.post("/api/auth/authenticate", payload);
    dispatch({ type: AUTH_LOGIN, payload: res.data });
  };
};

export const signup = (payload) => {
  return async (dispatch) => {
    const res = axios.post("/api/auth/authenticate", payload);
    dispatch({ type: AUTH_LOGIN, payload: res.data });
  };
};
