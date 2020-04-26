import React from "react";
import styled from "styled-components";

import SubmitButton from "./SubmitButton";
import { theme, mq } from "../../constants/theme";
const { colors } = theme;
const { selago, royalBlue, white } = colors;

const StyledFeedbackModalButton = styled(SubmitButton)`
  @media screen and (min-width: 1024px) {
    width: 21vw;
    margin-top: 1rem;
    margin-bottom: -0.5rem;
    color:${royalBlue};
    background-color:${selago};
  }
  width: 90%;
  margin-top: 3rem;
  margin-bottom: 1rem;
  background-color: ${(props) => (props.dark ? selago : royalBlue)};
  border: none;
  color:${white};
`;

const FeedbackModalButton = (props) => {
  const { title, onClick, dark } = props;

  return (
    <StyledFeedbackModalButton onClick={onClick} dark={dark}>
      {title}
    </StyledFeedbackModalButton>
  );
};

export default FeedbackModalButton; 