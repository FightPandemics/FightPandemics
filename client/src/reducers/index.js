import { combineReducers } from "redux";
import session from "./session";
import posts from "./posts";
import webSocket from "./wsReducers";
import applicants from "./applicants"
import members from "./members"

const rootReducer = combineReducers({
  session,
  posts,
  webSocket,
  applicants,
  members
});

export default rootReducer;
