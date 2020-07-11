import {
  TOGGLE_STATE,
  SET_VALUE,
  FEEDBACK_FORM_SUBMIT,
  FEEDBACK_FORM_SUBMIT_ERROR,
} from "../actions/feedbackActions";

export const initialState = {
  feedbackReducer: {
    ratingModal: false,
    textFeedbackModal: false,
    rating: "",
    mostValuableFeature: "",
    whatWouldChange: "",
    generalFeedback: "",
    covidImpact: "",
  },
  feedbackFormReducer: {
    error: null,
    loading: false,
  },
};

export const feedbackReducer = (oldState, action) => {
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

export const feedbackFormReducer = (state, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case FEEDBACK_FORM_SUBMIT:
      return { ...state, loading: true, error: null };
    case FEEDBACK_FORM_SUBMIT_ERROR:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
