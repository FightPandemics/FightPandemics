import styled from "styled-components";
import { Avatar } from "antd";

import { ROYAL_BLUE, SELAGO } from "constants/colors";

const TextAvatar = styled(Avatar)`
  background:  ${SELAGO};
  border: 1px solid ${ROYAL_BLUE};
  border-radius: 50%;
  color: ${ROYAL_BLUE};
  display: block;
  height: 4rem;
  line-height: 4rem;
  margin-right: 0.7rem;
  width: 4rem;

  span {
    color: ${ROYAL_BLUE};
  }
`;

export default TextAvatar;
