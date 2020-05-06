const initialState = {
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
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
    default:
        return state;
    }
};

export default userReducer;
