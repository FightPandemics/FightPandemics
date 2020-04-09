import React, { useState, useReducer } from "react";
import styled from "styled-components";
import filterOptions from "../assets/data/filterOptions";
import fakePosts from "../assets/data/fakePosts";
import FilterBox from "../components/Feed/FilterBox";
import Posts from "../components/Feed/Posts";
import { optionsReducer, feedReducer } from "../reducers/feedReducers";
import {
  ADD_OPTION,
  REMOVE_OPTION,
  REMOVE_ALL_OPTIONS,
  TOGGLE_MODAL,
  SET_ACTIVE_PANEL,
  SET_LOCATION,
} from "../actions/feedActions";

const FeedWraper = styled.div`
  width: 100%;
  padding: 20px 0;
`;

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

  const handleModal = (isOpen, panelIdx) => (e) => {
    e.preventDefault();
    feedDispatch({ type: TOGGLE_MODAL });
    feedDispatch({
      type: SET_ACTIVE_PANEL,
      value: panelIdx > -1 ? `${panelIdx}` : null,
    });
  };

  const handleQuit = (e) => {
    e.preventDefault();
    optionsDispatch({ type: REMOVE_ALL_OPTIONS, payload: {} });
    feedDispatch({ type: SET_LOCATION, value: "" });
    feedDispatch({ type: TOGGLE_MODAL });
    feedDispatch({
      type: SET_ACTIVE_PANEL,
      value: null,
    });
  };

  const handleLocation = (value) => feedDispatch({ type: SET_LOCATION, value });

  const handleOption = (label, option) => (e) => {
    e.preventDefault();
    const options = selectedOptions[label] || [];
    const optionIdx = options.indexOf(option);
    return optionsDispatch({
      type: optionIdx > -1 ? REMOVE_OPTION : ADD_OPTION,
      payload: { option, label },
    });
  };

  return (
    <FeedContext.Provider
      value={{
        filters,
        modal,
        activePanel,
        location,
        feedDispatch,
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
      </FeedWraper>
    </FeedContext.Provider>
  );
};

export default Feed;
