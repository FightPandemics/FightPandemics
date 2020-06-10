import { Drawer, List, Button } from "antd-mobile";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import Header from "components/Header";
import Footnote from "components/Footnote";
import CookieAlert from "components/CookieAlert";
import Main from "./Main";
import MobileTabs from "./MobileTabs";
import { theme } from "constants/theme";

const { royalBlue, tropicalBlue, white } = theme.colors;

const drawerStyles = {
  position: "relative",
  overflow: "hidden",
  WebkitOverflowScrolling: "touch",
};

const sidebarStyle = {
  background: `${royalBlue}`,
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
      color: ${white};
      cursor: pointer;
      font-family: "Poppins", sans-serif;
      font-size: 2.4rem;
      font-weight: 600;
      line-height: 6rem;
      padding: 0;
    }
  }

  &.am-list-item-active {
    background: ${tropicalBlue};
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
  color: ${white};
  cursor: pointer;
  font-size: 2rem;
  position: absolute;
  top: 4px;
  right: 0.4rem;
  z-index: 300;

  &.am-button-active {
    background: none;
    color: ${white};
  }
  &::before {
    display: none;
  }

  .am-icon {
    stroke-width: 2px;
    stroke: ${white};
  }
`;

const NavigationLayout = (props) => {
  const { mobiletabs, tabIndex, isAuthenticated } = props;

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
            <NavItem history={history} link="/auth/login">
              Login / Register
            </NavItem>
          </>
        )}
        <NavItem history={history} link="/about">
          About Us
        </NavItem>
      </NavList>
      {drawerOpened && <CloseNav onClick={toggleDrawer} />}
    </>
  );

  const renderNavigationBar = () => {
    return (
      <div>
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
          <Header
            onMenuClick={toggleDrawer}
            isAuthenticated={isAuthenticated}
          />
          {mobiletabs ? (
            <MobileTabs tabIndex={tabIndex} childComponent={props.children} />
          ) : null}
          <Main>
            <props.component {...props} />
          </Main>
          <Footnote />
          <CookieAlert />
        </Drawer>
      </div>
    );
  };

  return <>{renderNavigationBar()}</>;
};

export default NavigationLayout;
