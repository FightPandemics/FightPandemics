import {
  ADD_OPTION,
  REMOVE_OPTION,
  REMOVE_ALL_OPTIONS,
  TOGGLE_STATE,
  SET_VALUE,
  SET_DELETE_MODAL_VISIBILITY,
  DELETE_MODAL_HIDE,
} from "../actions/feedActions";

export const feedReducer = (oldState, action) => {
  const { type, key, value } = action;
  switch (type) {
    case TOGGLE_STATE:
      return { ...oldState, [key]: !oldState[key] };
    case SET_VALUE:
      return { ...oldState, [key]: value };
    default:
      return oldState;
  }
};

export const optionsReducer = (oldState, action) => {
  const { option, label } = action.payload;
  const newState = Object.assign({}, oldState);
  switch (action.type) {
    case ADD_OPTION:
      return { ...oldState, [label]: [...(oldState[label] || []), option] };
    case REMOVE_OPTION:
      newState[label] = newState[label].filter((o) => o !== option);
      if (!newState[label].length) delete newState[label];
      return newState;
    case REMOVE_ALL_OPTIONS:
      return {};
    default:
      return oldState;
  }
};

export const deletePostState = {
  deleteModalVisibility: DELETE_MODAL_HIDE
}

export const deletePostModalreducer = (state = deletePostState, action) => {
  switch (action.type) {
    case SET_DELETE_MODAL_VISIBILITY:
      return {
        ...state,
        deleteModalVisibility: action.visibility,
      };
    default:
      return state;
  }
}
