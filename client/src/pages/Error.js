import React from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";
import { theme, mq } from "constants/theme";
import Button from "components/Button/SubmitButton";
import errorimage from "assets/404.svg";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorImageContainer = styled.div`
  margin-bottom: 4rem;
  width: 22.2rem;

  img {
    object-fit: contain;
    height: 100%;
    width: 100%;
  }
  @media screen and (min-width: ${mq.tablet.narrow.maxWidth}) {
    width: 40.9rem;
  }
`;

const Subtitle = styled.p`
  color: ${theme.colors.darkerGray};
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.6rem;
  margin-bottom: 2.4rem;
  text-align: center;
  width: 20.4rem;

  @media screen and (min-width: ${mq.tablet.narrow.maxWidth}) {
    font-size: 1.4rem;
    line-height: 1.8rem;
    margin-bottom: 3.2rem;
    width: 24rem;
  }
`;

const StyledHeading = styled.h5`
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 2rem;
  margin-bottom: 2.4rem;

  @media screen and (min-width: ${mq.tablet.narrow.maxWidth}) {
    font-size: 2.4rem;
    line-height: 2.8rem;
  }
`;

const StyledButton = styled(Button)`
  height: 5.4rem;
  width: 19rem;
`;

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <ErrorImageContainer>
        <img className="error-page-image" src={errorimage} alt="Error Page" />
      </ErrorImageContainer>
      <StyledHeading>Oops, page does not exist</StyledHeading>
      <Subtitle>Don't worry, you can head back to the help board.</Subtitle>
      <StyledButton
        primary="true"
        // onClick={}
      >
        Help Board
      </StyledButton>
    </ErrorContainer>
  );
};

export default ErrorPage;
