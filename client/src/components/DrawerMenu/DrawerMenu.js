import React, { useState } from "react";
import { connect } from "react-redux";

import { setOrganisation } from "../../actions/profileActions";
import { MENU_STATE } from "./constants";
import { ProfileMenu } from "./ProfileMenu";
import { AccountMenu } from "./AccountMenu";
import { LanguageMenu } from "./LanguageMenu";
import { MenuContainer, CloseNav, NavList } from "./components";

const DrawerMenu = ({
  user,
  show,
  toggleDrawer,
  authLoading,
  isAuthenticated,
  dispatchAction,
  organisationId,
  setOrganisationId,
}) => {
  const [menuState, setMenuState] = useState(MENU_STATE.SETTINGS);
  if (!show || authLoading) {
    return null;
  }

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
    <MenuContainer>
      {menuState === MENU_STATE.SETTINGS && <CloseNav onClick={toggleDrawer} />}
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
            organisationId={organisationId}
            setOrganisationId={onOrganisationChange}
          />
        )}
        {menuState === MENU_STATE.LANGUAGES && (
          <LanguageMenu
            setMenuState={setMenuState}
            isAuthenticated={isAuthenticated}
          />
        )}
      </NavList>
    </MenuContainer>
  );
};

const mapDispatchToProps = {
  setOrganisationId: setOrganisation,
};

export default connect(null, mapDispatchToProps)(DrawerMenu);
