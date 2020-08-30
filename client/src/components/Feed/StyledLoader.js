import React from "react";
import styled from "styled-components";
import SvgIcon from "components/Icon/SvgIcon";
import loader from "assets/icons/loader.gif";

const StyledSvg = styled(SvgIcon)`
  display:block;
  margin: 10rem auto;
  text-align: center;
  font-size: 2rem;
  width: 3em;
  height: 3em;
  position: relative;
  text-indent: -9999em;
}
`;

const Loader = () => <StyledSvg src={loader} />;

export default Loader;
