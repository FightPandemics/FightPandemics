import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { mq } from "constants/theme";

// ICONS
import emailVerify from "assets/sign-up-email-verify.svg";

const VerifyEmailContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fbfbfd;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    padding-top: 6vh;
  }
`;

const VerifyEmailLeftContainer = styled.div`
  flex-basis: 45%;
  background-color: #f3f4fe;
  height: 100vh;
  position: relative;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }

  @media screen and (max-width: ${mq.tablet.narrow.maxWidth}) {
    flex-basis: 30%;
  }
`;

const EnvelopeImageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  width: 80%;
  margin: 0 auto;
  @media screen and (max-width: ${mq.tablet.narrow.maxWidth}) {
    .EnvelopeSVG {
      width: 100%;
    }
  }
`;

const VerifyEmailRightContainer = styled.div`
  flex: 1;
`;

const VerifyDirectionsContainer = styled.div`
  .directions-header {
    font-family: Poppins;
    font-size: 2.6rem;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.23;
    letter-spacing: normal;
  }

  .directions-text {
    width: 40.6rem;
    font-family: Poppins;
    font-size: 1.4rem;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    margin-left: 25%;

    @media screen and (max-width: ${mq.tablet.narrow.maxWidth}) {
      width: 100%;
      margin: 0;
    }
  }
`;

const VerifyEmail = ({ email }) => {
  return (
    <VerifyEmailContainer>
      <VerifyEmailLeftContainer>
        <EnvelopeImageContainer>
          <img className="EnvelopeSVG" src={emailVerify} alt="envelope" />
        </EnvelopeImageContainer>
      </VerifyEmailLeftContainer>
      <VerifyEmailRightContainer>
        <div className="text-center">
          <VerifyDirectionsContainer>
            <h1 className="directions-header">Check your inbox</h1>
            <p className="directions-text">
              We just emailed a link to {email}. Click the link to confirm your
              account and complete your profile. If you don't see a message
              within a few minutes please check your spam folder.
            </p>
          </VerifyDirectionsContainer>
        </div>
      </VerifyEmailRightContainer>
    </VerifyEmailContainer>
  );
};

const mapStateToProps = ({ session }) => ({
  email: session.email,
});

export default connect(mapStateToProps)(VerifyEmail);
