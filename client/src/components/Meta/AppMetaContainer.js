import React from "react";
import { Helmet } from "react-helmet-async";

const TITLE = "FightPandemics";
const DESCRIPTION =
  "A place to offer and request help. Pandemics will continue to happen. We help communities prepare and respond. Offer Help. Request Help.";

const AppMetaContainer = () => (
  <Helmet>
    {/* Primary Meta Tags */}
    <meta name="title" content={TITLE} />
    <meta name="description" content={DESCRIPTION} />
    {/* Open Graph / Facebook */}
    <meta property="og:title" content={TITLE} />
    <meta property="og:description" content={DESCRIPTION} />
    <meta property="og:url" content={window.location.origin} />
    {/* Twitter */}
    <meta property="twitter:title" content={TITLE} />
    <meta property="twitter:description" content={DESCRIPTION} />
    <meta property="twitter:url" content={window.location.origin} />
  </Helmet>
);

export default AppMetaContainer;
