import styled from "styled-components";
import React from "react";
import {Checkbox} from "antd-mobile";
import {theme, mq} from "constants/theme";

const {white, lightGray, royalBlue, black} = theme.colors;

export const WizardCheckboxWrapper = styled.div`
  margin: 4rem auto;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    height: 21rem;
    width: 40rem;
  }
`;

const CheckboxItemStyles = styled.div`
  font-family: ${theme.typography.font.family.display};
  font-size: ${theme.typography.size.large};
  background-color: ${white};
  padding: 2rem;
  margin-bottom: 1rem;
  width: 100%;
  cursor: pointer;

  .am-list-line {
    &:after {
      background-color: unset !important;
    }
  } 
  .am-checkbox-input {
    cursor: pointer; 
  }
  .am-checkbox-inner {
    border-radius: 0.5px;
    border: 0.1rem solid ${lightGray};

    &:after {
      top: 0;
      height: 1.3rem;
      width: 0.7rem;
    }
  }
   > .text {
   color: ${black};
    flex-grow: 1;
    margin-left: 2rem;
  }

  .am-checkbox.am-checkbox-checked .am-checkbox-inner {
    border-color: ${royalBlue};
    background: ${royalBlue};
  }

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    border: 0.1rem solid ${lightGray};
    border-radius: 5px;
    height: 6rem;
  }
`;

export const WizardCheckboxItem = ({text, checked, onChange, ...props}) => {
    return (
        <CheckboxItemStyles
            onClick={onChange}
            className={checked && "selected"}
            {...props}
        >
            <Checkbox checked={checked}/>
            <span className="text">{text}</span>
        </CheckboxItemStyles>
    );
};
