import { combineReducers } from "redux";
import session from "./sessionReducer";
import user from "./userReducer";

const rootReducer = combineReducers({
  session,
  user,
});

export default rootReducer;
