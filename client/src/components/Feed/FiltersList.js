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
  background-color: ${WHITE};
  border: 0.1rem solid ${ROYAL_BLUE};
  border-radius: 4rem;
  color: ${ROYAL_BLUE};
  display: inline-flex;
  font-size: ${theme.typography.size.xsmall};
  height: 25px;
  margin: 0.5rem 0.3rem;
  padding: 0 1rem;
  position: relative;
  text-align: center;

  svg {
    height: 15px;
    width: 15px;
  }

  path {
    stroke: ${ROYAL_BLUE};
  }

  &:hover {
    background-color: ${ROYAL_BLUE};
    color: ${WHITE};

    svg {
      path {
        stroke: ${WHITE};
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
