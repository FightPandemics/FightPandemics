import React, { useState } from "react";
import { Drawer, List } from 'antd-mobile';
import { useAuth0 } from "~/react-auth0-spa";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import Header from '~/components/Header';

const StyleDrawer = {
  position: "relative",
  overflow: "auto",
  "-webkit-overflow-scrolling": "touch"
}

const StyleSidebar = {
  background: "#425AF2"
}

const Main = styled.main`
  margin-left: 20px;
  margin-right: 20px;
`

const NavList = styled(List).attrs(props => ({
  activeStyle: false
}))`
  & .am-list-body {
    background: unset;
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);

    &::after {
      height: 0px !important;
    }

    &::before {
      height: 0px !important;
    }
  }
`

const NavItem = styled(List.Item).attrs(props => ({
  onClick: props.onClick || (() => props.history.push(props.link))
}))`
  background: unset;

  & .am-list-content {
    color: #fff !important;
  }

  &.am-list-item-active {
    background: #B8C2F8;
  }
`

export default (props) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const history = useHistory();

  const [ drawerOpened, setDrawerOpened ] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpened(!drawerOpened)
  }

  const loginFunc = () => loginWithRedirect({})

  const openLink = (link) => history.push(link)

  const drawerMenu = () => (
    <NavList>
      {isAuthenticated ? (
        <>
          <NavItem>
            <Link to="/profile">
              Profile
            </Link>
          </NavItem>
        </>
      ) : (
        <>
          <NavItem onClick={loginFunc}>
            Login
          </NavItem>
          <NavItem onClick={loginFunc}>
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
  )

  return (
    <div>
      <Header onMenuClick={toggleDrawer} />
      <Drawer
        style={{ minHeight: document.documentElement.clientHeight, ...StyleDrawer }}
        enableDragHandle
        open={drawerOpened}
        onOpenChange={toggleDrawer}
        position='right'
        sidebar={drawerMenu()}
        sidebarStyle={StyleSidebar}
        className="app-drawer"
      >
        <Main>
          <props.component {...props} />
        </Main>
      </Drawer>
    </div>
  )
}
