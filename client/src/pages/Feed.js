import React, { useState, useReducer } from "react";
import styled from "styled-components";
import filterOptions from "../assets/data/filterOptions";
import fakePosts from "../assets/data/fakePosts";
import FilterBox from "../components/Feed/FilterBox";
import Posts from "../components/Feed/Posts";
import { optionsReducer } from "../reducers/feedReducers";
import {
  ADD_OPTION,
  REMOVE_OPTION,
  REMOVE_ALL_OPTIONS,
} from "../actions/feedOptions";

const FeedWraper = styled.div`
  width: 100%;
  padding: 20px 0;
`;

const Feed = () => {
  const [modal, setModal] = useState(false);
  const [activePanel, setActivePanel] = useState("");
  const [location, setLocation] = useState("");
  const [selectedOptions, optionsDispatch] = useReducer(optionsReducer, {});

  const handleModal = (isOpen, panelIdx) => (e) => {
    e.preventDefault();
    setModal(isOpen);
    setActivePanel(panelIdx > -1 ? `${panelIdx}` : null);
  };

  const handleQuit = (e) => {
    e.preventDefault();
    setModal(false);
    setActivePanel(null);
    setLocation("");
    optionsDispatch({ type: REMOVE_ALL_OPTIONS, payload: {} });
  };

  const handleLocation = (value) => {
    setLocation(value);
  };

  const shareMyLocation = () => {};

  const handleOption = (label, option) => (e) => {
    e.preventDefault();
    const options = selectedOptions[label] || [];
    const optionIdx = options.indexOf(option);
    const action = {
      type: optionIdx > -1 ? REMOVE_OPTION : ADD_OPTION,
      payload: { option, label },
    };
    return optionsDispatch(action);
  };

  return (
    <FeedWraper>
      <FilterBox
        modal={modal}
        location={location}
        filters={filterOptions}
        activePanel={activePanel}
        selectedOptions={selectedOptions}
        handleOption={handleOption}
        handleModal={handleModal}
        handleQuit={handleQuit}
        handleLocation={handleLocation}
        setActivePanel={setActivePanel}
        shareMyLocation={shareMyLocation}
      />
      <Posts filteredPosts={fakePosts} />
    </FeedWraper>
  );
};

export default Feed;
