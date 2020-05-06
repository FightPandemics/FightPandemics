import React from "react";
import { NavBar } from "antd-mobile";
import { Link } from "react-router-dom";

import logo from "~/assets/logo.svg";
import Logo from "~/components/Logo";
import Main from "./Main";

const NavbarStyles = {
  position: 'absolute',
  top: "1rem",
  left: "2rem",
  zIndex: "10",
  backgroundColor: "transparent"
}

const LogoLayout = (props) => {
  return (
    <>
      <div className="header">
        <NavBar mode="light" style={NavbarStyles}>
          <Link to="/">
            <Logo src={logo} alt="Fight Pandemics logo" />
          </Link>
        </NavBar>
      </div>
      <div>
        <props.component {...props} />
      </div>
    </>
  );
};

export default LogoLayout;
