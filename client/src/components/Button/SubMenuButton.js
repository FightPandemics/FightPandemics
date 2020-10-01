import React, { useState, useEffect, useRef } from "react";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ReactComponent as SubMenuIcon } from "assets/icons/submenu.svg";

const SubMenuButton = ({ onSelect, onChange, postId, user, post }) => {
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
    <Menu onClick={handleMenuItemClick}>
      <Menu.Item onClick={onSelect} key="edit">
        {t("comment.edit")}
      </Menu.Item>
      <Menu.Item onClick={onChange} key="delete">
        {t("comment.delete")}
      </Menu.Item>
    </Menu>
  ) : (
    <Menu onClick={handleMenuItemClick}>
      <Menu.Item onClick={onSelect} key="edit">
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
          {t("comment.edit")}
        </Link>
      </Menu.Item>
      <Menu.Item onClick={onChange} key="delete">
        {t("comment.delete")}
      </Menu.Item>
    </Menu>
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

export default SubMenuButton;
