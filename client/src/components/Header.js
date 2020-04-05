import React from "react";
import { NavBar, Icon } from "antd-mobile";
import { Link } from "react-router-dom";

import logo from "../assets/logo.svg";
import Logo from "./Logo";

export default ({ onMenuClick, ...props }) => {
  return (
    <div className="header" {...props}>
      <NavBar
        mode="light"
        leftContent={
          <Link to="/">
            <Logo src={logo} alt="Fight Pandemics logo" />
          </Link>
        }
        rightContent={<Icon type="ellipsis" onClick={onMenuClick} />}
      />
    </div>
  );
};
