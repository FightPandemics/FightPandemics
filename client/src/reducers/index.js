import { SET_USER } from "../constants/action-types";

const initialState = {
  user: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
