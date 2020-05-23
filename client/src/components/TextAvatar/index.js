import styled from "styled-components";
import { Avatar } from "antd";
import { theme } from "constants/theme";

const { royalBlue, selago } = theme.colors;

const TextAvatar = styled(Avatar)`
  background: ${selago};
  border: 1px solid ${royalBlue};
  border-radius: 50%;
  color: ${royalBlue};
  display: block;
  height: 4rem;
  line-height: 4rem;
  margin-right: 0.7rem;
  width: 4rem;

  span {
    color: ${royalBlue};
  }
`;

export default TextAvatar;
