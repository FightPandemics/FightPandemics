// Core
import React from "react";
import styled from "styled-components";

// Antd
import { Button } from "antd-mobile";

// Icons
import { ReactComponent as CloseIcon } from "assets/icons/close-btn.svg";

// Constants
import { mq, theme } from "constants/theme";

const ButtonWrapper = styled(Button)`
  ${theme.button.secondary}
  align-items: center;
  border-radius: 4rem;
  display: inline-flex;
  font-size: ${theme.typography.size.xsmall};
  height: 2.5rem;
  margin: 0.5rem 0.3rem;
  padding: 0 1rem;
  position: relative;
  text-align: center;
  .am-modal .am-accordion &::before {
    content: none;
  }
  &.tag-closable {
    svg {
      display: block;
    }
  }
  &.tag-primary {
    ${theme.button.primary}
    &.tag-selected,
    &:hover {
      ${theme.button.secondary}
    }
  }
  svg {
    display: none;
    height: 1.5rem;
    width: 1.5rem;
    path {
      stroke: ${theme.button.secondary.color};
    }
  }
  &.tag-selected {
    ${theme.button.primary}
    &:hover {
      span {
        color: ${theme.button.primary.color};
      }
    }
    svg {
      path {
        stroke: ${theme.button.primary.color};
      }
    }
  }
  &:hover {
    @media screen and (max-width: ${mq.tablet.narrow.maxWidth}) {
      span {
        color: ${theme.button.secondary.color};
      }
    }
    @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
      ${theme.button.primary}
      svg {
        path {
          stroke: ${theme.button.primary.color};
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
