import React, { useContext } from "react";
import styled from "styled-components";
import { Modal } from "antd-mobile";
import { useTranslation } from "react-i18next";

import SubmitButton from "components/Button/SubmitButton";
import SelectWithIconButton from "components/Button/SelectWithIconButton";
import FilterAccordion from "./FilterAccordion";
import { FeedContext } from "pages/Feed";
import { theme, mq } from "constants/theme";
import GTM from "constants/gtm-tags";
import SvgIcon from "components/Icon/SvgIcon";
import filtersIcon from "assets/icons/filters.svg";
import ButtonTag from "../Tag/ButtonTag.js";
import { getOptionText } from "components/Feed/utils";

const FilterBoxWrapper = styled.div`
  margin-bottom: 4rem;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
  }
`;

const ModalWrapper = styled(Modal)`
  .filter-4 .am-button {
    padding: 0 1rem;
  }
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: none;
  }
`;

const StyledSelectWithIconButton = styled(SelectWithIconButton)`
 &:active, &:focus, &:hover {
    img {
      filter: brightness(10);
    }
`;

const StyledSubmitButton = styled(SubmitButton)`
  font-size: 1.7rem;
`;

const gtmTagsMap = {
  lookingFor: GTM.post.requestOffer,
  type: GTM.post.type,
  location: GTM.post.location,
  providers: GTM.post.providers,
};

const FilterBox = ({ gtmPrefix, locationOnly }) => {
  const { t } = useTranslation();
  const feedContext = useContext(FeedContext);
  const {
    filters,
    handleOnClose,
    filterModal,
    handleFilterModal,
    handleOption,
    handleQuit,
    selectedOptions,
  } = feedContext;
  const renderFilterOptions = (filter) => {
    return (
      <StyledSelectWithIconButton
        onClick={handleFilterModal}
        primarylight="true"
        righticon="true"
        size="small"
        icon={<SvgIcon src={filtersIcon} />}
        onClick={handleFilterModal}
        id={gtmPrefix + gtmTagsMap[filter.label]}
        value={filter.label}
      >
        {t(`feed.filterBy`)}
      </StyledSelectWithIconButton>
    );
  };
  return (
    <FilterBoxWrapper className="filter-box">
      {renderFilterOptions(filters)}
      <div>
        {Object.keys(selectedOptions).map((filter) =>
          selectedOptions[filter].map((option, idx) => (
            <ButtonTag
              key={idx}
              className="tag-closable"
              onClick={handleOption(filter, option)}
            >
              {t(
                getOptionText(
                  filters,
                  filter,
                  option.value ? option.value : option,
                ),
              )}
            </ButtonTag>
          )),
        )}
      </div>
      <ModalWrapper
        popup
        wrapClassName="feed-filter-modal-wrap"
        visible={filterModal}
        onClose={handleOnClose}
        animationType="slide-up"
      >
        <FilterAccordion locationOnly={locationOnly} gtmPrefix={gtmPrefix} />
        <div
          className="confirm-buttons"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            padding: "1rem 0",
          }}
        >
          <StyledSubmitButton
            inline
            secondary="true"
            onClick={handleQuit}
            style={{ fontWeight: "normal" }}
            id={gtmPrefix + GTM.post.filterPost + GTM.post.quitFilters}
          >
            {t("feed.quit")}
          </StyledSubmitButton>
          <StyledSubmitButton
            inline
            primary="true"
            onClick={handleOnClose}
            style={{ fontWeight: "normal" }}
            id={gtmPrefix + GTM.post.filterPost + GTM.post.viewResults}
          >
            {t("feed.apply")}
          </StyledSubmitButton>
        </div>
      </ModalWrapper>
    </FilterBoxWrapper>
  );
};

export default FilterBox;
