import React from "react";
import { NavBar } from "antd-mobile";
import { Link } from "react-router-dom";
import styled from "styled-components";

import logo from "~/assets/logo.svg";
import Logo from "~/components/Logo";

import { theme, mq } from "../../constants/theme";


const NavbarStyles = {
  position: 'absolute',
  top: "0",
  left: "0",
  zIndex: "10",
  width: "100%",
  backgroundColor: "transparent"
}

const LogoContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 2rem;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    left: 48%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
`;


const LogoLayout = (props) => {
  return (
    <>
      <div className="header">
        <NavBar mode="light" style={NavbarStyles}>
          <LogoContainer>
            <Link to="/">
              <Logo src={logo} alt="Fight Pandemics logo" />
            </Link>
          </LogoContainer>
        </NavBar>
      </div>
      <div>
        <props.component {...props} />
      </div>
    </>
  );
};

export default LogoLayout;
