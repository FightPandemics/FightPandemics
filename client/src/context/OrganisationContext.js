import React, { createContext, useReducer } from "react";
import {
  initialProfileState,
  orgProfileReducer,
} from "../hooks/reducers/organisationReducers";

export const OrganisationContext = createContext();

export const withOrganisationContext = (Component) => (props) => {
  const [orgProfileState, orgProfileDispatch] = useReducer(
    orgProfileReducer,
    initialProfileState,
  );
  const contextValue = { orgProfileState, orgProfileDispatch };

  return (
    <OrganisationContext.Provider value={contextValue}>
      <Component {...props} />
    </OrganisationContext.Provider>
  );
};
