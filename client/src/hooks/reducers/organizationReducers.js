import {
  CREATE_ORGANIZATION,
  CREATE_ORGANIZATION_ERROR,
  CREATE_ORGANIZATION_SUCCESS,
  FETCH_ORGANIZATION,
  FETCH_ORGANIZATION_ERROR,
  FETCH_ORGANIZATION_SUCCESS,
  UPDATE_ORGANIZATION,
  UPDATE_ORGANIZATION_ERROR,
  UPDATE_ORGANIZATION_SUCCESS
} from "../actions/organizationActions";

export const initialState = {
  error: null,
  loading: false,
};

export const createOrganizationFormReducer = (state, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case CREATE_ORGANIZATION:
      return { ...state, loading: true, error: null };
    case CREATE_ORGANIZATION_ERROR:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};

export const initialProfileState = {
  error: null,
  loading: false,
  organization: null,
};

export const orgProfileReducer = (state, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case FETCH_ORGANIZATION:
    case UPDATE_ORGANIZATION:
      return { ...state, loading: true, error: null };
    case FETCH_ORGANIZATION_ERROR:
    case UPDATE_ORGANIZATION_ERROR:
      return { ...state, loading: false, error: payload.error };
    case FETCH_ORGANIZATION_SUCCESS:
    case UPDATE_ORGANIZATION_SUCCESS:
      return { ...state, loading: false, error: null, organization: payload.organization };
    default:
      return state;
  }
};
