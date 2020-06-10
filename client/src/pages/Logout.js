import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authLogout } from "actions/authActions";

function Logout({ logout }) {
  useEffect(() => {
    logout();
  }, [logout]);
  return <Redirect to="/" />;
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(authLogout()),
});

export default connect(null, mapDispatchToProps)(Logout);
