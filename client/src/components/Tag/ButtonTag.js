// Core
import React from "react";
import styled from "styled-components";

// Antd
import { Button } from "antd-mobile";

// Icons
import { ReactComponent as CloseIcon } from "assets/icons/close-btn.svg";

// Constants
import { mq, theme } from "constants/theme";
const { button, typography } = theme;

const ButtonWrapper = styled(Button)`
  ${button.secondary}
  align-items: center;
  border-radius: 4rem;
  display: inline-flex;
  font-size: ${typography.size.xsmall};
  height: 2.5rem;
  margin: 0.5rem 0.3rem;
  padding: 0 1rem;
  position: relative;
  text-align: center;

  ::before {
    border: none !important;
  }

  .am-modal .am-accordion &::before {
    content: none;
  }
  &.tag-closable {
    svg {
      display: block;
    }
  }
  &.tag-primary {
    ${button.primary}
    &.tag-selected,
    &:hover {
      ${button.secondary}
    }
  }
  svg {
    display: none;
    height: 1.5rem;
    width: 1.5rem;
    path {
      stroke: ${button.secondary.color};
    }
  }
  &.tag-selected {
    ${button.primary}
    &:hover {
      span {
        color: ${button.primary.color};
      }
    }
    svg {
      path {
        stroke: ${button.primary.color};
      }
    }
  }
  &:hover {
    @media screen and (max-width: ${mq.tablet.narrow.maxWidth}) {
      span {
        color: ${button.secondary.color};
      }
    }
    @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
      ${button.primary}
      svg {
        path {
          stroke: ${button.primary.color};
        }
      }
    }
  }
`;

const ButtonTag = (props) => {
  return (
    <ButtonWrapper {...props}>
      {props.children}
      <CloseIcon />
    </ButtonWrapper>
  );
};

export default ButtonTag;
