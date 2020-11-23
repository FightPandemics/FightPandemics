import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Menu, Dropdown } from "antd";
// import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ReactComponent as SubMenuIcon } from "assets/icons/submenu.svg";
import { ReactComponent as SaveIcon } from "assets/icons/save.svg";
import { ReactComponent as HideIcon } from "assets/icons/hide.svg";
import { ReactComponent as FollowIcon } from "assets/icons/follow.svg";
import { ReactComponent as ReportIcon } from "assets/icons/report.svg";

import { theme } from "constants/theme";

const { typography, colors } = theme;

const StyledMenu = styled(Menu).attrs(() => ({
  className: "Post-Dropdown-Menu",
}))`
  border-radius: 10px;
  box-shadow: 0 0 8px 0 #00000012;
  padding: 0 3rem;

  & > li:not(:last-child) {
    border-bottom: 0.5px solid ${colors.mediumGray};
  }
`;

const Item = styled.div.attrs(() => ({ className: "Post-Dropdown-Menu-Item" }))`
  display: flex;
  align-items: center;

  height: 5rem;
  min-width: 18.6rem;
`;

const Label = styled.div.attrs(() => ({
  className: "Post-Dropdown-Menu-Label",
}))`
  display: flex;
  flex-direction: column;
  font-family: ${typography.font.family.body};
  margin-left: 2rem;
`;

const Action = styled.span.attrs(() => ({
  className: "Post-Dropdown-Menu-Label-Action",
}))`
  color: ${colors.black};
  font-size: 1.4rem;
  font-weight: 400;
`;

const Caption = styled.span.attrs(() => ({
  className: "Post-Dropdown-Menu-Label-Caption",
}))`
  color: ${colors.darkGray};
  font-size: 1rem;
`;

const PostDropdownButton = ({
  onSelect,
  onSave,
  onFollow,
  onHide,
  onReport,
  postId,
  user,
  post,
}) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const ref = useRef(false);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const handleMenuItemClick = async (e) => {
    setVisible(false);
    setIsComponentVisible(!isComponentVisible);
  };

  const handleSubMenuClick = (e) => {
    setVisible(true);
    setIsComponentVisible(!isComponentVisible);
  };

  const menu = postId ? (
    <StyledMenu onClick={handleMenuItemClick}>
      <Menu.Item onClick={onSave} key="save">
        <Item>
          <SaveIcon />
          <Label>
            <Action>Save Post</Action>
            <Caption>Add this to your saved posts</Caption>
          </Label>
        </Item>
      </Menu.Item>
      <Menu.Item onClick={onFollow} key="follow">
        <Item>
          <FollowIcon />
          <Label>
            <Action>Follow Post</Action>
            <Caption>Turn on notifications</Caption>
          </Label>
        </Item>
      </Menu.Item>
      <Menu.Item onClick={onHide} key="hide">
        <Item>
          <HideIcon />
          <Label>
            <Action>Hide Post</Action>
            <Caption>It is not relevant to me</Caption>
          </Label>
        </Item>
      </Menu.Item>
      <Menu.Item onClick={onReport} key="report">
        <Item>
          <ReportIcon />
          <Label>
            <Action>Report Post</Action>
            <Caption>Placeholder text</Caption>
          </Label>
        </Item>
      </Menu.Item>
    </StyledMenu>
  ) : (
    <StyledMenu onClick={handleMenuItemClick}>
      <Menu.Item onClick={onSave} key="save">
        <Item>
          <SaveIcon />
          <Label>
            <Action>Save Post</Action>
            <Caption>Add this to your saved posts</Caption>
          </Label>
        </Item>
      </Menu.Item>
      <Menu.Item onClick={onFollow} key="follow">
        <Item>
          <FollowIcon />
          <Label>
            <Action>Follow Post</Action>
            <Caption>Turn on notifications</Caption>
          </Label>
        </Item>
      </Menu.Item>
      <Menu.Item onClick={onHide} key="hide">
        <Item>
          <HideIcon />
          <Label>
            <Action>Hide Post</Action>
            <Caption>It is not relevant to me</Caption>
          </Label>
        </Item>
      </Menu.Item>
      <Menu.Item onClick={onReport} key="report">
        <Item>
          <ReportIcon />
          <Label>
            <Action>Report Post</Action>
            <Caption>Placeholder text</Caption>
          </Label>
        </Item>
      </Menu.Item>
    </StyledMenu>
  );

  const DropDownMenu = () => {
    return (
      <div ref={null}>
        {isComponentVisible ? (
          <Dropdown
            style={{ position: "fixed" }}
            onVisibleChange={handleSubMenuClick}
            onBlur={() => {
              setVisible(false);
            }}
            visible={visible}
            overlay={menu}
          >
            <div className="ant-dropdown-link" onClick={handleSubMenuClick}>
              <SubMenuIcon />
            </div>
          </Dropdown>
        ) : (
          <div className="ant-dropdown-link" onClick={handleSubMenuClick}>
            <SubMenuIcon />
          </div>
        )}
      </div>
    );
  };
  return <DropDownMenu />;
};

export default PostDropdownButton;
