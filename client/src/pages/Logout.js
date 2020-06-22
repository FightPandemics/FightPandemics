import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { authLogout } from "actions/authActions"

const Logout = ({ authLogout }) => {
  useEffect(() => {
    authLogout();
  }, [authLogout]);
  return <Redirect to="/" />;
}

const mapDispatchToProps = {
  authLogout,
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
