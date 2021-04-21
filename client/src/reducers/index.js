import { combineReducers } from "redux";
import session from "./session";
import posts from "./posts";
import webSocket from "./wsReducers";
import memberOrganisations from "./memberOrganisations"

const rootReducer = combineReducers({
  session,
  posts,
  webSocket,
  memberOrganistions
});

export default rootReducer;
