export const CREATE_ORGANIZATION = "CREATE_ORGANIZATION";
export const CREATE_ORGANIZATION_ERROR = "CREATE_ORGANIZATION_ERROR";
export const CREATE_ORGANIZATION_SUCCESS = "CREATE_ORGANIZATION_SUCCESS";

export const FETCH_ORGANIZATION = "FETCH_ORGANIZATION";
export const FETCH_ORGANIZATION_ERROR = "FETCH_ORGANIZATION_ERROR";
export const FETCH_ORGANIZATION_SUCCESS = "FETCH_ORGANIZATION_SUCCESS";

export const fetchOrganization = () => ({ type: FETCH_ORGANIZATION });
export const fetchOrganizationError = (error) => ({ type: FETCH_ORGANIZATION_ERROR, error });
export const fetchOrganizationSuccess = (organization) => ({ type: FETCH_ORGANIZATION_SUCCESS, organization });

export const UPDATE_ORGANIZATION = "UPDATE_ORGANIZATION";
export const UPDATE_ORGANIZATION_ERROR = "UPDATE_ORGANIZATION_ERROR";
export const UPDATE_ORGANIZATION_SUCCESS = "UPDATE_ORGANIZATION_SUCCESS";

export const updateOrganization = () => ({ type: UPDATE_ORGANIZATION });
export const updateOrganizationError = (error) => ({ type: UPDATE_ORGANIZATION_ERROR, error });
export const updateOrganizationSuccess = (organization) => ({
  type: UPDATE_ORGANIZATION_SUCCESS,
  organization,
});
