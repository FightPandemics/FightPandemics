// Core
import React, { useContext } from "react";
import styled from "styled-components";

// Antd 
import { Button } from "antd-mobile";

// Svg
import { ReactComponent as CloseIcon } from "assets/icons/close-btn.svg";

// Local
import { FeedContext } from "pages/Feed.js";

// Constants
import { theme } from "constants/theme";
import { ROYAL_BLUE, WHITE } from "constants/colors";

const TagButton = styled(Button)`
  align-items: center;
  background-color: ${theme.button.secondary.backgroundColor};
  border: ${theme.button.secondary.border};
  border-radius: 4rem;
  color: ${theme.button.secondary.color};
  display: inline-flex;
  font-size: ${theme.typography.size.xsmall};
  height: 2.5rem;
  margin: 0.5rem 0.3rem;
  padding: 0 1rem;
  position: relative;
  text-align: center;

  svg {
    height: 1.5rem;
    width: 1.5rem;

    path {
      stroke: ${theme.button.secondary.color};
    }
  }

  &:hover {
    background-color: ${theme.button.primary.backgroundColor};
    color: ${theme.button.primary.color};

    svg {
      path {
        stroke: ${theme.button.primary.color};
      }
    }
  }
`;

const FiltersList = () => {
  const feedContext = useContext(FeedContext);
  const { handleOption, selectedOptions } = feedContext;

  return (
    <div>
      {
        Object.keys(selectedOptions).map((filter) => (
          selectedOptions[filter].map((option, idx) => (
            <TagButton
              key={idx}
              onClick={handleOption(filter, option)}
            >
              {option}
              <CloseIcon />
            </TagButton>
          ))
        ))
      }
    </div>
  );
};

export default FiltersList;
