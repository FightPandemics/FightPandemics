import React from "react";
import FeedbackButton from "./FeedbackButton";
import styled from "styled-components";

const FlexDiv = styled.div`
  margin-top: 15px;
  padding: 20px;
  width: 150px;
  display: flex;
  flex-flow: column;
`;

const NestedImage = styled.img.attrs((props) => {
  return {
    src: props.inactiveImg,
  };
})`
  .am-button-active &, .am-button:hover & {
    content: url('${(props) => props.activeImg}');
  }
`;

const DEFAULT_HEIGHT = 140;
const DEFAULT_WIDTH = 140;

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
