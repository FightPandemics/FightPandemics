import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authLogout } from "actions/authActions";

function Logout({ authLogout }) {
  useEffect(() => {
    authLogout();
  }, [authLogout]);
  return <Redirect to="/" />;
}

export default connect(null, { authLogout })(Logout);
