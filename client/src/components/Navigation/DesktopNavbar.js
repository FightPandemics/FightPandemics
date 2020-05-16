import React from "react";
import styled from "styled-components";

import { NavLink } from "react-router-dom";
import Logo from "components/Logo";

import logo from "assets/logo.svg";
import { theme } from "constants/theme";

const { colors, typography } = theme;
const { large } = typography.size;

const NavBar = styled.div`
  align-items: center;
  background-color: #fff;
  display: flex;
  height: 7rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
`;

const HeaderContainer = styled.div`
  margin-right: auto;
  margin-left: 3rem;
`;

const NavLinks = styled.div`
  align-self: center;
  ul {
    list-style-type: none;
    display: flex;
    margin-bottom: 0rem;
    margin-right: 2rem;
    .registerBtn {
      color: ${colors.royalBlue};
      border: 1px solid ${colors.royalBlue};
      border-radius: 2rem;
      padding: 0 0.8rem;
      margin-bottom: 0.2rem;
      align-self: center;
      .registerLink {
        color: ${colors.primary};
      }
      .registerLink:hover {
        font-weight: 500;
      }
    }
    li {
      padding: 1rem 1.3rem;
      padding-bottom: 1.3rem;
      font-size: ${large};
      color: #282828;
      a:not(.registerLink) {
        color: #282828;
        text-decoration: none;
        padding: 0 0.6rem 1rem 0.6rem;
        transition: all 0.2s;
        border-bottom: 3px solid transparent;
      }
      a:hover:not(.registerLink) {
        font-weight: 600;
        color: ${colors.royalBlue};
        border-bottom: 3px solid ${colors.royalBlue};
      }
    }
  }
`;

const activeStyles = {
  fontWeight: "600",
  color: "#425AF2",
};

const DesktopNavbar = (props) => {
  const { isAuthenticated } = props;
  return (
    <NavBar>
      <HeaderContainer>
        <NavLink to="/">
          <Logo src={logo} alt="Fight Pandemics logo" />
        </NavLink>
      </HeaderContainer>
      <NavLinks>
        <ul>
          <li>
            <NavLink activeStyle={activeStyles} to="/feed">
              Feed
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={activeStyles} to="/covid-info">
              COVID-info
            </NavLink>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <NavLink activeStyle={activeStyles} to="/profile">
                  Profile
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink activeStyle={activeStyles} to="/auth/login">
                  Login
                </NavLink>
              </li>
              <li className="registerBtn">
                <NavLink className="registerLink" to="/auth/signup">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </NavLinks>
    </NavBar>
  );
};

export default DesktopNavbar;
