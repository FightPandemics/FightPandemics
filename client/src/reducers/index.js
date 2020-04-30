import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SIGNUP,
  SET_USER,
} from "../constants/action-types";

const initialState = {
  accessToken: null,
  isAuthenticated: false,
  emailVerified: false,
  user: {
    firstName: "Dummy",
    lastName: "Data",
    email: "DummyData@Gmail.com",
    country: "United States of America",
    neighborhood: "DummyCity, NY",
    shareInfoStatus: false,
    volunteerStatus: false,
    donateStatus: false,
    medicalHelpStatus: false,
    otherHelpStatus: false,
    traveling: false,
    displayNeighborhood: false,
    about: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
    editProfile: true,
    facebookURL: "http://facebook.com/dummyData",
    twitterURL: "http://twitter.com/dummyData",
    githubURL: "http://github.com/dummyData",
    linkedinURL: "http://linkedin.com/dummyData",
    personalURL: "http://personal.com/dummyData",
  },
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
    case AUTH_SIGNUP:
      return {
        ...state,
        accessToken: action.payload.token,
        emailVerified: action.payload.emailVerified,
        isAuthenticated: true,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
      };
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
