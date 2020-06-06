// Core
import React, { useContext } from "react";
import styled from "styled-components";
// Antd
import { Drawer } from "antd";

// Local
import FilterAccordion from "./FilterAccordion";
import SubmitButton from "components/Button/SubmitButton";
import { FeedContext } from "pages/Feed";

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
        i {
          height: ${theme.typography.size.medium};;
          width: ${theme.typography.size.medium};;
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
  .svgicon-share-mylocation-size{
    font-size: ${theme.typography.size.small};
  }
  .confirm-buttons {
    .am-button {
      font-size: ${theme.typography.size.large};
      padding: 0 1rem;
      &.close-button {
        flex: 0 0 auto;
      }
      &.ok-button {
        flex: 0 0 13rem;
      }
    }
  }
`;

const FiltersSidebar = () => {
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
      width={290}
    >
      <div>
        <button onClick={handleOnClose}>
          <BackIcon />
        </button>
        <FilterAccordion />
      </div>
      <div
        className="confirm-buttons"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "2rem 0",
        }}
      >
        <SubmitButton
          className="close-button"
          inline
          tertiary="true"
          onClick={handleQuit}
          style={{ fontWeight: "normal" }}
        >
          Quit filters
        </SubmitButton>
        <SubmitButton
          className="ok-button"
          inline
          primary="true"
          onClick={handleOnClose}
          style={{ fontWeight: "normal" }}
        >
          View result
        </SubmitButton>
      </div>
    </DrawerWrapper>
  );
};

export default FiltersSidebar;
