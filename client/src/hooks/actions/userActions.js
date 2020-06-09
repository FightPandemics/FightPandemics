export const CREATE_USER = "CREATE_USER";
export const CREATE_USER_ERROR = "CREATE_USER_ERROR";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";

export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

export const fetchUser = () => ({ type: FETCH_USER });
export const fetchUserError = (error) => ({ type: FETCH_USER_ERROR, error });
export const fetchUserSuccess = (user) => ({ type: FETCH_USER_SUCCESS, user });
