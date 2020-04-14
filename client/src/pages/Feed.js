import React, { useReducer } from "react";
import styled from "styled-components";
import filterOptions from "../assets/data/filterOptions";
import fakePosts from "../assets/data/fakePosts";
import FilterBox from "../components/Feed/FilterBox";
import Posts from "../components/Feed/Posts";
import CreatPostIcon from "../components/Icon/create-post";
import { optionsReducer, feedReducer } from "../reducers/feedReducers";
import {
  ADD_OPTION,
  REMOVE_OPTION,
  REMOVE_ALL_OPTIONS,
  TOGGLE_STATE,
  SET_VALUE,
} from "../actions/feedActions";

const FeedWraper = styled.div`
  font-family: "Poppins";
  width: 100%;
  padding: 20px 0;
`;

const ceatePostStyles = {
  position: "fixed",
  bottom: "5%",
  right: "5%",
};

export const FeedContext = React.createContext();

const initialState = {
  modal: false,
  activePanel: null,
  location: "",
};

const Feed = () => {
  const [feedState, feedDispatch] = useReducer(feedReducer, initialState);
  const [selectedOptions, optionsDispatch] = useReducer(optionsReducer, {});
  const { modal, activePanel, location } = feedState;
  const filters = Object.values(filterOptions);

  const dispatchAction = (type, key, value) =>
    feedDispatch({ type, key, value });

  const handleModal = (panelIdx) => (e) => {
    e.preventDefault();
    dispatchAction(TOGGLE_STATE, "modal");
    dispatchAction(
      SET_VALUE,
      "activePanel",
      panelIdx > -1 ? `${panelIdx}` : null,
    );
  };

  const handleQuit = (e) => {
    e.preventDefault();
    dispatchAction(TOGGLE_STATE, "modal");
    dispatchAction(SET_VALUE, "location", "");
    dispatchAction(SET_VALUE, "activePanel", null);
    optionsDispatch({ type: REMOVE_ALL_OPTIONS, payload: {} });
  };

  const handleLocation = (value) =>
    dispatchAction(SET_VALUE, "location", value);

  const handleOption = (label, option) => (e) => {
    e.preventDefault();
    const options = selectedOptions[label] || [];
    const hasOption = options.includes(option);
    return optionsDispatch({
      type: hasOption ? REMOVE_OPTION : ADD_OPTION,
      payload: { option, label },
    });
  };

  const handleCreatePost = () => {
    console.log("clicked");
  };

  return (
    <FeedContext.Provider
      value={{
        filters,
        modal,
        activePanel,
        location,
        dispatchAction,
        selectedOptions,
        handleOption,
        handleModal,
        handleQuit,
        handleLocation,
      }}
    >
      <FeedWraper>
        <FilterBox />
        <Posts filteredPosts={fakePosts} />
        <CreatPostIcon onClick={handleCreatePost} style={ceatePostStyles} />
      </FeedWraper>
    </FeedContext.Provider>
  );
};

export default Feed;
