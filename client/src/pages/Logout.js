import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { authLogout } from "actions/authActions"

const Logout = ({ authLogout, isAuthenticated }) => {
  useEffect(() => {
    authLogout();
  }, [authLogout]);
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  return <div>Logging out...</div>
  // TODO: add error handling
}

const mapDispatchToProps = {
  authLogout,
};

const mapStateToProps = ({ session: { isAuthenticated } }) => {
  return {
    isAuthenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
