import React from "react";
import { useTranslation } from "react-i18next";
import { NavBar } from "antd-mobile";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { Badge } from "antd";

import { setOrganisation } from "../../actions/profileActions";
import SvgIcon from "../Icon/SvgIcon";
import MenuIcon from "assets/icons/menu.svg";
import logo from "assets/logo.svg";
import Logo from "../Logo";
import { theme, mq } from "../../constants/theme";
import { HeaderLinks } from "./HeaderLinks";
import FeedSearch from "components/Input/FeedSearch";
import { InboxIcon } from "./constants";
import mail from "assets/icons/mail.svg";
import GTM from "constants/gtm-tags";
import { NotificationDropDown } from "components/Notifications/NotificationDropDown";

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
      pointer-events: none;
    }
  }
  ul {
    list-style-type: none;
    display: flex;
    margin: 0;
    align-items: center;
    .registerBtn {
      margin-bottom: 0.2rem;
      align-self: center;
    }

    .registerLink {
      display: block;
      border: 0.1rem solid ${colors.royalBlue};
      border-radius: 2rem;
      padding: 0 1rem;
      color: ${colors.royalBlue};
    }
    .registerLink:hover {
      background-color: ${colors.royalBlue};
      color: ${colors.white};
    }

    li {
      font-size: ${large};
      color: ${colors.darkerGray};
      padding: 0rem 1rem;
      a:not(.registerLink),
      .icon-btn {
        height: 6rem;
        color: ${colors.darkerGray};
        text-decoration: none;
        padding: 1.65rem 1.4rem;
        transition: all 0.2s;
        border-bottom: 0.3rem solid transparent;
      }
      a:hover:not(.registerLink),
      .icon-btn:hover {
        cursor: pointer;
        color: ${colors.royalBlue};
        border-bottom: 0.3rem solid ${colors.royalBlue};
      }
      .ant-avatar {
        cursor: pointer;
        user-select: none;
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
  onOrganisationChange,
  navSearch,
  setOrganisationId,
  webSocket,
}) => {
  const { t } = useTranslation();
  const { rooms } = webSocket;

  const index = localStorage.getItem("organisationId");
  if (organisationId !== index) {
    setOrganisationId(index);
  }

  const renderInboxIcon = (mobile, activeStyles) => {
    return (
      <InboxIcon mobile={mobile}>
        <Link
          id={GTM.nav.prefix + GTM.nav.inbox}
          to="/inbox"
          activeStyles={activeStyles}
        >
          <Badge
            count={rooms.reduce(
              (total, room) =>
                total +
                (room.participants.find(
                  (p) => p.id == (organisationId || user.id.toString()),
                )?.newMessages
                  ? 1
                  : 0 || // remove "? 1:0" to show total messages
                    0),
              0,
            )}
          >
            <SvgIcon src={mail}></SvgIcon>
          </Badge>
        </Link>
      </InboxIcon>
    );
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
                <FeedSearch placeholder={t("feed.search.placeholder")} t={t} />
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
            {isAuthenticated && renderInboxIcon(true)}
            {isAuthenticated && (
              <NotificationDropDown
                notifications={webSocket.notifications}
                mobile={true}
                organisationId={organisationId}
              />
            )}
            {!authLoading && (
              <DesktopMenu>
                <NavLinks>
                  <HeaderLinks
                    isAuthenticated={isAuthenticated}
                    onFeedbackIconClick={onFeedbackIconClick}
                    organisationId={organisationId}
                    user={user}
                    setOrganisation={onOrganisationChange}
                    renderInboxIcon={renderInboxIcon}
                    notifications={webSocket.notifications}
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
