import React from "react";
import styled from "styled-components";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ReactComponent as SubMenuIcon } from "assets/icons/submenu.svg";
import { ReactComponent as SaveIcon } from "assets/icons/save.svg";
import { ReactComponent as HideIcon } from "assets/icons/hide.svg";
import { ReactComponent as FollowIcon } from "assets/icons/follow.svg";
import { ReactComponent as ReportIcon } from "assets/icons/report.svg";
import { ReactComponent as EditIcon } from "assets/icons/edit-grey.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/hide.svg";

import { theme } from "constants/theme";

const { typography, colors } = theme;

const StyledMenu = styled(Menu)`
  border-radius: 10px;
  box-shadow: 0 0 8px 0 #00000022;

  & > li:not(:last-child) {
    border-bottom: 0.5px solid ${colors.mediumGray};
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 5rem;
  min-width: 18.6rem;
`;

const Label = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${typography.font.family.body};
  margin-left: 2rem;
`;

const Action = styled.span`
  color: ${colors.black};
  font-size: 1.4rem;
  font-weight: 400;
`;

const Caption = styled.span`
  color: ${colors.darkGray};
  font-size: 1rem;
`;

const PostDropdownButton = ({
  onSave,
  onFollow,
  onHide,
  onReport,
  onEdit,
  onDelete,
  postId,
  post,
  user,
  isOwner,
  isSelf,
}) => {
  const { t } = useTranslation();

  const menu = (
    <StyledMenu>
      {isSelf ? (
        <>
          {postId ? (
            <Menu.Item onClick={onEdit}>
              <Item>
              <EditIcon />
                <Label>
                  <Action>{t("comment.edit")}</Action>
                  <Caption>Edit your post</Caption>
                </Label>
              </Item>
            </Menu.Item>
          ) : (
            <Menu.Item>
              <Link
                to={{
                  pathname: `/post/${post?._id}`,
                  state: {
                    post: post,
                    postId: post?._id,
                    edit: true,
                    from: window.location.href,
                    user,
                  },
                }}
              >
                <Item>
                <EditIcon />
                  <Label>
                    <Action>{t("comment.edit")}</Action>
                    <Caption>Edit your post</Caption>
                  </Label>
                </Item>
              </Link>
            </Menu.Item>
          )}
          <Menu.Item onClick={onDelete}>
            <Item>
              <DeleteIcon/>
              <Label>
                <Action style={{"color":"red"}}>{t("comment.delete")}</Action>
                <Caption>Delete your post</Caption>
              </Label>
            </Item>
          </Menu.Item>
        </>
      ) : (
        <>
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
        </>
      )}
    </StyledMenu>
  );

  return (
    <>
      {(!isOwner || (isOwner && isSelf)) && ( // user looking at owned org post, or vice versa
        <Dropdown
          style={{ position: "fixed" }}
          trigger={["click"]}
          overlay={menu}
        >
          <div className="ant-dropdown-link">
            <SubMenuIcon />
          </div>
        </Dropdown>
      )}
    </>
  );
};

export default PostDropdownButton;
