import React from "react";
import styled from "styled-components";

const StyledImg = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  &.is-clickable {
    cursor: pointer;
  }

  &.globe-icon-svg {
    height: 2rem;
    margin-left: 1rem;
  }
`;

const SvgIcon = ({ alt = "Icon", className, src, ...props }) => (
  <StyledImg
    {...props}
    alt={alt}
    className={props.onClick ? `${className} is-clickable` : className}
    src={src}
  />
);

export default SvgIcon;
