import { combineReducers } from "redux";
import session from "./sessionReducer";

const rootReducer = combineReducers({
  session,
});

export default rootReducer;
