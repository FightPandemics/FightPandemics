import React from "react";
import styled from "styled-components";
import bg from "assets/bannerBg.svg";
import bgMobile from "assets/bannerBgMobile.svg";
import bgCross from "assets/bannerCross.svg";
import { theme, mq } from "../constants/theme";

const { colors } = theme;

const HomeRegisterBanner = styled.div`
  min-height: 6rem;
  width: 100vw;
  position: fixed;
  top: 6rem;
  background-color: #f3f4fe;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;
  color: ${colors.royalBlue};
  box-shadow: 0px 0.2rem 0.5rem rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2.4rem;
  z-index: 4;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    height: auto;
    min-height: auto;
    flex-direction: column;
    padding: 4.4rem 2.4rem 2.4rem;
    background-image: url(${bgMobile});
    background-size: contain;
    position: relative;
    top: 0;
    z-index: 1;

    .action-container {
      width: 100%;
      margin-top: 2.4rem;

      .register-btn {
        width: 100%;
        margin-left: 0;
      }

      .close-action {
        position: absolute;
        top: 18px;
        right: 18px;
      }
    }
  }

  .register-btn {
    background: ${colors.royalBlue};
    box-shadow: 0px 0.4rem 0.4rem rgba(0, 0, 0, 0.1);
    border-radius: 4.6rem;
    height: 4.4rem;
    min-width: 14.9rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 500;
    font-size: 1.4rem;
    margin-left: 2rem;

    &:hover {
      background: #fff;
      color: ${colors.royalBlue};
      border: 0.1rem solid ${colors.royalBlue};
    }
  }

  a {
    text-decoration: underline;
  }

  .action-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .close-action {
    margin-left: 5.6rem;
    cursor: pointer;
  }
`;

export const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  top: ${(props) => (props.visible ? "4rem" : "0")};
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    top: 0;
  }
`;

const WithSummitBanner = ({ children }) => {
  const [showBanner, setBannerState] = React.useState(
    localStorage?.showSummitBanner === "false" ? false : true,
  );

  const removeBanner = React.useCallback(() => {
    setBannerState(false);
    try {
      localStorage.setItem("showSummitBanner", "false");
    } catch (e) {
      // e
    }
  }, []);

  return (
    <BannerContainer visible={showBanner}>
      {showBanner && (
        <HomeRegisterBanner>
          <div>
            <b>Stronger Together Summit 2020 - 4th December 2020</b> : bringing
            together bright and diverse minds to discuss the ongoing battles
            against COVID-19.{" "}
            <a target="_blank" href="https://events.fightpandemics.com/">
              Learn More
            </a>
            .
          </div>
          <div className="action-container">
            <div
              onClick={() => {
                window.open(
                  "https://hopin.com/events/stronger-together-summit",
                  "_blank",
                );
              }}
              className="register-btn"
            >
              Register Now
            </div>
            <div onClick={removeBanner} className="close-action">
              <img src={bgCross} />
            </div>
          </div>
        </HomeRegisterBanner>
      )}
      {children}
    </BannerContainer>
  );
};

export default WithSummitBanner;
