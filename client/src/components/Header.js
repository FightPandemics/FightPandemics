import React from "react";
import { NavBar } from "antd-mobile";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

// ICONS
import SvgIcon from "./Icon/SvgIcon";
import envelope from "assets/icons/envelope.svg";
import logo from "assets/logo.svg";
import Logo from "./Logo";
import { theme, mq } from "../constants/theme";
import { Menu, Dropdown } from "antd";
const { colors, typography } = theme;
const { large } = typography.size;
const BrandLink = styled(Link)`
  display: inline-flex;
  @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
    padding-left: 4rem;
  }
`;
const StyledNavBar = styled(NavBar)`
  height: 7rem;
  margin-top: 0;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    height: auto;
    margin-top: 0;
  }
  .am-navbar-title {
    display: none;
  }
`;
const MenuToggle = styled(SvgIcon)`
  cursor: pointer;
  display: none !important;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: block !important;
  }
`;
const DesktopMenu = styled.div`
  background-color: ${colors.white};
  display: flex;
  align-items: center;
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
    margin-right: 5rem;
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
      font-size: ${large};
      color: ${colors.darkerGray};
      a:not(.registerLink) {
        color: ${colors.darkerGray};
        text-decoration: none;
        padding: 1.2rem 1.4rem;
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
  color: `${colors.royalBlue}`,
};

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100vw;
`;

export default ({ authLoading, onMenuClick, isAuthenticated, user }) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile">My Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Link to="/create-organization-profile">Add Organisation</Link>
      </Menu.Item>
      <Menu.Divider />
      {user?.organizations?.map((organization) => (
        <Menu.Item key={organization._id}>
          <Link to={`/organization/${organization._id}`}>
            {organization.name}
          </Link>
        </Menu.Item>
      ))}

      <Menu.Divider />
      <Menu.Item>
        <Link to="/auth/logout">Log Out</Link>
      </Menu.Item>
    </Menu>
  );
  const renderNavLinkItems = () => {
    if (authLoading) return null;
    return (
      <>
        <li>
          <NavLink activeStyle={activeStyles} to="/about-us">
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyles} to="/feed">
            Feed
          </NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Dropdown overlay={menu} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  Profile
                </a>
              </Dropdown>
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
            <Link to="/feed">
              <SvgIcon src={envelope} style={{ marginLeft: "1.5rem" }} />
            </Link>
          </>
        )}
      </>
    );
  };

  return (
    <HeaderWrapper className="header">
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
              src={menu}
              style={{ fontSize: 24, cursor: "pointer" }}
              onClick={onMenuClick}
            />
            <DesktopMenu>
              <NavLinks>
                <ul>{renderNavLinkItems()}</ul>
              </NavLinks>
            </DesktopMenu>
          </div>
        }
      />
    </HeaderWrapper>
  );
};
