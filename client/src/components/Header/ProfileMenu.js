import React, { useState } from "react";
import { Dropdown } from "antd";

import { getInitialsFromFullName } from "utils/userInfo";
import { SettingMenu } from "./SettingMenu";
import { AccountMenu } from "./AccountMenu";
import { MENU_STATE, CustomAvatar } from "./constants";

export const ProfileMenu = ({
  user,
  organisationIndex,
  setOrganisation,
  onFeedbackIconClick,
}) => {
  const [menuState, setMenuState] = useState(MENU_STATE.CLOSED);
  const menu = renderMenu(
    menuState,
    setMenuState,
    user,
    setOrganisation,
    organisationIndex,
    onFeedbackIconClick,
  );
  const onVisibleChange = (visible) => {
    if (!visible) {
      setMenuState(MENU_STATE.CLOSED);
    }
  };
  return (
    <Dropdown
      overlay={menu}
      visible={menuState !== MENU_STATE.CLOSED}
      onVisibleChange={onVisibleChange}
      trigger={["click"]}
    >
      <CustomAvatar
        size={"small"}
        onClick={() => setMenuState(MENU_STATE.SETTINGS)}
      >
        {getInitialsFromFullName(`${user.firstName} ${user.lastName} `)}
      </CustomAvatar>
    </Dropdown>
  );
};

const renderMenu = (
  menuState,
  setMenuState,
  user,
  setOrganisation,
  organisationIndex,
  onFeedbackIconClick,
) => {
  if (menuState === MENU_STATE.SETTINGS) {
    return (
      <SettingMenu
        user={user}
        organisationIndex={organisationIndex}
        onFeedbackIconClick={onFeedbackIconClick}
        setMenuState={setMenuState}
      />
    );
  }
  if (menuState === MENU_STATE.ACCOUNTS) {
    return (
      <AccountMenu
        user={user}
        setOrganisation={setOrganisation}
        organisationIndex={organisationIndex}
        setMenuState={setMenuState}
      />
    );
  }
  return <div></div>;
};
