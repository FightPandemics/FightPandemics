import React, { useState } from "react";
import { Drawer, List } from "antd-mobile";
import { useAuth0 } from "~/react-auth0-spa";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import Header from "~/components/Header";
import Main from "./Main";

const drawerStyles = {
  position: "relative",
  overflow: "hidden",
  WebkitOverflowScrolling: "touch",
};

const sidebarStyle = {
  background: "#425AF2",
};

const NavList = styled(List)`
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
      font-size: 1.715rem;
      font-weight: 600;
      line-height: 4.286rem;
      padding: 0;
    }
  }

  &.am-list-item-active {
    background: #b8c2f8;
  }
`;

export default (props) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const history = useHistory();

  const [drawerOpened, setDrawerOpened] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpened(!drawerOpened);
  };

  const loginFunc = () => loginWithRedirect({});

  const drawerMenu = () => (
    <NavList>
      {isAuthenticated ? (
        <>
          <NavItem>
            <Link to="/profile">Profile</Link>
          </NavItem>
        </>
      ) : (
        <>
          <NavItem history={history} link="/auth/login">
            Login
          </NavItem>
          <NavItem history={history} link="/auth/signup">
            Register
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
  );

  return (
    <Drawer
      style={{
        minHeight: document.documentElement.clientHeight,
        ...drawerStyles,
      }}
      enableDragHandle
      open={drawerOpened}
      onOpenChange={toggleDrawer}
      position="right"
      sidebar={drawerMenu()}
      sidebarStyle={sidebarStyle}
      className="app-drawer"
      closable
    >
      <Header onMenuClick={toggleDrawer} style={{ marginTop: 8 }} />
      <Main>
        <props.component {...props} />
      </Main>
    </Drawer>
  );
};
