import React from "react";
import styled from "styled-components";
import { theme } from "constants/theme";
import { Menu, Dropdown } from "antd";
import { useTranslation } from "react-i18next";

const StyledLabel = styled.div`
  margin: 1.2rem 0.1rem 0.8rem 0.9rem;
  padding: 1.6rem 1.29rem;
  font-size: ${theme.typography.size.large};
  color: ${(props) =>
    props?.disabled
      ? theme.colors.mediumGray
      : props?.searchRange
      ? theme.colors.royalBlue
      : theme.colors.black};
  font-weight: ${(props) => (props?.searchRange ? "bold" : "normal")};
  :hover {
    cursor: ${(props) => (props?.disabled ? "auto" : "pointer")};
  }
`;

export const StyledDropDownNearMe = ({
  searchRange,
  setSearchRange,
  disabled,
}) => {
  const checkmark = "✔  ";
  const rangeSelection = {
    range2km: "2km",
    range5km: "5km",
    range30km: "30km",
    rangeCity: "myCity",
    rangeState: "myState",
    rangeCountry: "myCountry",
    disableRange: "",
  };
  const { t } = useTranslation();

  const menuNearMe = (
    <Menu onClick={({ key }) => setSearchRange(rangeSelection[key])}>
      {Object.keys(rangeSelection).map((key) => (
        <Menu.Item key={key}>
          {searchRange === rangeSelection[key] ? checkmark : ""}
          {t(`feed.filters.${key}`)}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={menuNearMe} disabled={disabled}>
      <StyledLabel searchRange={searchRange} disabled={disabled}>
        {t("feed.filters.nearMe")}
      </StyledLabel>
    </Dropdown>
  );
};
