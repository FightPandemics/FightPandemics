import React, { useContext } from "react";
import styled from "styled-components";
import { Modal, List } from "antd-mobile";
import CustomList from "../../components/List/CustomList";
import CustomButton from "../../components/Button/CustomButton";
import CustomH5 from "../Typography/Title/CustomH5";
import DownArrowButton from "../Button/DownArrowButton";
import FilterAccordion from "./FilterAccordion";
import { FeedContext } from "../../pages/Feed";
import { ROYAL_BLUE, SELAGO, DARK_GRAY } from "../../constants/colors";

const FilterBoxWrapper = styled.div`
  margin-bottom: 4rem;
`;

export default () => {
  const feedContext = useContext(FeedContext);
  const { filters, modal, handleModal, handleQuit } = feedContext;
  const renderFilterOptions = (filters) => {
    return filters.map((filter, idx) => (
      <DownArrowButton
        key={idx}
        label={filter.label}
        handleClick={handleModal(idx)}
        color={ROYAL_BLUE}
        bgcolor={SELAGO}
      />
    ));
  };
  return (
    <FilterBoxWrapper>
      <CustomH5 color={DARK_GRAY} fontsize={"1.4rem"}>
        Filter by
      </CustomH5>
      {renderFilterOptions(filters)}
      <Modal
        popup
        visible={modal}
        onClose={handleModal(null)}
        animationType="slide-up"
      >
        <FilterAccordion />
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
              onClick={handleModal(null)}
            >
              Apply filters
            </CustomButton>
          </List.Item>
        </CustomList>
      </Modal>
    </FilterBoxWrapper>
  );
};
