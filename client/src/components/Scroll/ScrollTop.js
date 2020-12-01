import { useState, useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  const [flag, setFlag] = useState(true);

  window.onbeforeunload = function () {
    setFlag(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, flag]);

  return null;
}

export default withRouter(ScrollToTop);
