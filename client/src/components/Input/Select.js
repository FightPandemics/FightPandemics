import styled from "styled-components";
import { Select } from "antd";

import { theme, mq } from "constants/theme";

const StyledSelect = styled(Select)`
  border-radius: 0.3rem;
  border: 1px solid ${theme.colors.royalBlue};
  color: ${theme.colors.royalBlue};
  display: block;
  margin-top: 2rem;
  width: 42%;
  @media screen and (max-width: ${mq.tablet.narrow.maxWidth}) {
    width: 50%;
  }
  .ant-select-selector {
    border: none;
    border-radius: 0.5rem;
  }
  .ant-select-arrow {
    color: ${theme.colors.royalBlue};
  }
`;

export default StyledSelect;
