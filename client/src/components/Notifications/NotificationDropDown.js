import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import TextAvatar from "../TextAvatar/index";
import commentpost from "assets/icons/notification-icons/comment-post.svg";
import cmntflwpost from "../../assets/icons/notification-icons/comment-following-post.svg";
import likeheart from "../../assets/icons/notification-icons/like-heart.svg";
import sharedpost from "../../assets/icons/notification-icons/shared-post.svg";
import bell from "../../assets/icons/notification-icons/header-bell.svg";
import amt from "../../assets/icons/notification-icons/notification-amt.svg";
import gear from "../../assets/icons/notification-icons/gear-logo.svg";
import { theme, mq } from "constants/theme";
const DemoNotifications = [
  {
    author: "April Qoo",
    action: "commented on your post",
    path: "/feed",
    actionAvatar: commentpost,
    createdAt: "30 minutes ago",
    avatar: "AQ",
    online: true,
  },
  {
    author: "Kimi Rails",
    action: "shared your post",
    path: "/feed",
    actionAvatar: sharedpost,
    createdAt: "1 hour ago",
    avatar: "KR",
    online: true,
  },
  {
    author: "Jeremy Pan",
    action: "liked your post",
    path: "/feed",
    actionAvatar: likeheart,
    createdAt: "14 hours ago",
    avatar: "JP",
    online: true,
  },
  {
    author: "Sarah Sharp",
    action: "commented on a post you're following",
    path: "/feed",
    actionAvatar: cmntflwpost,
    createdAt: "Yesterday",
    avatar: "SS",
    online: false,
  },
  {
    author: "Jeremy Pan",
    action: "liked your post",
    path: "/feed",
    actionAvatar: likeheart,
    createdAt: "14 hours ago",
    avatar: "JP",
    online: true,
  },
  {
    author: "Sarah Sharp",
    action: "commented on a post you're following",
    path: "/feed",
    actionAvatar: cmntflwpost,
    createdAt: "Yesterday",
    avatar: "SS",
    online: false,
  },
  {
    author: "Jeremy Pan",
    action: "liked your post",
    path: "/feed",
    actionAvatar: likeheart,
    createdAt: "14 hours ago",
    avatar: "JP",
    online: true,
  },
  {
    author: "Sarah Sharp",
    action: "commented on a post you're following",
    path: "/feed",
    actionAvatar: cmntflwpost,
    createdAt: "Yesterday",
    avatar: "SS",
    online: false,
  },
];

// Menu Item
const ItemContainer = styled.a`
  position: relative;
  border-bottom: 1px solid rgba(225, 225, 225, 1);
  min-height: 5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  :hover {
    background-color: rgba(243, 244, 254, 0.8);
    color: inherit;
  }
  .action-avatar {
    position: absolute;
    top: 2.4em;
    left: 2.6em;
  }
  .ant-avatar {
    position: absolute;
    top: 0.6em;
  }
`;
const Content = styled.div`
  font-family: work sans;
  width: 70%;
  position: relative;
  left: 1em;
  margin: auto;
  div:first-child {
    font-size: 1em;
    padding-bottom: 3px;
    font-weight: 500;
    line-height: 1.2;
    > span {
      font-weight: 700;
    }
  }
  div:nth-child(2) {
    font-size: 0.75em;
    letter-spacing: 0.7px;
  }
`;
const Online = styled.div`
  visibility: ${({ online }) => (online === true ? "visible" : "hidden")};
`;

// Menu
const StyledMenu = styled(Menu)`
  position: absolute;
  top: 1.1em;
  width: 21.429em;
  height: 28.9em;
  border-radius: 10px;
  right: -2.993em;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    width: 100vw;
    height: 100vh;
    /* position: fixed;
    top: 2.9em;
    left: 0; */
    position: absolute;
    right: -5.8em;
  }
  a {
    padding: 0.5em 1em;
    letter-spacing: 1px;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      border-radius: 0px;
    }
  }
  .notifications-container {
    overflow: scroll;
    scroll-padding: 0px;
    scroll-margin: 0px;
    border-radius: 0 0 10px 10px;
    height: 25.15em;
    ::-webkit-scrollbar {
      display: none;
    }
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      border-radius: 0px !important;
      overflow: scroll;
      height: 87vh;
    }
  }
  .ant-dropdown-menu-item {
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      border-radius: 0px !important;
    }
  }
`;

const Arrow = styled.div`
  width: 1.5em;
  height: 2em;
  background: ${theme.colors.royalBlue};
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  position: relative;
  left: 3.89em;
  bottom: 1.3em;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
`;
const NoMoreNotifications = styled(ItemContainer)`
  background-color: rgba(245, 246, 251, 0.8);
  justify-content: center;
  font-size: 0.8em;
  border-radius: 0px 0px 10px 10px;
`;

const MenuItem = ({
  path,
  author,
  action,
  avatar,
  actionAvatar,
  createdAt,
  online,
}) => {
  return (
    <ItemContainer href={path}>
      <TextAvatar>{avatar}</TextAvatar>
      <img src={actionAvatar} className="action-avatar" />
      <Content>
        <div>
          <span>{author}</span> {action}
        </div>
        <div>{createdAt}</div>
      </Content>
      <Online online={online}>
        <img src={amt} />
      </Online>
    </ItemContainer>
  );
};

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: `${theme.colors.royalBlue}`,
  borderRadius: "10px 10px 0px 0px",
  position: "relative",
  bottom: "3.6px",
  color: "white",
  boxShadow: "0 4px 5px rgba(0,0,0,0.22)",
  padding: ".75em 1.3em",
};

const menu = (
  <StyledMenu>
    <Menu.Item style={{ ...itemStyle }}>
      <a style={{ color: "white" }}>Notifications</a>
      <Arrow />
      <Link to="/edit-account" style={{ color: "white", position: "relative" }}>
        <img src={gear} />
      </Link>
    </Menu.Item>
    <div className="notifications-container">
      <div>
        {DemoNotifications.map((each) => (
          <MenuItem
            path={each.path}
            author={each.author}
            action={each.action}
            actionAvatar={each.actionAvatar}
            createdAt={each.createdAt}
            avatar={each.avatar}
            online={each.online}
          />
        ))}
      </div>
      <NoMoreNotifications>No more notifications</NoMoreNotifications>
    </div>
  </StyledMenu>
);

export const StyledImg = styled.img`
  position: absolute;
  cursor: pointer;
  right: 3.2em;
  top: 1.2em;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    position: absolute;
    right: 5em;
    top: 0.6em;
  }
`;
export const StyledNum = styled.div`
  height: 17px;
  width: 17px;
  position: absolute;
  right: 4.5em;
  bottom: 3.1em;
  z-index: 999;
  font-size: 10px;
  letter-spacing: 1px;
  background-color: #ff5656;
  color: white;
  border-radius: 100%;
  padding: 1px;
  font-weight: 300;
  text-align: center;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    right: 7.4em;
    bottom: 2em;
  }
`;

export const NotificationDropDown = (props) => {
  return (
    <>
      <StyledNum>8</StyledNum>
      <Dropdown overlay={menu} visible placement="bottomRight">
        <StyledImg src={bell} />
      </Dropdown>
    </>
  );
};
