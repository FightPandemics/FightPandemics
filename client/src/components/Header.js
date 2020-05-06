import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Menu as MenuIcon } from "@material-ui/icons";
import { NavBar } from "antd-mobile";
import React from "react";
import logo from "../assets/logo.svg";
import styled from "styled-components";

// import { Menu as MenuIcon } from "grommet-icons";





const BrandLink = styled(Link)`
  display: inline-flex;
`;

const MenuToggle = styled(MenuIcon)`
  cursor: pointer;
  &:hover {
  }
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
                    <MenuToggle
                        style={{ fontSize: 24 }}
                        color="primary"
                        onClick={onMenuClick}
                    />
                }
            />
        </div>
    );
};
