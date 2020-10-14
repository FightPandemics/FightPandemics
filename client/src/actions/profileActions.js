import { SESSION_ACTIONS } from "reducers/session";

export const setOrganisationIndex = (index) => {
  return (dispatch) => {
    dispatch({ type: SESSION_ACTIONS.SET_ORGANISATION_INDEX, payload: index });
  };
};
