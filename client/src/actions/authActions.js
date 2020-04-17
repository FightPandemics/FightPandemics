import axios from "axios";
import { GET_ERRORS } from "./types";
import { SET_USER } from "../constants/action-types";

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
  return (dispatch) => {
    console.log("payload", payload);
    return axios
      .post("/api/auth/authenticate", payload, {})
      .then((res) => {
        console.log("loginWithEmail response", res);
        dispatch({ type: SET_USER, payload: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const signup = (payload) => {
  return (dispatch) => {
    return axios
      .post("/api/auth/authenticate", payload, {})
      .then((res) => {
        console.log("signup response", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
