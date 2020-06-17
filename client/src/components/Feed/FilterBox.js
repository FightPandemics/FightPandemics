import React, { useContext } from "react";
import styled from "styled-components";
import { Modal } from "antd-mobile";
import SubmitButton from "components/Button/SubmitButton";
import TextLabel from "components/Typography/TextLabel";
import { theme, mq } from "constants/theme";

import SelectWithIconButton from "components/Button/SelectWithIconButton";
import FilterAccordion from "./FilterAccordion";
import { FeedContext } from "pages/Feed";
import { DARK_GRAY } from "constants/colors";
import SvgIcon from "components/Icon/SvgIcon";
import downArrow from "assets/icons/down-arrow.svg";

const FilterBoxWrapper = styled.div`
  margin-bottom: 4rem;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    div:first-child {
      display: none;
    }
  }
`;

const ModalWrapper = styled(Modal)`
  .filter-4 .am-button {
    padding: 0 4.2rem;
  }
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: none;
  }
`;
function capitalizeFirstLetter(header) {
  // capitalize first letter and show providers if  header is fromWhom
  if (header === "fromWhom") {
    header = "providers";
  }
  return header.charAt(0).toUpperCase() + header.slice(1);
}
const FilterBox = () => {
  const feedContext = useContext(FeedContext);
  const {
    filters,
    handleShowFilters,
    handleOnClose,
    showFilters,
    handleQuit,
  } = feedContext;
  const renderFilterOptions = (filters) => {
    return filters.map((filter, idx) => (
      <SelectWithIconButton
        key={idx}
        primarylight="true"
        righticon="true"
        size="small"
        icon={<SvgIcon src={downArrow} />}
        onClick={handleShowFilters}
      >
        {capitalizeFirstLetter(filter.label)}
      </SelectWithIconButton>
    ));
  };
  return (
    <FilterBoxWrapper className="filter-box">
      <TextLabel
        block="true"
        color={DARK_GRAY}
        size={theme.typography.size.medium}
      >
        Filter by
      </TextLabel>
      {renderFilterOptions(filters)}
      <ModalWrapper
        popup
        visible={showFilters}
        onClose={handleOnClose}
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
            onClick={handleOnClose}
            style={{ fontWeight: "normal" }}
          >
            Apply filters
          </SubmitButton>
        </div>
      </ModalWrapper>
    </FilterBoxWrapper>
  );
};

export default FilterBox;
