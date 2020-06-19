import axios from "axios";
import {
  AUTH_LOGOUT,
  SET_AUTH_LOADING,
  SET_USER,
} from "constants/action-types";

// Token stored in httpOnly cookie set/cleared by server
export const initAuth =  () => {
  return async (dispatch) => {
    try {
      const { data: user } = await axios.get("/api/users/current");
      dispatch({ type: SET_USER, payload: { user } });
    } catch (err) {
      // TODO: do something with error -- user succesfully authenticated but can't find user (redirect to login?)
      console.log(err);
    } finally {
      dispatch({ type: SET_AUTH_LOADING, payload: false });
    }
  };
};

// 2nd non-httpOnly "dummy" cookie so user can logout offline
const CLEAR_REMEMBER_COOKIE = 'remember=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

export const authLogout = () => {
  return (dispatch) => {
    document.cookie = CLEAR_REMEMBER_COOKIE;
    dispatch({ type: AUTH_LOGOUT });
  };
};
