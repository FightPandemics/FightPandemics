import { Divider as ExtDivider } from "antd";
import styled from "styled-components";
import { List, Button } from "antd-mobile";

import { theme } from "constants/theme";
import SvgIcon from "components/Icon/SvgIcon";

const { tropicalBlue, white } = theme.colors;

export const MenuContainer = styled.div`
  width: 63vw !important;
  overflow: hidden;
  @media screen and (min-width: 1024px) {
    width: 20vw !important;
  }
`;

export const CloseNav = styled(Button).attrs(() => ({
  inline: true,
  icon: "cross",
  size: "lg",
}))`
  background: unset;
  border-width: 0 !important;
  border-radius: 0;
  color: ${white};
  cursor: pointer;
  font-size: 2rem;
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  z-index: 300;

  &.am-button-active {
    background: none;
    color: ${white};
  }
  &::before {
    display: none;
  }

  .am-icon {
    stroke-width: 0.2rem;
    stroke: ${white};
  }
`;

export const NavList = styled(List)`
  & .am-list-body {
    background: unset;
    border-width: 0 !important;
    position: absolute;
    width: 100%;
    & div:not(:last-child) {
      & .am-list-line {
        border-bottom: 0;
      }
    }
    &::after {
      height: 0px !important;
    }

    &::before {
      height: 0px !important;
    }
  }
`;

export const Divider = styled(ExtDivider)`
  background-color: ${white};
`;

export const NavItem = styled(List.Item)`
  background: unset;
  padding-left: 2.1rem;
  height: ${(props) => props.height ?? "inherit"};
  & .am-list-line {
    border-bottom: 0;
    &:after {
      height: 0 !important;
    }
    & .am-list-content {
      color: ${white};
      cursor: pointer;
      font-family: "Poppins", sans-serif;
      font-size: ${({ size }) => (size === "small" ? "1.2rem" : "1.8rem")};
      font-weight: ${({ size }) => (size === "big" ? "600" : "400")};
      padding: 0 1rem 0 0;
    }
  }

  &.am-list-item-active {
    background: ${tropicalBlue};
  }
`;

export const CustomSvgIcon = styled(SvgIcon)`
  margin-right: 10px;
  filter: brightness(2);
  &.check-icon {
    position: absolute;
    right: 0;
    top: 1.2rem;
  }
`;
