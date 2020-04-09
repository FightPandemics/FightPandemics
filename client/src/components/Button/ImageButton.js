import React from "react";
import FeedbackButton from "./FeedbackButton";
import styled from "styled-components";

const FlexDiv = styled.div`
  /* margin-top: 15px; */
  padding: 30px;
  width: 150px;
  height: ${150 / 1.25}px;
  display: flex;
  align-items: center;
  flex-flow: column;
  text-align: center;
`;

const NestedImage = styled.img.attrs((props) => {
  return {
    src: props.inactiveImg,
  };
})`
  margin: 0 auto;
  .am-button-active &, .am-button:hover & {
    content: url('${(props) => props.activeImg}');
  }
`;

const DEFAULT_HEIGHT = 92;
const DEFAULT_WIDTH = 92;

export default ({
  inactiveImg,
  activeImg,
  height = DEFAULT_HEIGHT,
  width = DEFAULT_WIDTH,
  children,
  ...props
}) => {
  console.log({ inactiveImg });
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
