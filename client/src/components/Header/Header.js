import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { NavBar } from "antd-mobile";
import { Menu, Dropdown, Button } from "antd";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";

import { setOrganisationIndex } from "../../actions/profileActions";
import i18n from "../../i18n";

// ICONS
import SvgIcon from "../Icon/SvgIcon";
import MenuIcon from "assets/icons/menu.svg";
import feedback from "assets/icons/feedback.svg";
import logo from "assets/logo.svg";
import Logo from "../Logo";
import globe from "assets/icons/globe.svg";

import { theme, mq } from "../../constants/theme";
import { languages } from "locales/languages";
import GTM from "constants/gtm-tags";
import { ProfilePhoto } from "components/Picture/ProfilePic";
import { getInitialsFromFullName } from "utils/userInfo";

const { colors, typography } = theme;
const { SubMenu } = Menu;
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

const Header = ({
  authLoading,
  onMenuClick,
  organisationIndex,
  isAuthenticated,
  user,
  onFeedbackIconClick,
  setOrganisationIndex,
}) => {
  const { t } = useTranslation();

  const index = localStorage.getItem("organisationIndex");
  if (index && organisationIndex !== index) {
    setOrganisationIndex(index);
  }
  const setOrganisation = (index) => {
    if (index === null) {
      localStorage.removeItem("organisationIndex");
    } else {
      localStorage.setItem("organisationIndex", index);
    }
    window.location.href = "/feed";
  };

  return (
    <HeaderWrapper className="header">
      <StyledNavBar
        mode="light"
        leftContent={
          <BrandLink to={isAuthenticated ? "/feed" : "/"}>
            <Logo src={logo} alt={t("alt.logo")} />
          </BrandLink>
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
                    organisationIndex={organisationIndex}
                    user={user}
                    setOrganisation={setOrganisation}
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
  setOrganisationIndex,
};

const HeaderLinks = ({
  isAuthenticated,
  onFeedbackIconClick,
  organisationIndex,
  user,
  setOrganisation,
}) => {
  const { t } = useTranslation();
  const languageMenu = <LanguageMenu />;
  const profileMenu = (
    <ProfileMenu
      user={user}
      organisationIndex={organisationIndex}
      setOrganisation={setOrganisation}
      onFeedbackIconClick={onFeedbackIconClick}
    />
  );
  return (
    <>
      <ul>
        <li>
          <NavLink
            id={GTM.nav.prefix + GTM.nav.feed}
            activeStyle={activeStyles}
            to="/feed"
          >
            {t("feed.title")}
          </NavLink>
        </li>
        <li>
          <NavLink
            id={GTM.nav.prefix + GTM.nav.aboutUs}
            activeStyle={activeStyles}
            to="/about-us"
          >
            {t("common.aboutUs")}
          </NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <Dropdown overlay={profileMenu} trigger={["click"]}>
              <div style={{ width: "24px", height: "24px" }}>
                <ProfilePhoto
                  user={user}
                  initials={getInitialsFromFullName(
                    `${user.firstName} ${user.lastName}`,
                  )}
                />
              </div>
            </Dropdown>
          </li>
        )}
        {!isAuthenticated && (
          <>
            <NavLink id={GTM.nav.prefix + GTM.nav.login} to="/auth/login">
              <Button type="primary" ghost shape="round" className="logInBtn">
                {t("auth.signIn")}
              </Button>
            </NavLink>
            <NavLink id={GTM.nav.prefix + GTM.nav.login} to="/auth/signup">
              <Button shape="round" type="primary" className="joinNowBtn">
                {t("auth.joinNow")}
              </Button>
            </NavLink>
            <Button
              id={GTM.nav.prefix + GTM.nav.feedback}
              onClick={onFeedbackIconClick}
            >
              <SvgIcon src={feedback} />
            </Button>
            <Dropdown overlay={languageMenu} trigger={["click"]}>
              <SvgIcon
                id={GTM.nav.prefix + GTM.nav.language}
                src={globe}
                className="globe-icon-svg"
              ></SvgIcon>
            </Dropdown>
          </>
        )}
      </ul>
    </>
  );
};

const LanguageMenu = () => {
  const onLanguageChange = (language) => {
    i18n.changeLanguage(language);
    window.localStorage.setItem("locale", language);
  };
  return (
    <Menu>
      {Object.entries(languages).map(([key, label]) => (
        <Menu.Item key={key}>
          <div
            style={{ fontWeight: i18n.language === key ? "bold" : "normal" }}
            onClick={() => onLanguageChange(key)}
            id={GTM.nav.prefix + GTM.nav.language + GTM.language[key]}
          >
            {label.text}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );
};

const ProfileMenu = ({
  user,
  organisationIndex,
  setOrganisation,
  onFeedbackIconClick,
}) => {
  const { t } = useTranslation();
  return (
    <Menu>
      {/* <Menu.Item onClick={() => setOrganisation(null)}> */}
      <Menu.Item>{`${user?.firstName} ${user?.lastName}`}</Menu.Item>
      <Menu.Divider />
      <SubMenu title={t("common.organisations")}>
        <Menu.Item>
          <Link
            id={GTM.nav.prefix + GTM.nav.addOrg}
            to="/create-organisation-profile"
          >
            {t("common.addOrg")}
          </Link>
        </Menu.Item>
        <Menu.Divider />
        {user?.organisations?.length > 0
          ? user?.organisations?.map((organisation, i) => (
              <Menu.Item
                key={organisation._id}
                onClick={() => setOrganisation(i)}
              >
                {organisation.name}
              </Menu.Item>
            ))
          : null}
      </SubMenu>
      <Menu.Divider />
      <Menu.Item>
        <Link
          to={
            organisationIndex === null
              ? `/profile/${user?.id || user?._id}`
              : `/organisation/${user?.organisations[organisationIndex]?._id}`
          }
        >
          {t("common.profile")}
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        id={GTM.nav.prefix + GTM.nav.feedback}
        onClick={onFeedbackIconClick}
      >
        {t("common.feedback")}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Link to="/auth/logout">{t("common.logout")}</Link>
      </Menu.Item>
    </Menu>
  );
};

export default connect(null, mapDispatchToProps)(Header);
