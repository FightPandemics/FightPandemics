import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { authLogout } from "actions/authActions";
const Logout = ({ authLogout }) => {
  const savetosession = () => {
    sessionStorage.setItem("loggedInFlag", false);
  };
  useEffect(() => {
    authLogout();
  }, [authLogout]);
  savetosession();
  return <Redirect to="/" />;
};

const mapDispatchToProps = {
  authLogout,
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
