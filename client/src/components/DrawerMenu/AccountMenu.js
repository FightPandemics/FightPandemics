import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { MENU_STATE } from "./constants";
import { getInitialsFromFullName } from "utils/userInfo";
import { Avatar } from "components/Avatar";
import GTM from "constants/gtm-tags";
import { Divider, NavItem, CustomSvgIcon } from "./components";

import BackIcon from "assets/icons/back-white.svg";
import PlusIcon from "assets/icons/plus.svg";
import DoneIcon from "assets/icons/done-white.svg";

const StyledAvatar = styled(Avatar)`
  img {
    width: 100%;
    height: 100%;
  }
`;

export const AccountMenu = ({
  user,
  isAuthenticated,
  setMenuState,
  organisationId,
  setOrganisationId,
}) => {
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
      <NavItem onClick={() => setOrganisationId(null)}>
        <StyledAvatar src={user.photo} size={"small"}>
          {getInitialsFromFullName(`${user.firstName} ${user.lastName} `)}
        </StyledAvatar>
        {`${user?.firstName} ${user?.lastName} `}
        {!organisationId && (
          <CustomSvgIcon className={"check-icon"} src={DoneIcon} />
        )}
      </NavItem>
      {anyOrganisation && (
        <>
          <Divider />
          <NavItem size="small">{t("common.myOrganisation")}</NavItem>
        </>
      )}
      {organisations?.map((current) => (
        <NavItem
          key={current._id}
          onClick={() => setOrganisationId(current._id)}
        >
          <StyledAvatar type="mobile" src={current.photo} size="small">
            {getInitialsFromFullName(current.name)}
          </StyledAvatar>
          {current.name}
          {organisationId === current._id && (
            <CustomSvgIcon className={"check-icon"} src={DoneIcon} />
          )}
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
