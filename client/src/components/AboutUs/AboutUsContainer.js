import styled, { css } from "styled-components";
import { mq, theme } from "constants/theme";
const { royalBlue, white, darkerGray, gray } = theme.colors;
const { display, body } = theme.typography.font.family;
const { font, one, two, three, four } = theme.typography.heading;

export const AboutUsContainer = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${darkerGray};
  margin: 0 auto;
  background-color: ${white};
  letter-spacing: normal;
  font-style: normal;
  font-stretch: normal;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    padding: 0 3rem;
  }
  h1 {
    font-size: 3.8rem;
    text-align: center;
    font-family: ${display};
    font-weight: bold;
    line-height: normal;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      font-size: 2.6rem;
      line-height: 2.8rem;
    }
  }
  h2 {
    font-family: ${display};
    font-size: 3.2rem;
    font-weight: bold;
    line-height: 1.23;
    margin-top: 3.125rem;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      font-size: 2.2rem;
    }
  }
  h3 {
    font-family: ${display};
    font-size: 2.4rem;
    font-weight: 600;
    line-height: 1.17;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      font-size: 2rem;
    }
  }
  h4 {
    font-family: ${display};
    font-size: 1.75rem;
    line-height: 1.25;
  }
  p {
    margin: 0 2rem;
    font-size: 2.2rem;
    font-family: ${body};
    color: ${darkerGray};
    font-weight: normal;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      font-size: 1.8rem;
      line-height: 3rem;
    }
  }
`;

export const SupportersLogosContainer = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  grid-gap: 1rem;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  }

  > div {
    max-width: 12rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 12rem;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      max-width: 8rem;
      padding-bottom: 0;
      height: 8rem;
    }

    img {
      max-width: 100%;
      min-width: 10rem;
    }
  }
`;

export const MissionAndVisionBannerContainer = styled.div`
  img {
    max-width: 100%;
  }
`;

export const HeadingContainer = styled.div`
  margin: 0 auto;
  max-width: 88.1rem;
  height: 20rem;

  h2 {
    line-height: 1.23;
    margin-top: 4.9rem;
    margin-bottom: 1rem;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      line-height: normal;
    }
  }
  p {
    line-height: 1.36;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      line-height: 1.76;
      letter-spacing: -0.077rem;
      margin: 0;
    }
  }
`;

export const HowDoesThisWorkContainer = styled.div`
  margin-top: 13rem;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    margin-top: 6rem;
  }

  img {
    object-fit: contain;
    height: 29rem;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      order: 0;
    }
  }
  h3 {
    font-weight: 600;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      order: 1;
    }
  }
  p {
    max-width: 29rem;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      order: 2;
    }
  }
`;
export const ConnectContainer = styled.div`
  max-width: 120rem;
  margin: auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    flex-direction: column-reverse;
  }

  img {
    width: 26.6rem;
    height: 46.7rem;
    object-fit: contain;
  }
  h1 {
    max-width: 46rem;
  }
  p {
    max-width: 45rem;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      margin: 0;
      margin-bottom: 4.5rem;
    }
  }
`;

export const OurStoryContainer = styled.div`
  margin: 0 auto;
  margin-bottom: 13rem;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    margin-bottom: 6rem;
  }
  h3 {
    color: ${royalBlue};
    margin-top: 3.75rem;
    margin-bottom: 2rem;
    font-weight: 600;
  }
  p {
    margin: 0 auto;
    max-width: 88.1rem;
    color: ${darkerGray};
    line-height: 1.5;
  }
  p span {
    color: ${royalBlue};
    font-weight: 500;
  }
  img {
    max-width: 103.1rem;
    height: 35.4rem;
    margin-bottom: 25rem;
    margin-top: 8rem;
  }
  video {
    margin-top: 8rem;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      max-width: calc(100vw - 6rem);
    }
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
  text-align: center;
  justify-items: center;
  padding-bottom: 2rem;
`;

export const OurCommunity = styled.img`
  width: 51.9375rem;
  height: 26.5625rem;
  display: inline-block;
  text-align: center;
`;

export const ImageContainer = styled.div`
  background-image: url(${(props) => props.img});
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 0 auto;
  margin-bottom: 13rem;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: ${(props) => props?.flexDirection || "column"};
  align-items: center;
  justify-content: center;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    height: ${(props) => props.mobileHeight};
    background-position-x: -7.2rem;
    margin-bottom: 6rem;
    position: relative;
    left: -3rem;
    width: calc(100% + 6rem);
    padding: 0 3rem;
  }

  h2 {
    margin-top: 1rem;
    align-self: flex-start;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      display: none;
    }
  }
  p {
    max-width: 53rem;
    min-height: 9.5rem;
    display: inline-block;
    line-height: 1.5;
    margin-top: 1.25rem;
    margin-bottom: 2.5rem;
    margin-left: 15rem;
    margin-right: 15.1rem;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      line-height: 2.3rem;
      letter-spacing: 0.063rem;
      margin: 0 0 5.6rem;
    }
  }
`;

export const MobileContentContainer = styled.div`
  display: none;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: block;
    margin-bottom: 6rem;

    h2 {
      margin-bottom: 1.8rem;
    }

    p {
      line-height: 2.3rem;
      letter-spacing: 0.063rem;
    }
  }
`;

export const SupporterContainer = styled.div`
  background-color: ${gray};
  padding: 3.4rem 12.5rem;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    position: relative;
    left: -3rem;
    width: calc(100% + 6rem);
    padding: 3.4rem 1.5rem;
  }

  h3 {
    padding-top: 3.75rem;
    margin-bottom: 3.75rem;
    font-weight: 600;
    line-height: 1.17;
  }
  p {
    max-width: 88rem;
    margin: 0 auto;
    margin-bottom: 4rem;
    line-height: 1.5;
  }

  h4 {
    margin-bottom: 4rem;
  }
`;

export const Grid = styled.div``;
export const FlexBox = styled.div`
  display: flex;
  flex-direction: ${(props) => props?.direction || "row"};
  justify-content: ${(props) => props?.justify || "flex-start"};
  align-items: ${(props) => props?.align || "flex-start"};
  flex-wrap: ${(props) => props?.wrap || "wrap"};
`;

export const Col = styled.div`
  flex: ${(props) => props.size};
`;

export const SocialStyle = styled.div`
  margin: 13rem 12.4rem 3.5rem;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    margin: 0;
    margin-top: 6rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h3 {
    font-weight: 500;
    font-style: italic;
    line-height: 1.21;
  }
  p {
    width: 100%;
    font-size: 1.4rem;
    text-align: right;
    margin: 0;
    &:first-child {
      margin-bottom: 2rem;
    }

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      text-align: center;
      font-size: 1.5rem;

      &:first-child {
        margin-top: 3rem;
        margin-bottom: 1.3rem;
        font-size: 1.9rem;
        font-weight: 500;
      }
    }
  }
  p span {
    color: ${royalBlue};
  }
`;

export const SocialContainer = styled.div`
  text-align: left;
  display: flex;
  width: 100%;
  justify-content: space-between;

  img {
    margin: 1.5rem 1.5rem;
    width: 4.6rem;
    height: 4.6rem;
    object-fit: none;
  }

  a:first-child {
    img {
      margin-left: 0;
    }
  }
  a:last-child {
    img {
      margin-right: 0;
    }
  }
`;

export const AboutUsLink = styled.a.attrs((props) => ({
  target: "_blank",
}))`
  color: ${royalBlue};
  display: inline-block;
`;
