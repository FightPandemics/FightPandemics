import {
  CREATE_USER,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  FETCH_USER,
  FETCH_USER_ERROR,
  FETCH_USER_SUCCESS,
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

export const initialProfileState = {
  error: null,
  loading: false,
  user: null,
};

export const userProfileReducer = (state, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case FETCH_USER:
      return { ...state, loading: true, error: null };
    case FETCH_USER_ERROR:
      return { ...state, loading: false, error: payload.error };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, user: payload.user };
    default:
      return state;
  }
};
