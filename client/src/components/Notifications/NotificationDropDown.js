import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import TextAvatar from "../TextAvatar/index";
import commentpost from "assets/icons/notification-icons/comment-post.svg";
import cmntflwpost from "../../assets/icons/notification-icons/comment-following-post.svg";
import likeheart from "../../assets/icons/notification-icons/like-heart.svg";
import sharedpost from "../../assets/icons/notification-icons/shared-post.svg";
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
    top: 2.8em;
    left: 3.5em;
  }
`;
const Content = styled.div`
  width: 60%;
  position: absolute;
  top: 1.2em;
  right: 3em;
  div:first-child {
    font-size: 0.85em;
    padding-bottom: 3px;
    font-weight: 500;
    line-height: 1.3;
    > span {
      font-weight: 700;
    }
  }
  div:nth-child(2) {
    font-size: 0.75em;
  }
`;
const Online = styled.div`
  visibility: ${({ online }) => (online === true ? "visible" : "hidden")};
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
  const now = Date.now();

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
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="4" cy="4" r="4" fill="#22D9A2" />
        </svg>
      </Online>
    </ItemContainer>
  );
};

// Menu
const StyledMenu = styled(Menu)`
  position: relative;
  left: 3em;
  top: 1em;
  a {
    padding: 1em 1.5em;
    letter-spacing: 1px;
  }
`;

const menuStyle = {
  width: "300px",
  height: "390px",
  borderRadius: "10px",
  overflow: "hidden",
};
const Arrow = styled.div`
  width: 1.5em;
  height: 2em;
  background: #425af2;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  right: 4.7em;
  top: 3.3em;
`;
const NoMoreNotifications = styled(ItemContainer)`
  background-color: rgba(245, 246, 251, 0.8);
  justify-content: center;
  font-size: 0.8em;
`;

