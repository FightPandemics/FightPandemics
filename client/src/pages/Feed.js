import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import ButtonModal from "../components/Feed/ButtonModal";
import filterOptions from "../assets/data/filterOptions";
import fakePosts from "../assets/data/fakePosts";
import FeedWrapper from "../components/Feed/FeedWrapper";
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

export const FeedContext = React.createContext();

const initialState = {
  filterModal: false,
  createPostModal: false,
  activePanel: null,
  location: "",
};

const Feed = () => {
  const [feedState, feedDispatch] = useReducer(feedReducer, initialState);
  const [selectedOptions, optionsDispatch] = useReducer(optionsReducer, {});
  const { filterModal, createPostModal, activePanel, location } = feedState;
  const filters = Object.values(filterOptions);

  const dispatchAction = (type, key, value) =>
    feedDispatch({ type, key, value });

  const handleFilterModal = (panelIdx) => (e) => {
    e.preventDefault();
    dispatchAction(TOGGLE_STATE, "filterModal");
    dispatchAction(
      SET_VALUE,
      "activePanel",
      panelIdx > -1 ? `${panelIdx}` : null,
    );
  };

  const handleQuit = (e) => {
    e.preventDefault();
    dispatchAction(TOGGLE_STATE, "filterModal");
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
      <ButtonModal
        onClose={() => dispatchAction(TOGGLE_STATE, "createPostModal")}
        maskClosable={true}
        closable={false}
        visible={createPostModal}
        transparent
      >
        <h2 className="title">Continue Posting As</h2>
        <div className="links">
          <button className="primary">
            <Link to="/create-post">Individual</Link>
          </button>
          <button className="outline">
            <Link to="/create-post">Organization</Link>
          </button>
        </div>
      </ButtonModal>
    );
  };

  return (
    <FeedContext.Provider
      value={{
        filters,
        filterModal,
        activePanel,
        location,
        dispatchAction,
        selectedOptions,
        handleOption,
        handleFilterModal,
        handleQuit,
        handleLocation,
      }}
    >
      <FeedWrapper>
        <FilterBox />
        <Posts filteredPosts={fakePosts} />
        <CreatPostIcon onClick={handleCreatePost} className="create-post" />
        {renderCreatePostModal()}
      </FeedWrapper>
    </FeedContext.Provider>
  );
};

export default Feed;
