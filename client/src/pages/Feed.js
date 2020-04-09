import React, { useState, useReducer } from "react";
import styled from "styled-components";
import filterOptions from "../assets/data/filterOptions";
import fakePosts from "../assets/data/fakePosts";
import FilterBox from "../components/Feed/FilterBox";
import Posts from "../components/Feed/Posts";
import useToggle from "../hooks/useToggleState";
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

export const FeedContext = React.createContext();

const Feed = () => {
  const [modal, toggleModal] = useToggle(false);
  const [activePanel, setActivePanel] = useState("");
  const [location, setLocation] = useState("");
  const [selectedOptions, optionsDispatch] = useReducer(optionsReducer, {});
  const filters = Object.values(filterOptions);

  const handleModal = (isOpen, panelIdx) => (e) => {
    e.preventDefault();
    toggleModal();
    setActivePanel(panelIdx > -1 ? `${panelIdx}` : null);
  };

  const handleQuit = (e) => {
    e.preventDefault();
    toggleModal();
    setActivePanel(null);
    setLocation("");
    optionsDispatch({ type: REMOVE_ALL_OPTIONS, payload: {} });
  };

  const handleLocation = (value) => {
    setLocation(value);
  };

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
    <FeedContext.Provider
      value={{
        modal,
        location,
        filters,
        activePanel,
        selectedOptions,
        handleOption,
        handleModal,
        handleQuit,
        handleLocation,
        setActivePanel,
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
