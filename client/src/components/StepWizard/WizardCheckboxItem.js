import styled from "styled-components";
import { Checkbox } from "antd-mobile";
import { theme } from "constants/theme";

const { white, lightGray, royalBlue } = theme.colors;

const CheckboxItem = Checkbox.CheckboxItem;

export const WizardCheckboxWrapper = styled.div`
  margin: 4rem 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
`;

export const WizardCheckboxItem = styled(CheckboxItem)`
  font-family: ${theme.typography.font.family.display};
  font-size: ${theme.typography.size.large};
  border: 0.1rem solid ${lightGray};
  border-radius: 5px;
  background-color: ${white};
  margin-bottom: 1em;
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
`;
