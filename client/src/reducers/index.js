import { combineReducers } from "redux";
import session from "./session";
import posts from "./posts";
import webSocket from "./wsReducers";
import memberOrganisations from "./memberOrganisations";
import applicants from "./applicants";

const rootReducer = combineReducers({
  session,
  posts,
  webSocket,
  memberOrganisations,
  applicants
});

export default rootReducer;
