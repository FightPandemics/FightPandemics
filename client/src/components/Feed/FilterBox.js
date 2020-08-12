import React, { useContext } from "react";
import styled from "styled-components";
import { Modal } from "antd-mobile";
import { useTranslation } from "react-i18next";

import SubmitButton from "components/Button/SubmitButton";
import TextLabel from "components/Typography/TextLabel";
import SelectWithIconButton from "components/Button/SelectWithIconButton";
import FilterAccordion from "./FilterAccordion";
import { FeedContext } from "pages/Feed";
import { theme, mq } from "constants/theme";
import GTM from "constants/gtm-tags";
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

const gtmTagsMap = {
  lookingFor: GTM.post.requestOffer,
  type: GTM.post.type,
  location: GTM.post.location,
  providers: GTM.post.providers,
};
const FilterBox = ({ gtmPrefix }) => {
  const { t } = useTranslation();
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
        value={filter.label}
      >
        {t(`feed.filters.labels.${filter.label}`)}
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
        {t("feed.filterBy")}
      </TextLabel>
      {renderFilterOptions(filters)}
      <ModalWrapper
        popup
        wrapClassName="feed-filter-modal-wrap"
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
            {t("feed.quit")}
          </SubmitButton>
          <SubmitButton
            inline
            primary="true"
            onClick={handleOnClose}
            style={{ fontWeight: "normal" }}
            id={gtmPrefix + GTM.post.filterPost + GTM.post.viewResults}
          >
            {t("feed.apply")}
          </SubmitButton>
        </div>
      </ModalWrapper>
    </FilterBoxWrapper>
  );
};

export default FilterBox;
