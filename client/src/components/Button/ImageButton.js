import React from "react";
import FeedbackButton from "./FeedbackButton";
import styled from "styled-components";

import { theme } from "../../constants/theme";

const { typography } = theme;

const DEFAULT_HEIGHT = 14;
const DEFAULT_WIDTH = 14;

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
    src: props.inactiveImg,
  };
})`
  width: ${DEFAULT_WIDTH}rem;
  height: ${DEFAULT_HEIGHT}rem;
  margin: 0 auto 2rem;
  .am-button-active &, .am-button:hover &, .am-button:visited & {
    content: url('${(props) => props.activeImg}');
    width: ${DEFAULT_WIDTH}rem;
    height: ${DEFAULT_HEIGHT}rem;
  }
`;

export default ({
  inactiveImg,
  activeImg,
  height = DEFAULT_HEIGHT,
  width = DEFAULT_WIDTH,
  children,
  ...props
}) => {
  return (
    <FeedbackButton style={{ height: "unset" }} inline {...props}>
      <FlexDiv>
        <NestedImage
          inactiveImg={inactiveImg}
          activeImg={activeImg || inactiveImg}
          height={height}
          width={width}
        />
        {children}
      </FlexDiv>
    </FeedbackButton>
  );
};
