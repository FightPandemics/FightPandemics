import { Link } from "react-router-dom";
import Logo from "~/components/Logo";
import Main from "./Main";
import { NavBar } from "antd-mobile";
import React from "react";
import logo from "~/assets/logo.svg";

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
