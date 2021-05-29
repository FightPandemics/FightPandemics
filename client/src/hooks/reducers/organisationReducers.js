import {
  CREATE_Organisation,
  CREATE_Organisation_ERROR,
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
      const organName = payload.organisation.name;
      let desc = payload.organisation.positions.description;

      if (desc.includes("-")) {
        const text1 = desc.split("-")[0];
        const text2 = desc.split("-")[1];
        desc = text1 + " " + organName + " " + text2;
        Object.assign(state, payload);
        return {
          ...state,
          loading: false,
          error: null,
          organisation: {
            ...state.organisation,
            positions: {
              ...state.organisation.positions,
              description: desc,
            },
          },
        };
      }
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
