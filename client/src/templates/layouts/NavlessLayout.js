import React from "react";

import CookieAlert from "components/CookieAlert";

const NavlessLayout = (props) => {
  return (
    <>
      <div>
        <props.component {...props} />
      </div>
      <CookieAlert />
    </>
  );
};

export default NavlessLayout;
