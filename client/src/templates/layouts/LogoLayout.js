import React from "react";
import { NavBar } from "antd-mobile";
import { Link } from "react-router-dom";

import logo from "~/assets/logo.svg";
import Logo from "~/components/Logo";
import Main from "./Main";

const LogoLayout = (props) => {
  return (
    <>
      <div className="header" style={{ marginTop: 8 }}>
        <NavBar mode="light">
          <Link to="/">
            <Logo src={logo} alt="Fight Pandemics logo" />
          </Link>
        </NavBar>
      </div>
      <Main>
        <props.component {...props} />
      </Main>
    </>
  );
};

export default LogoLayout;
