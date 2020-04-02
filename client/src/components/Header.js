import React from "react";
import { NavBar, Icon } from 'antd-mobile';
import { Link, NavLink } from "react-router-dom";

import logo from "../assets/logo.svg";
import Logo from "./Logo";

export default ({ onMenuClick }) => {
  return (
    <div className="header">
      <NavBar
        mode="light"
        leftContent={
          <Link to="/">
            <Logo src={logo} alt="Fight Pandemics logo" />
          </Link>
        }
        rightContent={
          <Icon type="ellipsis" onClick={onMenuClick} />
        }
      />
    </div>
  );
};
