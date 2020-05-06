import { DARK_GRAY, ROYAL_BLUE, SELAGO } from "../../constants/colors";
import React, { useContext } from "react";

import CustomButton from "../../components/Button/CustomButton";
import CustomH1 from "../Typography/Title/CustomH1";
import DownArrowButton from "../Button/DownArrowButton";
import { FeedContext } from "../../pages/Feed";
import FilterAccordion from "./FilterAccordion";
import { Modal } from "antd-mobile";
import styled from "styled-components";

const FilterBoxWrapper = styled.div`
  margin-bottom: 4rem;
`;

const FilterBox = () => {
  const feedContext = useContext(FeedContext);
  const { filters, filterModal, handleFilterModal, handleQuit } = feedContext;
  const renderFilterOptions = (filters) => {
    return filters.map((filter, idx) => (
      <DownArrowButton
        key={idx}
        label={filter.label}
        handleClick={handleFilterModal(idx)}
        color={ROYAL_BLUE}
        bgcolor={SELAGO}
      />
    ));
  };
  return (
    <FilterBoxWrapper>
      <CustomH1 color={DARK_GRAY} fontsize={"1.4rem"} fontweight={"normal"}>
        Filter by
      </CustomH1>
      {renderFilterOptions(filters)}
      <Modal
        popup
        visible={filterModal}
        onClose={handleFilterModal(null)}
        animationType="slide-up"
      >
        <FilterAccordion />
        <div
          className="confirm-buttons"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            padding: "2rem 0",
          }}
        >
          <CustomButton inline secondary="true" onClick={handleQuit}>
            Quit filters
          </CustomButton>
          <CustomButton inline primary="true" onClick={handleFilterModal(null)}>
            Apply filters
          </CustomButton>
        </div>
      </Modal>
    </FilterBoxWrapper>
  );
};

export default FilterBox;