const menu = (
  <StyledMenu style={{ ...menuStyle }}>
    <Menu.Item
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#425AF2",
        borderRadius: "10px 10px 0px 0px",
        position: "relative",
        bottom: "3.6px",
        color: "white",
        boxShadow: "0 4px 5px rgba(0,0,0,0.22)",
      }}
    >
      <a style={{ color: "white" }}>Notifications</a>
      <Link
        to="/edit-account"
        style={{ color: "white", position: "relative", top: ".2em" }}
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.4444 7.06675L14.5833 6.5112C14.4547 6.06193 14.2777 5.62791 14.0556 5.21675L14.9667 3.5112C15.0009 3.44682 15.0134 3.37313 15.0024 3.30107C14.9914 3.22902 14.9574 3.16243 14.9056 3.1112L13.5778 1.77786C13.5265 1.72601 13.46 1.69206 13.3879 1.68105C13.3158 1.67005 13.2422 1.68256 13.1778 1.71675L11.4833 2.62231C11.0681 2.38934 10.6284 2.20302 10.1722 2.06675L9.61667 0.227863C9.59317 0.160094 9.54877 0.101529 9.48987 0.0605972C9.43097 0.0196655 9.3606 -0.0015218 9.28889 8.50938e-05H7.41111C7.33897 0.000420968 7.26881 0.023771 7.21086 0.0667369C7.15291 0.109703 7.11018 0.170042 7.08889 0.238974L6.53333 2.07231C6.07334 2.20785 5.62987 2.39418 5.21111 2.62786L3.54444 1.72786C3.48007 1.69368 3.40638 1.68116 3.33432 1.69217C3.26227 1.70317 3.19568 1.73712 3.14444 1.78897L1.79444 3.10564C1.74259 3.15687 1.70865 3.22346 1.69764 3.29552C1.68663 3.36758 1.69915 3.44126 1.73333 3.50564L2.63333 5.17231C2.40003 5.5893 2.21371 6.03089 2.07778 6.48897L0.238889 7.04453C0.169957 7.06582 0.109618 7.10855 0.0666518 7.1665C0.0236859 7.22446 0.000335874 7.29461 0 7.36675V9.24453C0.000335874 9.31667 0.0236859 9.38683 0.0666518 9.44478C0.109618 9.50273 0.169957 9.54546 0.238889 9.56675L2.08889 10.1223C2.2263 10.5728 2.4126 11.0068 2.64444 11.4168L1.73333 13.1612C1.69915 13.2256 1.68663 13.2993 1.69764 13.3713C1.70865 13.4434 1.74259 13.51 1.79444 13.5612L3.12222 14.889C3.17346 14.9408 3.24004 14.9748 3.3121 14.9858C3.38416 14.9968 3.45784 14.9843 3.52222 14.9501L5.23889 14.0334C5.64498 14.2525 6.07334 14.4276 6.51667 14.5556L7.07222 16.4279C7.09351 16.4968 7.13624 16.5571 7.19419 16.6001C7.25215 16.6431 7.3223 16.6664 7.39444 16.6668H9.27222C9.34437 16.6664 9.41452 16.6431 9.47247 16.6001C9.53043 16.5571 9.57316 16.4968 9.59445 16.4279L10.15 14.5501C10.5895 14.4214 11.0141 14.2463 11.4167 14.0279L13.1444 14.9501C13.2088 14.9843 13.2825 14.9968 13.3546 14.9858C13.4266 14.9748 13.4932 14.9408 13.5444 14.889L14.8722 13.5612C14.9241 13.51 14.958 13.4434 14.969 13.3713C14.98 13.2993 14.9675 13.2256 14.9333 13.1612L14.0111 11.439C14.2319 11.0349 14.4088 10.6084 14.5389 10.1668L16.4111 9.6112C16.48 9.58991 16.5404 9.54718 16.5833 9.48922C16.6263 9.43127 16.6497 9.36112 16.65 9.28897V7.39453C16.6533 7.32545 16.6353 7.25702 16.5986 7.19842C16.5619 7.13983 16.5081 7.09389 16.4444 7.06675ZM8.35 11.389C7.74567 11.389 7.15491 11.2098 6.65242 10.874C6.14994 10.5383 5.7583 10.0611 5.52704 9.50273C5.29577 8.9444 5.23526 8.33003 5.35316 7.73731C5.47106 7.14459 5.76207 6.60014 6.1894 6.17281C6.61672 5.74549 7.16117 5.45447 7.75389 5.33658C8.34661 5.21868 8.96098 5.27919 9.51931 5.51045C10.0776 5.74172 10.5549 6.13336 10.8906 6.63584C11.2264 7.13833 11.4056 7.72909 11.4056 8.33342C11.4056 9.1438 11.0836 9.92099 10.5106 10.494C9.93758 11.0671 9.16038 11.389 8.35 11.389Z"
            fill="white"
          />
        </svg>
      </Link>
    </Menu.Item>
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
  </StyledMenu>
);

export const NotificationDropDown = (props) => {
  return (
    <>
      <Arrow />
      <Dropdown overlay={menu} placement="bottomRight">
        <svg
          style={{ position: "relative", top: "4px", cursor: "pointer" }}
          width="19"
          height="19"
          viewBox="0 0 19 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.33333 23.668C10.6167 23.668 11.6667 22.618 11.6667 21.3346H7C7 22.618 8.05 23.668 9.33333 23.668ZM16.3333 16.668V10.8346C16.3333 7.25297 14.4317 4.25464 11.0833 3.4613V2.66797C11.0833 1.69964 10.3017 0.917969 9.33333 0.917969C8.365 0.917969 7.58333 1.69964 7.58333 2.66797V3.4613C4.24667 4.25464 2.33333 7.2413 2.33333 10.8346V16.668L0 19.0013V20.168H18.6667V19.0013L16.3333 16.668ZM14 17.8346H4.66667V10.8346C4.66667 7.9413 6.42833 5.58464 9.33333 5.58464C12.2383 5.58464 14 7.9413 14 10.8346V17.8346Z"
            fill="#425AF2"
          />
        </svg>
      </Dropdown>
    </>
  );
};
