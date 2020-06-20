import React from "react";
import { Redirect, Route } from "react-router-dom";

import LogoLayout from "./layouts/LogoLayout";
import NavigationLayout from "./layouts/NavigationLayout";
import NavlessLayout from "./layouts/NavlessLayout";
import { connect } from "react-redux";

export const HOME = "/";
export const LOGIN = "/auth/login";
export const VERIFY_EMAIL = "/auth/verify-email";
export const CREATE_PROFILE = "/create-profile";

const getLayoutComponent = (layout) => {
  switch (layout) {
    case "logo":
      return LogoLayout;
    case "navless":
      return NavlessLayout;
    default:
      return NavigationLayout;
  }
};

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
export const RouteWithSubRoutes = (route) => {
  const { emailVerified, isAuthenticated, path, props = {}, user } = route;
  const {
    loggedInOnly,
    notLoggedInOnly,
    tabIndex,
    mobiletabs,
    forgotPassword,
  } = props;

  return (
    <Route
      path={path}
      render={({ layout, location, ...rest }) => {
        const Layout = getLayoutComponent(route.layout);
        let redirect;

        if (loggedInOnly && !isAuthenticated) {
          redirect = LOGIN;
        } else if (notLoggedInOnly && isAuthenticated) {
          redirect = HOME;
        } else if (isAuthenticated) {
          if (
            !emailVerified &&
            location.pathname !== VERIFY_EMAIL &&
            !forgotPassword
          ) {
            redirect = VERIFY_EMAIL;
          } else if (emailVerified && forgotPassword) {
            redirect = LOGIN;
          } else if (
            emailVerified &&
            !user &&
            location.pathname !== CREATE_PROFILE
          ) {
            redirect = CREATE_PROFILE;
          }
        }

        return redirect ? (
          <Redirect
            to={{
              pathname: redirect,
              state: { from: location },
            }}
          />
        ) : (
          <Layout
            {...rest}
            {...route.props}
            component={route.component}
            isAuthenticated={isAuthenticated}
            user={user}
            routes={route.routes}
            mobiletabs={mobiletabs}
            tabIndex={tabIndex}
          />
        );
      }}
    />
  );
};

const mapDispatchToProps = {};
const mapStateToProps = ({ session }) => ({
  emailVerified: session.emailVerified,
  isAuthenticated: session.isAuthenticated,
  user: session.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteWithSubRoutes);
