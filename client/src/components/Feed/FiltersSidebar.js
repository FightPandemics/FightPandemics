// Core
import React, { useContext } from "react";
import styled from "styled-components";

// Antd 
import { Drawer } from 'antd';
import { Button } from "antd-mobile";

// Local
import FilterAccordion from "./FilterAccordion";
import SubmitButton from "../../components/Button/SubmitButton";
import { FeedContext } from "../../pages/Feed";

// Constants
import { theme } from "../../constants/theme";
import { ROYAL_BLUE } from "../../constants/colors";

// Icons
import { ReactComponent as BackIcon } from "../../assets/icons/back.svg";

const DrawerWrapper = styled(Drawer)`
  .ant-drawer-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;

    button {
      border: none;
      background: transparent;
      cursor: pointer;

      svg {
        path {
          fill: ${ROYAL_BLUE};
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
          height: 14px;
          width: 14px;
        }
      }

      .location-search {
        color: ${ROYAL_BLUE};
      }
    }
  }

  .am-button {
    font-size: ${theme.typography.size.large};
    padding: 0;

    &.close-button {
      border: none;
      color: ${ROYAL_BLUE};
    }

    &.ok-button {
      flex: 0 0 140px;
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
      style={{ position: 'absolute' }}
      width={290}
    >
      <div>
        <button
          onClick={handleOnClose}>
          <BackIcon />
        </button>
        <FilterAccordion />
      </div>
      <div
        className="confirm-buttons"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "2rem 0",
        }}
      >
        <Button
          className="close-button"
          inline
          secondary="true"
          onClick={handleQuit}
          style={{ fontWeight: "normal" }}
        >
          Quit filters
        </Button>
        <SubmitButton
          className="ok-button"
          inline
          primary="true"
          onClick={handleOnClose}
          style={{ fontWeight: "normal" }}
        >
          View Results
        </SubmitButton>
      </div>
    </DrawerWrapper>
  );
};

export default FiltersSidebar;
