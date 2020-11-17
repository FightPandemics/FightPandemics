import styled from "styled-components";
import SvgIcon from "components/Icon/SvgIcon";

export const CustomSvgIcon = styled(SvgIcon)`
  margin-right: 10px;
  &.plus-icon {
    width: 1.6rem;
  }
`;

export const MENU_STATE = {
  CLOSED: "CLOSED",
  SETTINGS: "SETTINGS",
  ACCOUNTS: "ACCOUNTS",
};
