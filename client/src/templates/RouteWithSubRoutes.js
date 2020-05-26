import React from "react";
import { Redirect, Route } from "react-router-dom";

import LogoLayout from "./layouts/LogoLayout";
import NavigationLayout from "./layouts/NavigationLayout";
import NavlessLayout from "./layouts/NavlessLayout";
import { connect } from "react-redux";

const HOME = "/";
const LOGIN = "/auth/login";
const VERIFY_EMAIL = "/auth/verify-email";

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
  const { emailVerified, isAuthenticated, path, props = {} } = route;
  const { loggedInOnly, notLoggedInOnly, tabIndex, mobiletabs } = props;

  return (
    <Route
      path={path}
      render={({ layout, location, ...rest }) => {
        const Layout = getLayoutComponent(route.layout);
        let redirect;
        // todo: cover all different cases, ensure all the props in the routes config are set correctly
        //  maybe use LoggedIn, NotLoggedIn, Route components
        //  or maybe even a state machine to simplify this logic
        if (loggedInOnly && !isAuthenticated) {
          redirect = LOGIN;
        } else if (notLoggedInOnly && isAuthenticated) {
          redirect = HOME;
        } else if (
          isAuthenticated &&
          !emailVerified &&
          location.pathname !== VERIFY_EMAIL
        ) {
          redirect = VERIFY_EMAIL;
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
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteWithSubRoutes);
