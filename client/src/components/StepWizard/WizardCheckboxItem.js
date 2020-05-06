import { Checkbox } from "antd-mobile";
import styled from "styled-components";
import { theme } from "../../constants/theme";

const CheckboxItem = Checkbox.CheckboxItem;

export const WizardCheckboxWrapper = styled.div`
  margin: 4rem 0;
  padding-left: 4rem;
`;

export const WizardCheckboxItem = styled(CheckboxItem)`
  font-family: ${theme.typography.font.family.display};
  font-size: ${theme.typography.size.large};
  .am-list-line {
    &:after {
      background-color: unset !important;
    }
  }

  .am-checkbox-inner {
    border-radius: 0.5px;
    border: 0.1rem solid #646464;
    &:after {
      top: 0;
      height: 1.3rem;
      width: 0.7rem;
      border-style: solid;
      border-width: 0 0.2rem 0.2rem 0;
    }
  }

  .am-checkbox.am-checkbox-checked .am-checkbox-inner {
    border-color: ${theme.colors.royalBlue};
    background: ${theme.colors.royalBlue};
  }
`;
