import styled from "styled-components";
import { Checkbox } from "antd-mobile";
import { theme, mq } from "constants/theme";

const { white, lightGray, royalBlue } = theme.colors;

const CheckboxItem = Checkbox.CheckboxItem;

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

export const WizardCheckboxItem = styled(CheckboxItem)`
  font-family: ${theme.typography.font.family.display};
  font-size: ${theme.typography.size.large};
  background-color: ${white};
  margin-bottom: 1rem;
  width: 100%;

  .am-list-line {
    &:after {
      background-color: unset !important;
    }
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
