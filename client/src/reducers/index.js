import { SET_USER, SET_ERROR, SET_SUCCESS } from "../constants/action-types";

const initialState = {
  user: null,
  error: null,
  success: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
