import React from "react";
import { NavBar } from "antd-mobile";
import { Link } from "react-router-dom";
import styled from "styled-components";

// ICONS
import SvgIcon from "./Icon/SvgIcon";
import menu from "assets/icons/menu.svg";

import logo from "assets/logo.svg";
import Logo from "./Logo";

const BrandLink = styled(Link)`
  display: inline-flex;
`;

export default ({ onMenuClick, ...props }) => {
  return (
    <div className="header" {...props}>
      <NavBar
        mode="light"
        leftContent={
          <BrandLink to="/">
            <Logo src={logo} alt="Fight Pandemics logo" />
          </BrandLink>
        }
        rightContent={
          <SvgIcon
            src={menu}
            style={{ fontSize: 24, cursor: "pointer" }}
            onClick={onMenuClick}
          />
        }
      />
    </div>
  );
};
