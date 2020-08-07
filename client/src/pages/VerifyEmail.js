import React from "react";
import { Trans, useTranslation } from "react-i18next";
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
    font-family: Poppins;
    font-size: 1.4rem;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    padding: 0 8vw;

    @media screen and (min-width: ${mq.desktop.large.minWidth}) {
      padding: 0 15vw;
    }

    @media screen and (max-width: ${mq.tablet.narrow.maxWidth}) {
      width: 100%;
      margin: 0;
    }
  }
`;

const VerifyEmail = ({ forgotPasswordRequested, email }) => {
  const { t } = useTranslation();

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
            <h1 className="directions-header">{t("verifyEmail.checkInbox")}</h1>
            <p className="directions-text">
              {forgotPasswordRequested ? (
                <>
                  <Trans i18nKey="verifyEmail.forgotPass" email={email}>
                    An email has been sent to {{email}} with further instructions on how to reset your password.
                  </Trans>
                </>
              ) : (
                <>
                  <Trans i18nKey="verifyEmail.confirm" email={email}>
                    We just emailed a link to {{email}}. Click the link to confirm your account and complete your profile.
                  </Trans>
                </>
              )}
              <br />
              <br />
              {t("verifyEmail.checkSpam")}
            </p>
          </VerifyDirectionsContainer>
        </div>
      </VerifyEmailRightContainer>
    </VerifyEmailContainer>
  );
};

const mapStateToProps = ({ session }) => ({
  email: session.email,
  forgotPasswordRequested: session.forgotPasswordRequested,
});

export default connect(mapStateToProps)(VerifyEmail);
