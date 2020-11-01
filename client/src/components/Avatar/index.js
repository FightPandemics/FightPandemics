import styled from "styled-components";
import { Avatar as ExtAvatar } from "antd";
import { theme } from "constants/theme";

const { royalBlue, selago } = theme.colors;

export const Avatar = styled(ExtAvatar)`
  color: #425af2;
  border: ${({ src, type }) =>
    !src && type !== "mobile" && `1px solid ${royalBlue}`};
  background: ${selago};
  font-size: 10px;
  margin-right: 10px;
`;
