import React, { useState } from "react";
import styled from "styled-components";
import filterOptions from "../assets/data/filterOptions";
import fakePosts from "../assets/data/fakePosts";
import FilterBox from "../components/Feed/FilterBox";
import Posts from "../components/Feed/Posts";

const FeedWraper = styled.div`
  width: 100%;
  padding: 20px 0;
`;

const Feed = () => {
  const [modal, setModal] = useState(false);
  const [activePanel, setActivePanel] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [location, setLocation] = useState("");

  const handleModal = (isOpen, panelIdx) => (e) => {
    e.preventDefault();
    setModal(isOpen);
    setActivePanel(panelIdx > -1 ? `${panelIdx}` : null);
  };

  const handleQuit = (e) => {
    e.preventDefault();
    setModal(false);
    setActivePanel(null);
    setSelectedFilters({});
    setLocation("");
  };

  const handleLocation = (value) => {
    setLocation(value);
  };

  const shareMyLocation = () => {};

  const handleOption = (label, option) => (e) => {
    e.preventDefault();
    const options = selectedFilters[label] || [];
    let newOptions =
      options.indexOf(option) > -1
        ? options.filter((o) => o !== option)
        : [...options, option];

    if (newOptions.length) {
      return setSelectedFilters({ ...selectedFilters, [label]: newOptions });
    } else {
      let newState = Object.assign({}, selectedFilters);
      delete newState[label]; // remove filter from state, otherwise state is { a: [], b: [1, 2, 3] }
      return setSelectedFilters(newState);
    }
  };
  return (
    <FeedWraper>
      <FilterBox
        modal={modal}
        location={location}
        filters={filterOptions}
        activePanel={activePanel}
        selectedFilters={selectedFilters}
        handleOption={handleOption}
        handleModal={handleModal}
        handleQuit={handleQuit}
        handleLocation={handleLocation}
        setActivePanel={setActivePanel}
        shareMyLocation={shareMyLocation}
      />
      <Posts posts={fakePosts} />
    </FeedWraper>
  );
};

export default Feed;
