import { Drawer, List, Button } from "antd-mobile";
import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";
import logo from "assets/logo.svg";

import Header from "components/Header";
import CookieAlert from "components/CookieAlert";
import Logo from "components/Logo";
import Main from "./Main";
import { theme } from "constants/theme";

const { colors, typography } = theme;
const { medium, large } = typography.size;

const drawerStyles = {
  position: "relative",
  overflow: "hidden",
  WebkitOverflowScrolling: "touch",
};

const sidebarStyle = {
  background: `${theme.colors.royalBlue}`,
};

const NavList = styled(List)`
  width: 63vw !important;
  @media screen and (min-width: 1024px) {
    width: 20vw !important;
  }
  & .am-list-body {
    background: unset;
    border-width: 0 !important;
    position: absolute;
    top: 35vh;
    width: 100%;
    transform: translateY(-50%);
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

const NavItem = styled(List.Item).attrs((props) => ({
  onClick: props.onClick || (() => props.history.push(props.link)),
}))`
  background: unset;
  padding-left: 24px;
  & .am-list-line {
    border-bottom: 0;
    &:after {
      height: 0 !important;
    }
    & .am-list-content {
      color: #fff;
      cursor: pointer;
      font-family: "Poppins", sans-serif;
      font-size: 2.4rem;
      font-weight: 600;
      line-height: 6rem;
      padding: 0;
    }
  }

  &.am-list-item-active {
    background: #b8c2f8;
  }
`;

const CloseNav = styled(Button).attrs((props) => ({
  inline: true,
  icon: "cross",
  size: "lg",
}))`
  background: unset;
  border-width: 0 !important;
  border-radius: 0;
  color: #fff;
  cursor: pointer;
  font-size: 2rem;
  position: absolute;
  top: 4px;
  right: 0.4rem;
  z-index: 300;

  &.am-button-active {
    background: none;
    color: #fff;
  }
  &::before {
    display: none;
  }

  .am-icon {
    stroke-width: 2px;
    stroke: #fff;
  }
`;

const NavigationLayout = (props) => {
  const history = useHistory();

  const [drawerOpened, setDrawerOpened] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpened(!drawerOpened);
  };

  const drawerMenu = () => (
    <>
      <NavList>
        {props.isAuthenticated ? (
          <>
            <NavItem>
              <Link to="/profile">Profile</Link>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem history={history} link="/auth/login">
              Login / Register
            </NavItem>
          </>
        )}
        <NavItem history={history} link="/about">
          About Us
        </NavItem>
        <NavItem history={history} link="/privacy">
          Data Privacy
        </NavItem>
      </NavList>
      {drawerOpened && <CloseNav onClick={toggleDrawer} />}
    </>
  );

  const NavBar = styled.div`
     height: 7rem;
     background-color: #fff;
     display: flex;
     align-items: center;
  `;

  const HeaderContainer = styled.div`
     margin-right: auto;
     margin-left: 3rem;
  `;

  const NavLinks = styled.div`
    align-self: flex-end;
    transition: all 1s;
     ul {
       list-style-type: none;
       display: flex;
       margin-bottom: 0rem;
       margin-right: 2rem;

       .registerBtn {
         color: ${colors.royalBlue};
         border: 1px solid ${colors.royalBlue};
         border-radius: 2rem;
         padding: 1rem 1.3rem;
         .registerLink {
            color: ${colors.primary}
         }
         .registerLink:hover {
           padding: 0;
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
           padding: 0 .6rem .8rem .6rem;
         }
         a:hover:not(.registerLink)  {
           font-weight: 600;
           color: ${colors.royalBlue};
           border-bottom: 3px solid ${colors.royalBlue};
         }

       }
     }
  `;

  const NavLinkRegister = styled.li`
    color: ${colors.royalBlue};
    border: 1px solid ${colors.royalBlue};
    border-radius: 2rem;
    padding: .5rem 0 !important;
    a {
       text-decoration: none;
    }
    a:hover {
      padding: 0 !important;
      font-weight: 300 !important;
      borderBottom: none !important;
    }
  `;


  const activeStyles = {
    fontWeight: "600",
    color: "#425AF2"
  }


  const renderDesktopNav = () => {
    return (
    <div>
     <NavBar>
          <HeaderContainer>
               <Logo src={logo} alt="Fight Pandemics logo" />
          </HeaderContainer>
          <NavLinks>
               <ul>
                   <li><NavLink activeStyle={activeStyles} to="/feed">Feed</NavLink></li>
                   <li><NavLink activeStyle={activeStyles} to="#">COVID-info</NavLink></li>
                     {props.isAuthenticated ? (
                       <>
                       <li><NavLink activeStyle={activeStyles} to="/profile">Profile</NavLink></li>
                       </>
                     ) : (
                       <>
                       <li><NavLink activeStyle={activeStyles} to="/auth/login">Login</NavLink></li>
                       <li className="registerBtn">
                          <NavLink className="registerLink" to="/auth/login">Register</NavLink>
                       </li>
                       </>
                     )}
               </ul>
          </NavLinks>
       </NavBar>
       <Main>
         <props.component {...props} />
       </Main>
      </div>
    )
  }

  return (
    <>
     {renderDesktopNav()}
     </>
  );
};

export default NavigationLayout;

// const NavLinkRegister = styled.li`
//   color: ${colors.royalBlue};
//   border: 1px solid ${colors.royalBlue};
//   border-radius: 2rem;
//   padding: .5rem 1.3rem !important;
//   a {
//     padding: 0 !important;
//   }
// `;

// <Drawer
//   style={{
//     minHeight: document.documentElement.clientHeight,
//     ...drawerStyles,
//   }}
//   enableDragHandle
//   open={drawerOpened}
//   onOpenChange={toggleDrawer}
//   position="right"
//   sidebar={drawerMenu()}
//   sidebarStyle={sidebarStyle}
//   className="app-drawer"
// >
//   <Header onMenuClick={toggleDrawer} style={{ marginTop: 8 }} />
//   <Main>
//     <props.component {...props} />
//   </Main>
//   {/* <Footnote /> */}
//   <CookieAlert />
// </Drawer>
