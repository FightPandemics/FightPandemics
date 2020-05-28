import styled from "styled-components";
import { Select } from "antd";
import { theme } from "constants/theme";

const { colors, typography } = theme;

const StyledSelector = styled(Select)`
  display: inline-flex;
  margin: 0.5rem;

  .ant-select-selector {
    min-width: 11rem;
    height: 2.25rem !important;
    border: 0.1rem solid ${colors.royalBlue} !important;
    border-radius: 0.5rem !important;
    align-items: center;
    text-align: center;
    padding-right: 0 5px;

    span.ant-select-selection-item {
      font-family: ${typography.font.family.body};
      font-style: normal;
      font-size: 1.1rem;
      color: ${colors.royalBlue};
    }
  }
`;

export default StyledSelector;
