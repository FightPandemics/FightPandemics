// Core
import React, { useContext } from "react";
import styled from "styled-components";
import { Drawer } from "antd";
import { useTranslation } from "react-i18next";

// Local
import FilterAccordion from "./FilterAccordion";
import SubmitButton from "components/Button/SubmitButton";
import { FeedContext } from "pages/Feed";
import GTM from "constants/gtm-tags";

// Icons
import { ReactComponent as BackIcon } from "assets/icons/back.svg";

// Constants
import { theme } from "constants/theme";
const { royalBlue } = theme.colors;
const DrawerWrapper = styled(Drawer)`
  .ant-drawer-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;
    button {
      border: none;
      background: transparent;
      cursor: pointer;
      svg {
        path {
          fill: ${royalBlue};
        }
      }
    }
  }
  .am-accordion {
    border: none;
    .am-accordion-item {
      margin: 0;
      &.filter-4 {
        display: none;
      }
      .am-accordion-header {
        font-family: ${theme.typography.font.family.display};
        font-size: ${theme.typography.size.large};
        font-weight: bold;
        padding: 0;
        height: 4.4rem;
        i {
          height: ${theme.typography.size.medium};
          width: ${theme.typography.size.medium};
        }
      }
      .am-accordion-content-box {
        padding: 0;
      }
      .am-tag-normal {
        padding: 0 0.7rem;
      }
      .location-search {
        color: ${royalBlue};
      }
    }
  }
  .svgicon-share-mylocation-size {
    font-size: ${theme.typography.size.small};
  }
  .confirm-buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .am-button {
      font-size: ${theme.typography.size.large};
      padding: 0 1rem;
      margin: 0.5rem 0;
      font-weight: normal;
      &.close-button {
        flex: 0 0 auto;
      }
      &.ok-button {
        flex: 0 0 auto;
      }
    }
  }
`;

const FiltersSidebar = ({ gtmPrefix, locationOnly }) => {
  const { t } = useTranslation();
  const feedContext = useContext(FeedContext);
  const { handleQuit, handleOnClose, showFilters } = feedContext;

  return (
    <DrawerWrapper
      placement="right"
      closable={false}
      mask={false}
      onClose={handleOnClose}
      visible={showFilters}
      getContainer={false}
      style={{ position: "absolute" }}
      width="29rem"
    >
      <div>
        <button onClick={handleOnClose}>
          <BackIcon />
        </button>
        <FilterAccordion locationOnly={locationOnly} gtmPrefix={gtmPrefix} />
      </div>
      <div className="confirm-buttons">
        <SubmitButton
          className="close-button"
          inline
          tertiary="true"
          onClick={handleQuit}
          id={gtmPrefix + GTM.post.filterPost + GTM.post.quitFilters}
        >
          {t("feed.quit")}
        </SubmitButton>
        <SubmitButton
          className="ok-button"
          inline
          primary="true"
          onClick={handleOnClose}
          id={gtmPrefix + GTM.post.filterPost + GTM.post.viewResults}
        >
          {t("feed.apply")}
        </SubmitButton>
      </div>
    </DrawerWrapper>
  );
};

export default FiltersSidebar;
