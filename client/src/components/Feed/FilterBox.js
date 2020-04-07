import React from "react";
import styled from "styled-components";
import { Modal, List } from "antd-mobile";
import CustomList from "../../components/List/CustomList";
import CustomButton from "../../components/Button/CustomButton";
import FilterTitle from "../Typography/Title/FilterTitle";
import FilterOptionButton from "../Button/FilterOptionButton";
import FilterAccordion from "./FilterAccordion";

const FilterBoxWrapper = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

export default ({
  modal,
  location,
  filters,
  activePanel,
  selectedFilters,
  handleOption,
  handleModal,
  handleQuit,
  handleLocation,
  setActivePanel,
  shareMyLocation,
}) => {
  filters = Object.values(filters);
  const renderFilterOptions = (filters) => {
    return filters.map((filter, idx) => (
      <FilterOptionButton
        key={idx}
        label={filter.label}
        handleClick={handleModal(true, idx)}
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
