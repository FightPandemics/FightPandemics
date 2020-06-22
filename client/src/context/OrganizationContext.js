import React, { createContext, useReducer } from "react";
import {
  initialProfileState,
  orgProfileReducer,
} from "../hooks/reducers/organizationReducers";

export const OrganizationContext = createContext();

export const withOrganizationContext = (Component) => (props) => {
  const [orgProfileState, orgProfileDispatch] = useReducer(
    orgProfileReducer,
    initialProfileState,
  );
  const contextValue = { orgProfileState, orgProfileDispatch };

  return (
    <OrganizationContext.Provider value={contextValue}>
      <Component {...props} />
    </OrganizationContext.Provider>
  );
};
