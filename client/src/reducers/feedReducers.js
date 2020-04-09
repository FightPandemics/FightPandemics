import {
  ADD_OPTION,
  REMOVE_OPTION,
  REMOVE_ALL_OPTIONS,
} from "../actions/feedOptions";

export const optionsReducer = (oldState, action) => {
  const { option, label } = action.payload;
  let newState = Object.assign({}, oldState);
  newState[label] = newState[label] || [];
  switch (action.type) {
    case ADD_OPTION:
      newState[label].push(option);
      return newState;
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
