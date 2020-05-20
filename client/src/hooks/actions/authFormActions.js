export const AUTH_FORM_LOGIN = "AUTH_FORM_LOGIN";
export const AUTH_FORM_LOGIN_ERROR = "AUTH_FORM_LOGIN_ERROR";

export const AUTH_FORM_SIGNUP = "AUTH_FORM_SIGNUP";
export const AUTH_FORM_SIGNUP_ERROR = "AUTH_FORM_SIGNUP_ERROR";

/*
export const loginWithEmail = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/auth/login", payload);
      dispatch({ type: AUTH_LOGIN, payload: res.data });
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      // Toast.fail(`Login failed, reason: ${message}`, 3);
    }
  };
};

export const authWithSocialProvider = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/api/auth/oauth`, payload);
      dispatch({ type: AUTH_LOGIN, payload: res.data });
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      // Toast.fail(`Login failed, reason: ${message}`, 3);
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
      // Toast.fail(`Signup failed, reason: ${message}`, 3);
    }
  };
};
*/
