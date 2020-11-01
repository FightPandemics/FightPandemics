import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { MENU_STATE } from "./constants";
import { getInitialsFromFullName } from "utils/userInfo";
import { Avatar } from "components/Avatar";
import { ProfileItem } from "./ProfileMenu";
import GTM from "constants/gtm-tags";
import { Divider, NavItem, CustomSvgIcon } from "./components";

import BackIcon from "assets/icons/back-white.svg";
import PlusIcon from "assets/icons/plus.svg";

export const AccountMenu = ({ user, isAuthenticated, setMenuState }) => {
  const { t } = useTranslation();
  if (!isAuthenticated) {
    return null;
  }
  const anyOrganisation = user?.organisations?.length > 0;
  const organisations = user?.organisations;
  return (
    <>
      <NavItem onClick={() => setMenuState(MENU_STATE.SETTINGS)}>
        <CustomSvgIcon src={BackIcon} />
        {t("common.switchAccount")}
      </NavItem>
      <Divider />
      <NavItem>
        <ProfileItem user={user} />
      </NavItem>
      {anyOrganisation && <Divider />}
      <NavItem size="small">{t("common.myOrganisation")}</NavItem>
      {organisations?.map((current) => (
        <NavItem key={current._id}>
          <Avatar type="mobile" size="small">
            {getInitialsFromFullName(current.name)}
          </Avatar>
          {current.name}
        </NavItem>
      ))}
      <Divider />
      <NavItem>
        <CustomSvgIcon src={PlusIcon} />
        <Link
          id={GTM.nav.prefix + GTM.nav.addOrg}
          to="/create-organisation-profile"
        >
          {t("common.addOrg")}
        </Link>
      </NavItem>
    </>
  );
};
