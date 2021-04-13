import { combineReducers } from "redux";
import session from "./session";
import posts from "./posts";
import webSocket from "./wsReducers";
import applicants from "./applicants"

const rootReducer = combineReducers({
  session,
  posts,
  webSocket,
  applicants
});

export default rootReducer;
