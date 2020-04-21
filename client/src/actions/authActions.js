import axios from "axios";
import { GET_ERRORS } from "./types";
import { SET_USER, SET_ERROR, SET_SUCCESS } from "../constants/action-types";

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
  console.log("payload loginWithEmail : ", payload);
  return (dispatch) => {
    console.log("payload", payload);
    return axios
      .post("/api/users/signup", payload, {})
      .then((response) => {
        console.log("response", response);
        dispatch({ type: SET_USER, payload: response.data });
      })
      .catch((error) => {
        console.log("error.response", error.response);
        dispatch({ type: SET_ERROR, payload: error.response.data });
      })
      .finally(() => {});
  };
};

export const signup = (payload) => {
  console.log("payload signup : ", payload);
  return (dispatch) => {
    return axios
      .post("/api/users/login", payload, {})
      .then((res) => {
        console.log("res", res);
        dispatch({
          type: SET_SUCCESS,
          payload:
            "We have sent you an email to activate your account. Please check your email inbox/spam/junk folder :)",
        });
      })
      .catch((error) => {
        console.log("error.response", error.response);
        dispatch({ type: SET_ERROR, payload: error.response.data });
      })
      .finally(() => {});
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
      .catch((error) => {
        console.log("error.response", error.response);
        dispatch({ type: SET_ERROR, payload: error.response.data });
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
