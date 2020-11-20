import { combineReducers } from "redux";
import session from "./session";
import posts from "./posts";
import ws from "./wsReducers";

const rootReducer = combineReducers({
  session,
  posts,
  ws,
});

export default rootReducer;
