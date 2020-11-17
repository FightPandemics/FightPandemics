import { combineReducers } from "redux";
import session from "./session";
import posts from "./posts";

const rootReducer = combineReducers({
  session,
  posts,
});

export default rootReducer;
