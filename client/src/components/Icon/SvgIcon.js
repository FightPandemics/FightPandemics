import React from "react";
import styled from "styled-components";

const StyledImg = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  &.is-clickable {
    cursor: pointer;
  }
`;

const SvgIcon = ({ className, src, ...props }) => (
  <StyledImg
    {...props}
    alt="Icon"
    className={props.onClick ? `${className} is-clickable` : className}
    src={src}
  />
);

export default SvgIcon;
