import React from "react";
import styled from "styled-components";
import { theme, mq } from "constants/theme";

const { colors, typography } = theme;
const { font, size } = typography;

const StyledBanner = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;
  user-select: none;
  background: ${colors.royalBlue};
  border-radius: 8px;
  font-family: ${font.family.display};
  font-style: normal;
  font-weight: bold;
  font-size: ${size.large};
  color: ${colors.white};
  padding: 1.5rem 3rem;
  p {
    font-weight: normal;
    font-size: ${size.small};
    margin-bottom: 0;
  }
  svg {
    position: absolute;
    right: 3rem;
    top: 50%;
    transform: translateY(calc(50% - 20px)); /* 20px === fixed Height of the SVG */
  }
`;

export default StyledBanner;
