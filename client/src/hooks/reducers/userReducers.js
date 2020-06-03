import {
  CREATE_USER,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
} from "../actions/userActions";

export const initialState = {
  error: null,
  loading: false,
};

export const createUserFormReducer = (state, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case CREATE_USER:
      return { ...state, loading: true, error: null };
    case CREATE_USER_ERROR:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
