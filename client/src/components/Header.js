import React from "react";
import { NavBar } from "antd-mobile";
import { Link, NavLink } from "react-router-dom";
import { Menu as MenuIcon } from "@material-ui/icons";
// import { Menu as MenuIcon } from "grommet-icons";
import styled from "styled-components";

import logo from "assets/logo.svg";
import Logo from "./Logo";
import { theme, mq } from "../constants/theme";
const { colors, typography } = theme;
const { large } = typography.size;


const BrandLink = styled(Link)`
  display: inline-flex;
`;

const StyledNavBar = styled(NavBar)`
   height: 7rem;
   margin-top: 0;
   @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
     height: auto;
     margin-top: .8rem;
   }
   .am-navbar-title {
     display: none;
   }
`;

const MenuToggle = styled(MenuIcon)`
  cursor: pointer;
  display: none !important;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: block !important;
  }
`;


const DesktopMenu = styled.div`
   background-color: #fff;
   display: flex;
   align-items: center;
   display: block;
   @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
     display: none;
   }
`;

const NavLinks = styled.div`
  align-self: flex-end;
  padding-top: 2rem;
   ul {
     list-style-type: none;
     display: flex;
     margin-bottom: 0rem;
     margin-right: 2rem;

     .registerBtn {
       color: ${colors.royalBlue};
       border: 1px solid ${colors.royalBlue};
       border-radius: 2rem;
       padding: 0 .8rem;
       margin-bottom: .2rem;
       align-self: center;
       .registerLink {
          color: ${colors.primary}
       }
       .registerLink:hover {
         font-weight: 500;
       }
     }

     li {
       font-size: ${large};
       color: #282828;
       a:not(.registerLink) {
         color: #282828;
         text-decoration: none;
         padding: 1rem;
         transition: all .2s;
         border-bottom: 3px solid transparent;
       }
       a:hover:not(.registerLink)  {
         font-weight: 600;
         color: ${colors.royalBlue};
         border-bottom: 3px solid ${colors.royalBlue};
       }

     }
   }
`;

const activeStyles = {
  fontWeight: "600",
  color: "#425AF2"
}

export default ({ onMenuClick, ...props }) => {
  return (
    <div className="header" {...props}>
      <StyledNavBar
        mode="light"
        leftContent={
          <BrandLink to="/">
            <Logo src={logo} alt="Fight Pandemics logo" />
          </BrandLink>
        }
        rightContent={
          <div>
            <MenuToggle
              style={{ fontSize: 24 }}
              color="primary"
              onClick={onMenuClick}
            />
          <DesktopMenu>
               <NavLinks>
                    <ul>
                        <li><NavLink activeStyle={activeStyles} to="/feed">Feed</NavLink></li>
                        <li><NavLink activeStyle={activeStyles} to="/covid-info">COVID-info</NavLink></li>
                          {props.isAuthenticated ? (
                            <>
                            <li><NavLink activeStyle={activeStyles} to="/profile">Profile</NavLink></li>
                            </>
                          ) : (
                            <>
                            <li><NavLink activeStyle={activeStyles} to="/auth/login">Login</NavLink></li>
                            <li className="registerBtn">
                               <NavLink className="registerLink" to="/auth/signup">Register</NavLink>
                            </li>
                            </>
                          )}
                    </ul>
               </NavLinks>
            </DesktopMenu>
            </div>
        }
      />
    </div>
  );
};
