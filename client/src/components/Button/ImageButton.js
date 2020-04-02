import React from "react";
import FeedbackButton from "./FeedbackButton";
import styled from "styled-components";

const FlexDiv = styled.div`
  margin-top: 15px;
  padding: 20px;
  width: 150px;
  display: flex;
  flex-flow: column;
`

const NestedImage = styled.img`
  content: url('${props => props.inactiveImg}');

  .am-button-active & {
    content: url('${props => props.activeImg}');
  }
`

export default ({ inactiveImg, activeImg, children, ...props}) => {
  return (
    <FeedbackButton
      style={{height: "unset"}}
      inline
      {...props}
    >
      <FlexDiv>
        <NestedImage
          inactiveImg={inactiveImg}
          activeImg={activeImg || inactiveImg}
        />
        {children}
      </FlexDiv>
    </FeedbackButton>
  );
}