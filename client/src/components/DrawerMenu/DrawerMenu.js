import React from "react";
import { Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { Avatar } from "components/Avatar";
import { localization, languages } from "locales/languages";
import globe from "assets/icons/globe-white.svg";
import GTM from "constants/gtm-tags";
import { getInitialsFromFullName } from "utils/userInfo";
import i18n from "i18n";
import { TOGGLE_STATE } from "hooks/actions/feedbackActions";
import {
  MenuContainer,
  CloseNav,
  NavList,
  Divider,
  NavItem,
  GlobeIcon,
  FeedbackItem,
  LanguageSwitchItem,
  Space,
  CustomSvgIcon,
} from "./components";

import LogoutIcon from "assets/icons/logout-gray.svg";
import FeedbackIcon from "assets/icons/feedback-gray.svg";
import LanguageIcon from "assets/icons/language-gray.svg";
import PeopleIcon from "assets/icons/people-gray.svg";

export const DrawerMenu = ({
  user,
  show,
  toggleDrawer,
  authLoading,
  isAuthenticated,
  dispatchAction,
}) => {
  if (show && !authLoading) {
    return (
      <MenuContainer>
        <CloseNav onClick={toggleDrawer} />
        <NavList>
          <SettingMenu
            user={user}
            toggleDrawer={toggleDrawer}
            dispatchAction={dispatchAction}
            isAuthenticated={isAuthenticated}
          />
        </NavList>
      </MenuContainer>
    );
  }
  return null;
};

const SettingMenu = ({
  user,
  toggleDrawer,
  dispatchAction,
  isAuthenticated,
}) => {
  const { t } = useTranslation();
  const feedToPath = isAuthenticated ? { pathname: "/feed", user } : "/feed";
  // const languageMenu = renderLanguageMenu();
  return (
    <>
      {isAuthenticated && (
        <NavItem>
          <ProfileItem user={user} />
        </NavItem>
      )}
      {!isAuthenticated && (
        <Link id={GTM.nav.prefix + GTM.nav.login} to="/auth/login">
          <NavItem size={"big"}>
            {t("auth.signIn")} / {t("auth.joinNow")}
          </NavItem>
        </Link>
      )}
      <Divider />
      <Link id={GTM.nav.prefix + GTM.nav.feed} to={feedToPath}>
        <NavItem size={"big"}>{t("feed.title")}</NavItem>
      </Link>
      <Link id={GTM.nav.prefix + GTM.nav.aboutUs} to="/about-us">
        <NavItem size={"big"}>{t("common.aboutUs")}</NavItem>
      </Link>
      <Divider />
      {isAuthenticated && (
        <NavItem>
          <CustomSvgIcon src={PeopleIcon} />
          {t("common.switchAccount")}
        </NavItem>
      )}
      <NavItem>
        <CustomSvgIcon src={LanguageIcon} />
        {t("common.language")}
      </NavItem>
      <NavItem
        id={GTM.nav.prefix + GTM.nav.feedback}
        onClick={() => {
          dispatchAction(TOGGLE_STATE, "ratingModal");
          toggleDrawer();
        }}
      >
        <CustomSvgIcon src={FeedbackIcon} />
        {t("common.feedback")}
      </NavItem>
      {isAuthenticated && (
        <Link to="/auth/logout">
          <NavItem>
            <CustomSvgIcon src={LogoutIcon} />
            {t("common.logout")}
          </NavItem>
        </Link>
      )}
    </>
  );
};

// const renderLanguageMenu = () => (
//   <Menu>
//     {Object.entries(languages).map(([key, label]) => (
//       <Menu.Item key={key}>
//         <div
//           style={
//             i18n.language === key
//               ? { fontWeight: "bold" }
//               : { fontWeight: "normal" }
//           }
//           onClick={() => changeLanguage(key)}
//           id={GTM.nav.prefix + GTM.nav.language + GTM.language[key]}
//         >
//           {label.text}
//         </div>
//       </Menu.Item>
//     ))}
//   </Menu>
// );

// const changeLanguage = (lng) => {
//   i18n.changeLanguage(lng);
//   localStorage.setItem("locale", lng);
// };

const ProfileInfo = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: ${({ bold }) => (bold ? "600" : "normal")};
  line-height: normal;
  color: ${({ bold }) => (bold ? "#939393" : "rgba(0, 0, 0, 0.85)")};
`;

const ProfileItemContainer = styled.div`
  display: flex;
  margin: 5px 0;
  align-items: center;
`;

const ProfileItem = ({ user }) => {
  return (
    <ProfileItemContainer>
      <div>
        <Avatar src={user.photo} size={"small"}>
          {getInitialsFromFullName(`${user.firstName} ${user.lastName} `)}
        </Avatar>
      </div>
      <div>
        <ProfileInfo bold>
          {`${user?.firstName} ${user?.lastName} `}
        </ProfileInfo>
        <ProfileInfo>View my Profile</ProfileInfo>
      </div>
    </ProfileItemContainer>
  );
};

{
  /* <NavItem>
        {t("post.organisation")}
        {user?.organisations?.length > 0
          ? user?.organisations?.map((organisation) => (
            <NavItemBrief
              
              key={organisation._id}
              onClick={toggleDrawer}
            >
              <Link to={`/organisation/${organisation._id}`}>
                {organisation.name}
              </Link>
            </NavItemBrief>
          ))
          : null}
        <NavItemBrief>
          <Link
            id={GTM.nav.prefix + GTM.nav.addOrg}
            to="/create-organisation-profile"
          >
            + {t("common.addOrg")}
          </Link>
        </NavItemBrief>
      </NavItem> */
}

// <Dropdown overlay={languageMenu} trigger={["click"]}>
//   <LanguageSwitchItem id={GTM.nav.prefix + GTM.nav.language}>
//     <GlobeIcon src={globe} className="globe-icon-svg"></GlobeIcon>
//     {" " + languages[localization[i18n.language]].value}
//   </LanguageSwitchItem>
// </Dropdown>
{
  /* <Dropdown overlay={languageMenu} trigger={["click"]}>
        <LanguageSwitchItem id={GTM.nav.prefix + GTM.nav.language}>
          <GlobeIcon src={globe} className="globe-icon-svg"></GlobeIcon>
          {" " + languages[localization[i18n.language]].value}
        </LanguageSwitchItem>
      </Dropdown> */
}

{
  /* <FeedbackItem
        id={GTM.nav.prefix + GTM.nav.feedback}
        onClick={() => {
          dispatchAction(TOGGLE_STATE, "ratingModal");
          toggleDrawer();
        }}
        size="small"
      >
        <CustomSvgIcon src={FeedbackIcon} />
        {t("common.feedback")}
      </FeedbackItem> */
}
