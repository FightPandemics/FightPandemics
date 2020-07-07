import {
  CREATE_Organisation,
  CREATE_Organisation_ERROR,
  //CREATE_Organisation_SUCCESS,
  FETCH_Organisation,
  FETCH_Organisation_ERROR,
  FETCH_Organisation_SUCCESS,
  UPDATE_Organisation,
  UPDATE_Organisation_ERROR,
  UPDATE_Organisation_SUCCESS,
} from "../actions/organisationActions";

export const initialState = {
  error: null,
  loading: false,
};

export const createOrganisationFormReducer = (state, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case CREATE_Organisation:
      return { ...state, loading: true, error: null };
    case CREATE_Organisation_ERROR:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};

export const initialProfileState = {
  error: null,
  loading: false,
  organisation: null,
};

export const orgProfileReducer = (state, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case FETCH_Organisation:
    case UPDATE_Organisation:
      return { ...state, loading: true, error: null };
    case FETCH_Organisation_ERROR:
    case UPDATE_Organisation_ERROR:
      return { ...state, loading: false, error: payload.error };
    case FETCH_Organisation_SUCCESS:
    case UPDATE_Organisation_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        organisation: payload.organisation,
      };
    default:
      return state;
  }
};
