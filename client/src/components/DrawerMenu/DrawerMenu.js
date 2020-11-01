import React, { useState } from "react";

import { MENU_STATE } from "./constants";
import { ProfileMenu } from "./ProfileMenu";
import { AccountMenu } from "./AccountMenu";
import { MenuContainer, CloseNav, NavList } from "./components";

export const DrawerMenu = ({
  user,
  show,
  toggleDrawer,
  authLoading,
  isAuthenticated,
  dispatchAction,
}) => {
  const [menuState, setMenuState] = useState(MENU_STATE.ACCOUNTS);
  if (!show || authLoading) {
    return null;
  }
  return (
    <MenuContainer>
      <CloseNav onClick={toggleDrawer} />
      <NavList>
        {menuState === MENU_STATE.SETTINGS && (
          <ProfileMenu
            user={user}
            setMenuState={setMenuState}
            toggleDrawer={toggleDrawer}
            dispatchAction={dispatchAction}
            isAuthenticated={isAuthenticated}
          />
        )}
        {menuState === MENU_STATE.ACCOUNTS && (
          <AccountMenu
            user={user}
            setMenuState={setMenuState}
            isAuthenticated={isAuthenticated}
          />
        )}
      </NavList>
    </MenuContainer>
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
