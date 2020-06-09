import React, { createContext, useReducer } from "react";
import {
  initialProfileState,
  userProfileReducer,
} from "../hooks/reducers/userReducers";

export const UserContext = createContext({});

export const withUserContext = (Component) => (props) => {
  const [userProfileState, userProfileDispatch] = useReducer(
    userProfileReducer,
    initialProfileState,
  );
  const contextValue = { userProfileState, userProfileDispatch };

  return (
    <UserContext.Provider value={contextValue}>
      <Component {...props} />
    </UserContext.Provider>
  );
};
