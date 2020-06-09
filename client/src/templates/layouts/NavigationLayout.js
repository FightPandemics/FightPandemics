import { Drawer, List, Button, Flex, WhiteSpace } from "antd-mobile";
import { Typography } from "antd";

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import TextAvatar from "components/TextAvatar";
import Avatar from "components/Avatar";
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

const MenuContainer = styled.div`
  width: 63vw !important;
  @media screen and (min-width: 1024px) {
    width: 20vw !important;
  }
`;

const NavList = styled(List)`
  & .am-list-body {
    background: unset;
    border-width: 0 !important;
    position: absolute;
    width: 100%;
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

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavItem = styled(List.Item).attrs((props) => ({
  onClick: props.onClick || (() => props.history.push(props.link)),
}))`
  background: unset;
  padding-left: 2.1rem;
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

const NavItemBrief = styled(NavItem).attrs((props) => ({
  onClick: props.onClick || (() => props.history.push(props.link)),
}))`
  padding-left: 4.6rem;
  & .am-list-line {
    border-bottom: 0;
    &:after {
      height: 0 !important;
    }
    & .am-list-content {
      font-size: 1.8rem;
      font-weight: normal;
      line-height: 4.5rem;
    }
  }
`;

const UserName = styled(Typography.Text)`
  padding: 1.2rem 1.2rem;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.4px;
  color: ${white};
`;

const Space = styled.div`
  height: ${(props) => props.height ?? "1.4rem"};
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

const BriefLink = styled(Link)`
  font-size: 1.8rem;
  font-weight: normal;
  line-height: 4.5rem;
`;

const DividerLine = styled.div`
  height: 0.1px;
  background-color: ${white};
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

const NavigationLayout = (props) => {
  const { mobiletabs, tabIndex } = props;

  const isAuthenticated = true;
  const history = useHistory();

  const [drawerOpened, setDrawerOpened] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpened(!drawerOpened);
  };

  const AuthenticatedMenu = () => (
    <>
      <WhiteSpace size="lg" />
      <AvatarContainer>
        <NavItem history={history}>
          <TextAvatar size={80} alt="avatar">
            MM
          </TextAvatar>
        </NavItem>
        <UserName>name</UserName>
      </AvatarContainer>
      <DividerLine />
      <NavItem history={history}>
        <Link to="/profile">Profile</Link>
      </NavItem>
      <NavItem history={history}>
        <Link to="/profile">Organization</Link>
      </NavItem>
      <NavItemBrief history={history}>
        <Link to="/profile">Notion</Link>
      </NavItemBrief>
      <NavItemBrief history={history}>
        <Link to="/profile">+ Add new one</Link>
      </NavItemBrief>
      <NavItem history={history}>
        <Link to="/feed">Feed</Link>
      </NavItem>
      <Space height="5rem" />
      <NavItem history={history}>
        <BriefLink to="/profile">Feedback</BriefLink>
      </NavItem>
      <NavItem history={history}>
        <BriefLink to="/profile">Logout</BriefLink>
      </NavItem>
    </>
  );

  const UnAuthenticatedMenu = () => (
    <>
      <NavItem history={history} link="/auth/login">
        Login / Register
      </NavItem>
    </>
  );

  const DrawerMenu = () => (
    <MenuContainer>
      {drawerOpened && <CloseNav onClick={toggleDrawer} />}
      <NavList>
        {isAuthenticated ? <AuthenticatedMenu /> : <UnAuthenticatedMenu />}
      </NavList>
    </MenuContainer>
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
          sidebar={DrawerMenu()}
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
