import {
  CREATE_USER,
  CREATE_USER_ERROR,
  FETCH_USER,
  FETCH_USER_ERROR,
  FETCH_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
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
    case UPDATE_USER:
      return { ...state, loading: true, error: null };
    case DELETE_USER:
    case FETCH_USER_ERROR:
    case UPDATE_USER_ERROR:
      return { ...state, loading: false, error: payload.error };
    case DELETE_USER_ERROR:
      return { ...state, loading: false, error: payload.error };
    case FETCH_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, error: null, user: payload.user };
    case DELETE_USER_SUCCESS:
    default:
      return state;
  }
};
