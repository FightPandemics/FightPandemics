import React from "react";
import { Redirect, Route } from "react-router-dom";

import LogoLayout from "./layouts/LogoLayout";
import NavigationLayout from "./layouts/NavigationLayout";

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
export const RouteWithSubRoutes = (route) => {
  const switchLayout = (layout, props) => {
    switch (layout) {
      case "logo":
        return (
          <LogoLayout
            {...props}
            component={route.component}
            routes={route.routes}
          />
        );
      default:
        return (
          <NavigationLayout
            {...props}
            component={route.component}
            routes={route.routes}
          />
        );
    }
  };

  return (
    <Route
      path={route.path}
      render={(props) => {
        return !props.isPrivate || props.isAuthenticated ? (
          // pass the sub-routes down to keep nesting
          switchLayout(route.layout, { ...props, ...route.props })
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};
