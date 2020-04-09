import React from "react";
import { NavBar, Icon } from "antd-mobile";
import { Link } from "react-router-dom";
import { Menu as MenuIcon } from "@material-ui/icons";
// import { Menu as MenuIcon } from "grommet-icons";
import styled from "styled-components";

import logo from "../assets/logo.svg";
import Logo from "./Logo";
import { theme } from "../constants/theme";

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
          <MenuIcon
            style={{ fontSize: 24 }}
            color="primary"
            onClick={onMenuClick}
          />
        }
      />
    </div>
  );
};
