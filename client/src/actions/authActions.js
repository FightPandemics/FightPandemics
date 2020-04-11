import axios from "axios";
import { GET_ERRORS } from "./types";
import { 
  SET_USER
} from "../constants/action-types";

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
    console.log('payload', payload);
    return axios.post('/api/users/signup', payload, {}).then(response => {
      console.log('response', response);
      dispatch({ type: SET_USER, payload: response.data });
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
    });   
  };
}

export const signup = (payload) => {
  return (dispatch) => {
    return axios.post('/api/users/login', payload, {}).then(res => {
      console.log('res', res);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
    });   
  };
}