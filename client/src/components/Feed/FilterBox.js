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

  const openModal = (panelIdx) => (e) => {
    e.preventDefault();
    setModal(true);
    setActivePanel(`${panelIdx}`);
  };

  const closeModal = () => {
    setModal(false);
    setActivePanel(null);
  };

  const handleQuit = (e) => {
    e.preventDefault();
    setModal(false);
    setActivePanel(null);
    setSelectedFilters({});
  };

  const handleLocation = (value) => {
    setLocation(value);
  };

  const shareMyLocation = () => {};

  const handleTag = (label, option) => (e) => {
    e.preventDefault();
    const options = selectedFilters[label] || [];
    const optionIdx = options.indexOf(option);
    let newOptions;
    if (optionIdx === -1) {
      newOptions = [...options, option];
    } else {
      options.splice(optionIdx, 1);
      newOptions = options;
    }
    setSelectedFilters({ ...selectedFilters, [label]: newOptions });
  };

  const renderFilterOptions = (filters) => {
    return filters.map((filter, idx) => (
      <FilterOptionButton
        handleClick={openModal(idx)}
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
        onClose={closeModal}
        animationType="slide-up"
      >
        <FilterAccordion
          filters={filters}
          location={location}
          handleTag={handleTag}
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
              onClick={closeModal}
            >
              Apply filters
            </CustomButton>
          </List.Item>
        </CustomList>
      </Modal>
    </FilterBoxWrapper>
  );
};
