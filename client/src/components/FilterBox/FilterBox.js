import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal, Accordion, SearchBar, List, Button } from "antd-mobile";
import filterOptions from "../../assets/data/filterOptions";
import FilterTag from "../Tag/FilterTag";
import FilterTitle from "../Typography/Title/FilterTitle";
import FilterOptionButton from "../Button/FilterOptionButton";
import CustomButton from "../../components/Button/CustomButton";
import CustomList from "../../components/List/CustomList";
import {
  FilterAccordion,
  FilterAccordionPanel,
} from "../Accordion/FilterAccordion";

const FilterBoxWrapper = styled.div`
  width: 100%;
`;

export default () => {
  const [modal, setModal] = useState(true);
  const [clickedLabel, setClickedLabel] = useState("");
  const [location, setLocation] = useState("");
  const filters = Object.values(filterOptions);
  const openModal = (label) => (e) => {
    e.preventDefault();
    setModal(true);
    setClickedLabel(label);
  };
  const closeModal = () => {
    setModal(false);
    setClickedLabel("");
  };
  const renderFilterPanels = (filters) => {
    return filters.map((filter, idx) => {
      if (filter.label !== "Location") {
        return (
          <FilterAccordionPanel header={filter.label} key={idx}>
            {Object.values(filter.options).map((option, idx) => (
              <FilterTag label={option} key={idx} />
            ))}
          </FilterAccordionPanel>
        );
      } else {
        return (
          <FilterAccordionPanel header={filter.label} key={idx}>
            <SearchBar placeholder="Search" maxLength={8} />
          </FilterAccordionPanel>
        );
      }
    });
  };

  return (
    <FilterBoxWrapper>
      <FilterTitle>Filter by</FilterTitle>
      {filters.map((filter, idx) => (
        <FilterOptionButton
          handleClick={openModal(filter.label)}
          key={idx}
          label={filter.label}
        />
      ))}
      <Modal
        popup
        visible={modal}
        onClose={closeModal}
        animationType="slide-up"
      >
        <FilterAccordion className="my-accordion">
          {renderFilterPanels(filters)}
        </FilterAccordion>
        <CustomList center="true">
          <List.Item>
            <CustomButton
              // for some reason react wants boolean values for styled components
              inline="true"
              roundborder="true"
              large="true"
              whitebg="true"
            >
              Quit filters
            </CustomButton>
            <CustomButton
              inline="true"
              roundborder="true"
              large="true"
              primary="true"
            >
              Apply filters
            </CustomButton>
          </List.Item>
        </CustomList>
      </Modal>
    </FilterBoxWrapper>
  );
};
