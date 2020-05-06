import { DARK_GRAY, ROYAL_BLUE, SELAGO } from "../../constants/colors";
import React, { useContext } from "react";

import CustomH1 from "../Typography/Title/CustomH1";
import downArrow from "~/assets/icons/down-arrow.svg";
import { FeedContext } from "../../pages/Feed";
import FilterAccordion from "./FilterAccordion";
import { Modal } from "antd-mobile";
import styled from "styled-components";
import SelectWithIconButton from "../Button/SelectWithIconButton";
import SubmitButton from "../Button/SubmitButton";
import SvgIcon from "../Icon/SvgIcon";

const FilterBoxWrapper = styled.div`
  margin-bottom: 4rem;
`;

const FilterBox = () => {
  const feedContext = useContext(FeedContext);
  const { filters, filterModal, handleFilterModal, handleQuit } = feedContext;
  const renderFilterOptions = (filters) => {
    return filters.map((filter, idx) => (
      <SelectWithIconButton
        key={idx}
        primarylight="true"
        righticon="true"
        size="small"
        icon={<SvgIcon src={downArrow} />}
        onClick={handleFilterModal(idx)}
      >
        {filter.label}
      </SelectWithIconButton>
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
          <SubmitButton
            inline
            secondary="true"
            onClick={handleQuit}
            style={{ fontWeight: "normal" }}
          >
            Quit filters
          </SubmitButton>
          <SubmitButton
            inline
            primary="true"
            onClick={handleFilterModal(null)}
            style={{ fontWeight: "normal" }}
          >
            Apply filters
          </SubmitButton>
        </div>
      </Modal>
    </FilterBoxWrapper>
  );
};

export default FilterBox;
