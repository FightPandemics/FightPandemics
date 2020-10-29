import React from "react";
import { Redirect, Route } from "react-router-dom";

import LogoLayout from "./layouts/LogoLayout";
import NavigationLayout from "./layouts/NavigationLayout";
import NavlessLayout from "./layouts/NavlessLayout";
import { connect } from "react-redux";

export const HOME = "/";
export const LOGIN = "/auth/login";
export const LOGOUT = "/auth/logout";
export const FEED = "/feed";
export const CHECK_EMAIL = "/auth/check-email";
export const CREATE_PROFILE = "/create-profile";
export const PROFILE = "/profile";

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
  const {
    authError,
    authLoading,
    emailVerified,
    forgotPasswordRequested,
    isAuthenticated,
    path,
    props = {},
    user,
  } = route;
  const {
    loggedInOnly,
    notLoggedInOnly,
    tabIndex,
    mobiletabs,
    navSearch,
    forgotPassword,
  } = props;

  return (
    <Route
      path={path}
      render={({ layout, location, ...rest }) => {
        const Layout = getLayoutComponent(route.layout);
        let redirect;

        if (!authLoading) {
          // don't apply redirect if authLoading
          if (authError && location.pathname !== LOGOUT) {
            // logout as means to handle auth error edge cases
            redirect = LOGOUT;
          } else if (loggedInOnly && !isAuthenticated) {
            redirect = LOGIN;
          } else if (notLoggedInOnly && isAuthenticated) {
            //redirect to the appropriate post if View More or Comment clicked
            const postRedirect = sessionStorage.getItem("postredirect");
            if (postRedirect) {
              redirect = postRedirect;
              sessionStorage.removeItem("postredirect");
            } else {
              redirect = HOME;
            }
          } else if (
            forgotPasswordRequested &&
            location.pathname !== CHECK_EMAIL
          ) {
            redirect = CHECK_EMAIL;
          } else if (isAuthenticated) {
            if (
              !emailVerified &&
              location.pathname !== CHECK_EMAIL &&
              !forgotPassword
            ) {
              redirect = CHECK_EMAIL;
            }
            else if (
              emailVerified &&
              !user &&
              location.pathname !== CREATE_PROFILE
            ) {
              redirect = CREATE_PROFILE;
            }
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
            authLoading={authLoading}
            isAuthenticated={isAuthenticated}
            user={user}
            routes={route.routes}
            mobiletabs={mobiletabs}
            navSearch={navSearch}
            tabIndex={tabIndex}
          />
        );
      }}
    />
  );
};

const mapDispatchToProps = {};
const mapStateToProps = ({ session }) => ({
  authError: session.authError,
  authLoading: session.authLoading,
  emailVerified: session.emailVerified,
  forgotPasswordRequested: session.forgotPasswordRequested,
  isAuthenticated: session.isAuthenticated,
  user: session.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteWithSubRoutes);
