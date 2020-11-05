import React from "react";
import { useTranslation } from "react-i18next";
import { NavBar } from "antd-mobile";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";

import { setOrganisation } from "../../actions/profileActions";
import SvgIcon from "../Icon/SvgIcon";
import MenuIcon from "assets/icons/menu.svg";
import logo from "assets/logo.svg";
import Logo from "../Logo";
import { theme, mq } from "../../constants/theme";
import { HeaderLinks } from "./HeaderLinks";
import FeedSearch from "components/Input/FeedSearch";

const { colors, typography } = theme;
const { large } = typography.size;

const BrandLink = styled(Link)`
  display: inline-flex;
  @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
    padding-left: 4rem;
  }
`;

const StyledNavBar = styled(NavBar)`
  height: 6rem;
  margin-top: 0;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    height: auto;
    margin-top: 0;
  }
  .am-navbar-title {
    display: none;
  }
  .am-navbar-left {
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      padding-left: 2.3rem;
      padding-top: 1rem;
    }
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
  white-space: nowrap;
  button {
    border: none;
    background: transparent;
    cursor: pointer;

    img {
      margin-left: 1.5rem;
      pointer-events: none;
    }
  }
  ul {
    list-style-type: none;
    display: flex;
    margin-bottom: 0rem;
    margin-right: 5rem;
    align-items: center;

    .logInBtn {
      border: 1px solid #1890ff;
      margin-right: 10px;
    }

    .joinNowBtn {
      background: #1890ff;
    }

    li {
      font-size: ${large};
      color: ${colors.darkerGray};
      padding: 0rem 1rem;
      a:not(.registerLink) {
        color: ${colors.darkerGray};
        text-decoration: none;
        padding: 1.65rem 1.4rem;
        transition: all 0.2s;
        border-bottom: 0.3rem solid transparent;
      }
      a:hover:not(.registerLink) {
        color: ${colors.royalBlue};
        border-bottom: 0.3rem solid ${colors.royalBlue};
      }
    }
  }
`;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100vw;
`;

const NavSearch = styled.div`
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none !important;
  }
  position: absolute;
  left: 29rem;
  @media screen and (max-width: ${mq.desktop.small.minWidth}) {
    position: initial;
    margin-right: 2rem;
  }
`;

const Header = ({
  authLoading,
  onMenuClick,
  organisationId,
  isAuthenticated,
  user,
  onFeedbackIconClick,
  onSearchSubmit,
  onSearchClear,
  navSearch,
  setOrganisationId,
}) => {
  const { t } = useTranslation();

  const index = localStorage.getItem("organisationId");
  if (organisationId !== index) {
    setOrganisationId(index);
  }
  const onOrganisationChange = (index) => {
    if (index !== organisationId) {
      if (index === null) {
        localStorage.removeItem("organisationId");
      } else {
        localStorage.setItem("organisationId", index);
      }
      window.location.href = "/feed";
    }
  };

  return (
    <HeaderWrapper className="header">
      <StyledNavBar
        mode="light"
        leftContent={
          <>
            <BrandLink to={isAuthenticated ? "/feed" : "/"}>
              <Logo src={logo} alt={t("alt.logo")} />
            </BrandLink>
            <NavSearch>
              {navSearch && (
                <FeedSearch
                  handleSubmit={onSearchSubmit}
                  handleClear={onSearchClear}
                  placeholder={t("feed.search.placeholder")}
                  t={t}
                />
              )}
            </NavSearch>
          </>
        }
        rightContent={
          <div>
            <MenuToggle
              src={MenuIcon}
              style={{ fontSize: 24, cursor: "pointer" }}
              onClick={onMenuClick}
            />
            {!authLoading && (
              <DesktopMenu>
                <NavLinks>
                  <HeaderLinks
                    isAuthenticated={isAuthenticated}
                    onFeedbackIconClick={onFeedbackIconClick}
                    organisationId={organisationId}
                    user={user}
                    setOrganisation={onOrganisationChange}
                  />
                </NavLinks>
              </DesktopMenu>
            )}
          </div>
        }
      />
    </HeaderWrapper>
  );
};

const mapDispatchToProps = {
  setOrganisationId: setOrganisation,
};

export default connect(null, mapDispatchToProps)(Header);
