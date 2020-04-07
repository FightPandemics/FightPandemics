import React, { useState } from "react";
import styled from "styled-components";
import { Modal, List } from "antd-mobile";
import CustomList from "../../components/List/CustomList";
import CustomButton from "../../components/Button/CustomButton";
import filterOptions from "../../assets/data/filterOptions";
import FilterTitle from "../Typography/Title/FilterTitle";
import FilterOptionButton from "../Button/FilterOptionButton";
import FilterAccordion from "./FilterAccordion";

const FilterBoxWrapper = styled.div`
  width: 100%;
`;

export default () => {
  const [modal, setModal] = useState(false);
  const [activePanel, setActivePanel] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [location, setLocation] = useState("");
  const filters = Object.values(filterOptions);

  const handleModal = (isOpen, panelIdx) => (e) => {
    let idx = !panelIdx ? null : `${panelIdx}`;
    setModal(isOpen);
    setActivePanel(idx);
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
      // handles the case when a user deselects all options in a filter
      // remove that filter from state, otherwise state is { a: [], b: [1, 2, 3] }
      let newState = {};
      const labels = Object.keys(selectedFilters).filter((l) => l !== label);
      labels.forEach((label) => (newState[label] = selectedFilters[label]));
      return setSelectedFilters(newState);
    }
  };

  const renderFilterOptions = (filters) => {
    return filters.map((filter, idx) => (
      <FilterOptionButton
        handleClick={handleModal(true, idx)}
        key={idx}
        label={filter.label}
      />
    ));
  };

  return (
    <FilterBoxWrapper>
      <FilterTitle>Filter by</FilterTitle>
      {renderFilterOptions(filters)}
      <Modal
        popup
        visible={modal}
        onClose={handleModal(false)}
        animationType="slide-up"
      >
        <FilterAccordion
          filters={filters}
          location={location}
          handleOption={handleOption}
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          handleLocation={handleLocation}
          shareMyLocation={shareMyLocation}
          selectedFilters={selectedFilters}
        />
        <CustomList center="true">
          <List.Item>
            <CustomButton
              // for some reason react wants boolean values for styled components
              inline="true"
              roundborder="true"
              large="true"
              whitebg="true"
              onClick={handleQuit}
            >
              Quit filters
            </CustomButton>
            <CustomButton
              inline="true"
              roundborder="true"
              large="true"
              primary="true"
              onClick={handleModal(false)}
            >
              Apply filters
            </CustomButton>
          </List.Item>
        </CustomList>
      </Modal>
    </FilterBoxWrapper>
  );
};
