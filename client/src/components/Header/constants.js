import { Avatar } from "antd";
import styled from "styled-components";
import { theme } from "constants/theme";
import SvgIcon from "components/Icon/SvgIcon";

const { royalBlue, selago } = theme.colors;

export const CustomAvatar = styled(Avatar)`
  color: #425af2;
  border: ${({ src }) => !src && `1px solid ${royalBlue}`};
  background: ${selago};
  font-size: 10px;
  margin-right: 10px;
`;

export const CustomSvgIcon = styled(SvgIcon)`
  margin-right: 10px;
`;

export const MENU_STATE = {
  CLOSED: "CLOSED",
  SETTINGS: "SETTINGS",
  ACCOUNTS: "ACCOUNTS",
};
