// Core
import React from "react";

const HideFeature = (props) => {
  if (process.env.NODE_ENV !== "development") {
    return <></>;
  } else {
    return <>{props.children}</>;
  }
};

export default HideFeature;
