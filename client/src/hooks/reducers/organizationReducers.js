import {
  CREATE_ORGANIZATION,
  CREATE_ORGANIZATION_ERROR,
  CREATE_ORGANIZATION_SUCCESS,
} from "../actions/organizationActions";

export const initialState = {
  error: null,
  loading: false,
};

export const createOrganizationFormReducer = (state, action) => {
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
