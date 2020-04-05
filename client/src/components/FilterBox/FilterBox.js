import React, { useState } from "react";
import styled from "styled-components";
import { Modal, Accordion, SearchBar, List, Button } from "antd-mobile";
import filterOptions from "../../assets/data/filterOptions";
import FilterTag from "../Tag/FilterTag";
import FilterTitle from "../Typography/Title/FilterTitle";
import FilterOptionButton from "../Button/FilterOptionButton";
import CustomButton from "../../components/Button/CustomButton";
import CustomList from "../../components/List/CustomList";
import LocationSearch from "../../components/Input/LocationSearch";
import {
  FilterAccordion,
  FilterAccordionPanel,
} from "../Accordion/FilterAccordion";

const FilterBoxWrapper = styled.div`
  width: 100%;
`;

export default () => {
  const [modal, setModal] = useState(false);
  const [activePanel, setActivePanel] = useState("");
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
  const renderFilterOptions = (filters) => {
    return filters.map((filter, idx) => (
      <FilterOptionButton
        handleClick={openModal(idx)}
        key={idx}
        label={filter.label}
      />
    ));
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
            <LocationSearch />
          </FilterAccordionPanel>
        );
      }
    });
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
          defaultActiveKey={activePanel}
          className="my-accordion"
        >
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
