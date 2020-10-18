import { combineReducers } from "redux";
import session from "./sessionReducer";
import ws from "./wsReducers";

const rootReducer = combineReducers({
  session,
  ws,
});

export default rootReducer;
