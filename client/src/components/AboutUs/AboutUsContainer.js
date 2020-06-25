import styled from "styled-components";

import { mq, theme } from "constants/theme";
const { primary } = theme.colors;

export const AboutUsContainer = styled.div`
  max-width: ${mq.desktop.small.minWidth};
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    max-width: 100%;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: ${theme.typography.heading.one};
    text-align: center;
    font-weight: bold;
    letter-spacing: normal;
    color: var(--color-primary-text);
    margin: 4rem;
  }
  h2 {
    text-align: center;
    font-size: ${theme.typography.heading.four};
    font-weight: bold;
    margin: 2rem;
  }
  p {
    font-size: ${theme.typography.size.large};
    margin: 0 20rem;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      margin: 0 2rem;
    }
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  padding: 10rem 10rem 10rem 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    padding: 4rem 0;
  }
`;

export const AccentedContentContainer = styled(ContentContainer)`
  background-color: ${theme.colors.selago};
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

export const OurIdeaImageContainer = styled.img`
  margin: 0 auto;
  width: 78rem;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    width: 100%;
  }
`;

export const SocialContainer = styled(AccentedContentContainer)`
  padding: 0;
  display: flex;
  flex-direction: column;
  & img {
    margin: 2rem 3rem;
    width: 3rem;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      margin: 2rem 2rem;
      width: 4rem;
    }
  }
`;

export const SocialTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;

  p {
    margin: 0 0.5rem 0 0;
  }

  a {
    color: var(--color-primary-text);
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    flex-direction: column;
  }
`;

export const AboutUsLink = styled.a`
  color: ${primary};
  display: inline-block;
`;

export const JoinButton = styled.button`
  background-color: ${theme.colors.royalBlue};
  color: ${theme.colors.offWhite};
  font-size: ${theme.typography.size.large};
  font-family: ${theme.typography.font.family.display};
  letter-spacing: normal;
  font-weight: 600;

  width: 28rem;
  height: 5.5rem;
  border-radius: 5rem;
  border: solid 0 var(--color-primary-text);
  margin: 3rem 0 0 0;
`;
