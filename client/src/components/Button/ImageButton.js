import React from "react";
import FeedbackButton from "./FeedbackButton";
import styled from "styled-components";

const DEFAULT_HEIGHT = 140;
const DEFAULT_WIDTH = 140;

const FlexDiv = styled.div`
  /* margin-top: 15px; */
  padding: 30px;
  width: 24rem;
  height: ${24 / 1.25}rem;
  display: flex;
  align-items: center;
  flex-flow: column;
  text-align: center;
`;

const NestedImage = styled.img.attrs((props) => {
  // console.log(props);

  return {
    src: props.inactiveImg,
  };
})`
  width: ${DEFAULT_WIDTH};
  height: ${DEFAULT_HEIGHT};
  margin: 0 auto;
  .am-button-active &, .am-button:hover &, .am-button:visited & {
    content: url('${(props) => props.activeImg}');
    width: ${DEFAULT_WIDTH};
    height: ${DEFAULT_HEIGHT};
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
