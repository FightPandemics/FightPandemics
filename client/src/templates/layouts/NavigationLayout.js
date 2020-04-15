import React, { useState } from "react";
import { Drawer, List, Button } from "antd-mobile";
import { useAuth0 } from "~/react-auth0-spa";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import Header from "~/components/Header";
import Main from "./Main";
import { theme } from "../../constants/theme";

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

export default (props) => {
  const { isAuthenticated } = useAuth0();
  const history = useHistory();

  const [drawerOpened, setDrawerOpened] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpened(!drawerOpened);
  };

  const drawerMenu = () => (
    <>
      <NavList>
        {isAuthenticated ? (
          <>
            <NavItem>
              <Link to="/profile">Profile</Link>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem history={history} link="/auth/signup">
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
    >
      <Header onMenuClick={toggleDrawer} style={{ marginTop: 8 }} />
      <Main>
        <props.component {...props} />
      </Main>
    </Drawer>
  );
};
