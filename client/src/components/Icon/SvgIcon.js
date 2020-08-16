import React from "react";
import styled from "styled-components";

const StyledImg = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  margin: 0 !important;
  &.is-clickable {
    cursor: pointer;
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
