import styled from "styled-components";
import { mq, theme } from "constants/theme";
const { primary } = theme.colors;

export const AboutUsContainer = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  h1 {
    font-size: 4rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: normal;
    color: var(--color-primary-text);
  }
  h2 {
    text-align: center;
    font-size: 2.2rem;
    font-weight: bold;
  }
  p {
    margin: 0 2rem;
    font-size: 1.6rem;
  }
`;

export const SupportersLogosContainer = styled.div`
  max-width: 100rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 0.8fr));
  grid-gap: 1rem;
  grid-auto-rows: 0.8fr;
  > div {
    display: grid;
    place-items: center;
    &::before {
      // for apsect ratio
      display: block;
      padding-bottom: 100%;
      grid-area: 1 / 1 / 2 / 2;
    }
    img {
      width: 90%;
      grid-area: 1 / 1 / 2 / 2;
      max-height: 50%;
    }
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    max-width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(11rem, 0.5fr));
    grid-gap: 0.5rem;
    display: grid;
    > div {
      place-items: center;
      img {
        width: 90%;
        grid-area: 1 / 1 / 2 / 2;
        max-height: 50%;
      }
    }
  }
`;

export const MissionAndVisionBannerContainer = styled.div`
  img {
    max-width: 100%;
  }
`;

export const WebViewBannerContainer = styled.img`
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
`;

export const MobileViewBannerContainer = styled.img`
  display: none;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: initial;
  }
`;

export const TextContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  text-align: left;
  justify-items: center;
  padding-bottom: 2rem;
`;

export const OurIdeaImageContainer = styled.img`
  width: 100%;
  margin: 0 auto;
`;

export const SocialContainer = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  img {
    margin: 2rem 3rem;
    width: 3rem;
  }
`;

export const AboutUsLink = styled.a`
  color: ${primary};
  display: inline-block;
`;
