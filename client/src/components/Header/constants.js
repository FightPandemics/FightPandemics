import styled from "styled-components";
import SvgIcon from "components/Icon/SvgIcon";
import { mq } from "../../constants/theme";

export const CustomSvgIcon = styled(SvgIcon)`
  margin-right: 10px;
  &.plus-icon {
    width: 1.6rem;
  }
`;

export const InboxIcon = styled.span`
  display: ${(props) => (props.mobile ? "none" : "initial")};
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: ${(props) => (props.mobile ? "block" : "none")};
    position: absolute;
    top: 0.678em;
    right: 3.3em;
    cursor: pointer;
    img {
      height: 2.3rem;
    }
  }
`;

export const MENU_STATE = {
  CLOSED: "CLOSED",
  SETTINGS: "SETTINGS",
  ACCOUNTS: "ACCOUNTS",
};
