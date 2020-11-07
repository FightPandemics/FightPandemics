import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Badge } from "antd";
import { Trans, useTranslation } from "react-i18next";
import TextAvatar from "../TextAvatar/index";
import commentpost from "assets/icons/notification-icons/comment-post.svg";
import cmntflwpost from "../../assets/icons/notification-icons/comment-following-post.svg";
import likeheart from "../../assets/icons/notification-icons/like-heart.svg";
import sharedpost from "../../assets/icons/notification-icons/shared-post.svg";
import bell from "../../assets/icons/notification-icons/header-bell.svg";
import amt from "../../assets/icons/notification-icons/notification-amt.svg";
import gear from "../../assets/icons/notification-icons/gear-logo.svg";
import { theme, mq } from "constants/theme";
import relativeTime from "utils/relativeTime";
import { getInitialsFromFullName } from "utils/userInfo";
import { WebSocketContext } from "context/WebsocketContext";

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
    overflow: hidden;
    text-overflow: ellipsis;
    > span {
      font-weight: 700;
      white-space: nowrap;
    }
  }
  div:nth-child(2) {
    font-size: 0.75em;
    letter-spacing: 0.7px;
  }
`;
const Unread = styled.div`
  visibility: ${({ unread }) => (unread === true ? "visible" : "hidden")};
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
    width: 90vw;
    height: 90vh;
    position: absolute;
    border-radius: 0px;
    top: 0.7em;
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
      height: 85.8vh;
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
  left: 2.95em;
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
const StyledBadge = styled(Badge)`
  display: ${(props) => (props.mobile ? "none" : "initial")};
  position: relative;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: ${(props) => (props.mobile ? "initial" : "none")};
    position: absolute;
    top: 1.05em;
    right: 6em;
  }
`;
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

const MenuItem = ({
  path,
  author,
  action,
  avatar,
  actionAvatar,
  createdAt,
  postTitle,
  unread,
  sharedVia,
  t,
}) => {
  return (
    <ItemContainer href={path}>
      <TextAvatar src={avatar}>{getInitialsFromFullName(author)}</TextAvatar>
      <img src={actionAvatar} className="action-avatar" />
      <Content>
        <div>
          <Trans
            i18nKey={action}
            components={[<span />, <span />, <span />]}
            values={{ username: author, postTitle, shareMedium: sharedVia }}
          ></Trans>
        </div>
        <div>{createdAt}</div>
      </Content>
      <Unread unread={unread}>
        <img src={amt} />
      </Unread>
    </ItemContainer>
  );
};

const menu = (notifications, t) => {
  return (
    <StyledMenu>
      <Menu.Item style={{ ...itemStyle }}>
        <a style={{ color: "white" }}>{t("notifications.header")}</a>
        <Arrow />
        <Link
          to="/edit-notifications"
          style={{ color: "white", position: "relative" }}
        >
          <img src={gear} />
        </Link>
      </Menu.Item>
      <div className="notifications-container">
        <div>
          {notifications.map((each) => (
            <MenuItem
              path={each.path}
              author={each.author}
              action={each.action}
              postTitle={each.postTitle}
              actionAvatar={each.actionAvatar}
              createdAt={each.createdAt}
              avatar={each.avatar}
              unread={each.unread}
              sharedVia={each.sharedVia}
              t={t}
            />
          ))}
        </div>
        <NoMoreNotifications>No more notifications</NoMoreNotifications>
      </div>
    </StyledMenu>
  );
};

export const NotificationDropDown = ({ mobile, notifications }) => {
  const { markNotificationsAsRead } = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const Visible = (e) => {
    setTimeout(() => {
      if (e && document.querySelector(".ant-dropdown-menu") !== null) {
        return (document.querySelector(
          ".ant-dropdown-menu",
        ).parentElement.style.position = "fixed");
      }
    }, 100);
  };

  const updateReadAt = () => {
    dispatch({ type: "LOCAL_NOTIFICATIONS_MARK_AS_READ" });
  };

  const notificationTypes = {
    like: {
      text: "notifications.liked",
      icon: likeheart,
    },
    comment: {
      text: "notifications.commented",
      icon: commentpost,
    },
    share: {
      text: "notifications.shared",
      icon: sharedpost,
    },
  };

  const mappedNotifications = notifications.map((n) => ({
    author: n.triggeredBy.name,
    action: notificationTypes[n.action].text,
    postTitle: n.post.title,
    path: `/post/${n.post.id}`,
    actionAvatar: notificationTypes[n.action].icon,
    createdAt: relativeTime(n.createdAt),
    avatar: n.triggeredBy.photo,
    sharedVia: n.sharedVia,
    unread: !n.readAt,
  }));

  return (
    <Dropdown
      onVisibleChange={(visible) =>
        visible ? markNotificationsAsRead() : updateReadAt()
      }
      overlay={menu(mappedNotifications, t)}
      trigger="click"
      placement="bottomRight"
    >
      <a>
        <StyledBadge
          mobile={mobile}
          count={notifications.filter((n) => !n.readAt).length}
        >
          <img src={bell} />
        </StyledBadge>
      </a>
    </Dropdown>
  );
};
