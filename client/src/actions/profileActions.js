import { SET_ORGANISATION_INDEX } from "constants/action-types";

export const setOrganisationIndex = (index) => {
  return (dispatch) => {
    dispatch({ type: SET_ORGANISATION_INDEX, payload: index });
  };
};
