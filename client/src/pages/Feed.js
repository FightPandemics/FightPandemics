import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd-mobile";
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
  filterBoxModal: false,
  createPostModal: false,
  activePanel: null,
  location: "",
};

const Feed = () => {
  const [feedState, feedDispatch] = useReducer(feedReducer, initialState);
  const [selectedOptions, optionsDispatch] = useReducer(optionsReducer, {});
  const { filterBoxModal, createPostModal, activePanel, location } = feedState;
  const filters = Object.values(filterOptions);

  const dispatchAction = (type, key, value) =>
    feedDispatch({ type, key, value });

  const handleFilterBoxModal = (panelIdx) => (e) => {
    e.preventDefault();
    dispatchAction(TOGGLE_STATE, "filterBoxModal");
    dispatchAction(
      SET_VALUE,
      "activePanel",
      panelIdx > -1 ? `${panelIdx}` : null,
    );
  };

  const handleQuit = (e) => {
    e.preventDefault();
    dispatchAction(TOGGLE_STATE, "filterBoxModal");
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
    dispatchAction(TOGGLE_STATE, "createPostModal");
  };

  const renderCreatePostModal = () => {
    return (
      <Modal
        onClose={() => dispatchAction(TOGGLE_STATE, "createPostModal")}
        maskClosable={true}
        closable={true}
        visible={createPostModal}
        transparent
      >
        Continue Posting As:
        <Link
          to={{
            pathname: "/create-post",
            state: {
              filters,
            },
          }}
        >
          Individual
        </Link>
        <Link
          to={{
            pathname: "/create-post",
            state: {
              filters,
            },
          }}
        >
          Organization
        </Link>
      </Modal>
    );
  };

  return (
    <FeedContext.Provider
      value={{
        filters,
        filterBoxModal,
        activePanel,
        location,
        dispatchAction,
        selectedOptions,
        handleOption,
        handleFilterBoxModal,
        handleQuit,
        handleLocation,
      }}
    >
      <FeedWraper>
        <FilterBox />
        <Posts filteredPosts={fakePosts} />
        <CreatPostIcon onClick={handleCreatePost} style={ceatePostStyles} />
        {renderCreatePostModal()}
      </FeedWraper>
    </FeedContext.Provider>
  );
};

export default Feed;
