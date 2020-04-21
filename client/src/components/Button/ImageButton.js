import React, { useState } from "react";
import FeedbackButton from "./FeedbackButton";
import styled from "styled-components";

import { theme } from "../../constants/theme";

const { typography } = theme;

const DEFAULT_HEIGHT = 10;
const DEFAULT_WIDTH = 10;

const FlexDiv = styled.div`
  /* margin-top: 15px; */
  padding: 3rem;
  width: 24rem;
  height: ${24 / 1.25}rem;
  display: flex;
  align-items: center;
  flex-flow: column;
  text-align: center;
  font-family: ${typography.font.family.display};
  font-size: ${typography.size.large};
  font-weight: normal;
  line-height: 2.2rem;
`;

const NestedImage = styled.img.attrs((props) => {
  return {
    src: props.src,
    alt: props.alt,
  };
})`
  width: ${DEFAULT_WIDTH}rem;
  height: ${DEFAULT_HEIGHT}rem;
  margin: 0 auto 2rem;
`;

export default ({
  inactiveImg,
  activeImg,
  height = DEFAULT_HEIGHT,
  width = DEFAULT_WIDTH,
  children,
  ...props
}) => {
  const [src, toggleSrc] = useState(inactiveImg);
  return (
    <FeedbackButton
      onMouseEnter={() => toggleSrc(activeImg)}
      onMouseLeave={() => toggleSrc(inactiveImg)}
      style={{ height: "unset" }}
      inline
      {...props}
    >
      <FlexDiv>
        <NestedImage
          src={src}
          alt={
            typeof children === "string" || children instanceof String
              ? children
              : ""
          }
          height={height}
          width={width}
        />
        {children}
      </FlexDiv>
    </FeedbackButton>
  );
};
