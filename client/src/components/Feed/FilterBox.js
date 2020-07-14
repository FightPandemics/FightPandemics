import React, { useContext } from "react";
import styled from "styled-components";
import { Modal } from "antd-mobile";
import SubmitButton from "components/Button/SubmitButton";
import TextLabel from "components/Typography/TextLabel";
import { theme, mq } from "constants/theme";
import GTM from "constants/gtm-tags";

import SelectWithIconButton from "components/Button/SelectWithIconButton";
import FilterAccordion from "./FilterAccordion";
import { FeedContext } from "pages/Feed";
import { DARK_GRAY } from "constants/colors";
import SvgIcon from "components/Icon/SvgIcon";
import downArrow from "assets/icons/down-arrow.svg";

const FilterBoxWrapper = styled.div`
  margin-bottom: 4rem;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
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

const gtmTagsMap = {
  "offer or request help": GTM.post.requestOffer,
  type: GTM.post.type,
  location: GTM.post.location,
  providers: GTM.post.providers,
};
const FilterBox = ({ gtmPrefix }) => {
  const feedContext = useContext(FeedContext);
  const {
    filters,
    handleOnClose,
    filterModal,
    handleFilterModal,
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
        onClick={handleFilterModal}
        id={gtmPrefix + gtmTagsMap[filter.label]}
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
        visible={filterModal}
        onClose={handleOnClose}
        animationType="slide-up"
      >
        <FilterAccordion gtmPrefix={gtmPrefix} />
        <div
          className="confirm-buttons"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            padding: "1rem 0",
          }}
        >
          <SubmitButton
            inline
            secondary="true"
            onClick={handleQuit}
            style={{ fontWeight: "normal" }}
            id={gtmPrefix + GTM.post.filterPost + GTM.post.quitFilters}
          >
            Quit filters
          </SubmitButton>
          <SubmitButton
            inline
            primary="true"
            onClick={handleOnClose}
            style={{ fontWeight: "normal" }}
            id={gtmPrefix + GTM.post.filterPost + GTM.post.viewResults}
          >
            Apply filters
          </SubmitButton>
        </div>
      </ModalWrapper>
    </FilterBoxWrapper>
  );
};

export default FilterBox;
