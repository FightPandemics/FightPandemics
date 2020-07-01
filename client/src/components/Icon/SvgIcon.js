import React from "react";
import styled from "styled-components";
import { mq } from "../../constants/theme";

const StyledImg = styled.img`
  &.is-clickable {
    cursor: pointer;
  }

  @media screen and (min-width: ${mq.desktop.extra.minWidth}) {
    width: 80px;
    height: auto;
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
