import axios from "axios";
import {
  AUTH_LOGOUT,
  AUTH_LOGOUT_ERROR,
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

export const authLogout = () => {
  return async (dispatch) => {
    try {
      await axios.post("/api/auth/logout", {});
      dispatch({ type: AUTH_LOGOUT });
    } catch (err) {
      console.log(err);
      const message = err.response?.data?.message || err.message;
      dispatch({
        type: AUTH_LOGOUT_ERROR,
        error: `Logout failed, reason: ${message}`,
      });
    }
  };
};
