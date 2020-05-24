const initialState = {
  firstName: "Dummy",
  lastName: "Data",
  email: "DummyData@Gmail.com",
  country: "USA",
  address: "DummyCity, NY",
  shareInfoStatus: false,
  volunteerStatus: false,
  donateStatus: false,
  medicalHelpStatus: false,
  otherHelpStatus: false,
  traveling: false,
  displayAddress: false,
  about:
    "Lorem ipsum dolor sit amet consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna Lorem ipsum this is 160 characters long",
  editProfile: true,
  facebookURL: "http://facebook.com/dummyData",
  twitterURL: "http://twitter.com/dummyData",
  githubURL: "http://github.com/dummyData",
  linkedinURL: "http://linkedin.com/dummyData",
  personalURL: "http://personal.com/dummyData",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
