export const CREATE_Organisation = "CREATE_Organisation";
export const CREATE_Organisation_ERROR = "CREATE_Organisation_ERROR";
export const CREATE_Organisation_SUCCESS = "CREATE_Organisation_SUCCESS";

export const FETCH_Organisation = "FETCH_Organisation";
export const FETCH_Organisation_ERROR = "FETCH_Organisation_ERROR";
export const FETCH_Organisation_SUCCESS = "FETCH_Organisation_SUCCESS";

export const fetchOrganisation = () => ({ type: FETCH_Organisation });
export const fetchOrganisationError = (error) => ({
  type: FETCH_Organisation_ERROR,
  error,
});
export const fetchOrganisationSuccess = (organisation) => ({
  type: FETCH_Organisation_SUCCESS,
  organisation,
});

export const UPDATE_Organisation = "UPDATE_Organisation";
export const UPDATE_Organisation_ERROR = "UPDATE_Organisation_ERROR";
export const UPDATE_Organisation_SUCCESS = "UPDATE_Organisation_SUCCESS";

export const updateOrganisation = () => ({ type: UPDATE_Organisation });
export const updateOrganisationError = (error) => ({
  type: UPDATE_Organisation_ERROR,
  error,
});
export const updateOrganisationSuccess = (organisation) => ({
  type: UPDATE_Organisation_SUCCESS,
  organisation,
});
