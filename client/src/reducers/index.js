import { combineReducers } from "redux";
import session from "./session";
import posts from "./posts";
import webSocket from "./wsReducers";

const rootReducer = combineReducers({
  session,
  posts,
  webSocket,
});

export default rootReducer;
