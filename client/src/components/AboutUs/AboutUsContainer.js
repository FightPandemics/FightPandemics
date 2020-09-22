import styled, { css } from "styled-components";
import { mq, theme } from "constants/theme";
const { royalBlue, offWhite, darkerGray, gray } = theme.colors;
const { display, body } = theme.typography.font.family;
const {font,one,two,three,four} = theme.typography.heading;

export const AboutUsContainer = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  color:${darkerGray}
  margin: 0 auto;  
  background-color:${offWhite};
  letter-spacing: normal;
  font-style: normal;
  font-stretch: normal;
  h1 {
    font-size: ${one};
    text-align: center;
    font-family: ${display};
    font-weight: bold;   
    line-height: normal
    }
  h2{
    font-family: ${display};
    font-size: 3.8rem;
    font-weight: bold;
    line-height: 1.23;
    margin-top:3.125rem;
  }
  h3{
    font-family: ${display};
    font-size: 2.2rem;
    font-weight: 600;
    line-height: 1.17;
  }
  h4{
    font-family: ${display};
    font-size: 1.75rem;
    line-height: 1.25;
  }
  p{
    margin: 0 2rem;   
    font-size: 20px;
    font-family:${body};
    color:${darkerGray};
    font-weight: normal;        
  }    
  `;

export const SupportersLogosContainer = styled.div`
  max-width: 100%;
  display: grid;
  margin-left: 9rem;
  margin-right: 9rem;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${props => props.wide}, 0.8fr)
  );
  grid-gap: 2rem;
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
      max-height: 50%;
      grid-area: 1 / 1 / 2 / 2;
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
        width: 60%;
        grid-area: 1/ 1 / 2 / 2;
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

export const HeadingContainer = styled.div`
  margin: 0 auto;
  width: 87rem;
  height: 20rem;
  h2 {
    font-size: 38px;
    line-height: 1.23;
    margin-top: 4rem;
  }
  p {
    font-size: 22px;
    line-height: 1.36;
  }
`;

export const HowDoesThisWorkContainer = styled.div`
  margin-top: 18rem;
  margin-left: 6rem;
  margin-right: 5.625rem;
  img {
    object-fit: contain;
  }
  h3 {
    font-size: 24px;
    font-weight: 600;
  }
  p {
    width: 29rem;
  }
`;
export const ConnectContainer = styled.div`
  margin: 0 auto;
  margin-top: 8rem;
  margin-left: 12.5rem;
  margin-right: 8rem;
  img {
    width: 266.6px;
    height: 467.1px;
    object-fit: contain;
  }
  h1 {
    width: 46rem;
    margin-top: 11rem;
  }
  p {
    width: 45rem;
  }
`;

export const OurStoryContainer = styled.div`
  margin: 0 auto;
  h1 {
    marginleft: 7.75rem;
    marginright: 7.875rem;
  }
  h3 {
    color: ${royalBlue};
    margin-top: 3.75rem;
    margin-bottom: 2rem;
    font-weight: 600;
  }
  p {
    margin: 0 auto;
    width: 881px;
    color: ${darkerGray};
    line-height: 1.5;
  }
  p span {
    color: ${royalBlue};
    font-weight: 500;
  }
  img {
    width: 1031px;
    height: 354px;
    margin-bottom: 25rem;
    margin-top: 8rem;
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
  width: 51.9375rem
  height: 26.5625rem;
  display: inline-block;
  text-align: center;
`;

export const ImageContainer = styled.div`
  background-image: url(${props => props.img});
  width: ${props => props.width};
  height: ${props => props.height};
  display: inline-block;
  margin: 0 auto;
  margin-bottom: 17rem;
  h1 {
    margin-top: 5rem;
  }
  h2 {
    margin-top: 1rem;
  }
  p {
    width: 58rem;
    height: 10rem;
    display: inline-block;
    line-height: 1.5;
    margin-top: 1.25rem;
    margin-bottom: 2.5rem;
    margin-left: 10.75rem;
    margin-right: 10.75rem;
  }
`;

export const SupporterContainer = styled.div`
  background-color: ${gray};
  padding-bottom: 3.75rem;
  padding-top: 3.75rem;
  h3 {
    padding-top: 3.75rem;
    margin-bottom: 3.75rem;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.17;
  }
  p {
    width: 88rem;
    margin: 0 auto;
    margin-bottom: 4rem;
    line-height: 1.5;
  }
`;

export const Grid = styled.div``;
export const Row = styled.div`
  display: flex;
`;

export const Col = styled.div`
  flex: ${props => props.size};
`;

export const SocialStyle = styled.div`
  margin-top: 11rem;
  margin-bottom: 5rem;
  margin-left: 11rem;
  h3 {
    width: 30rem;
    font-size: 22px;
    font-weight: 500;
    font-style: italic;
    line-height: 1.21;
  }
  p {
    font-size: 14px;
    text-align: right;
    margin-right: 11rem;
    margin-bottom: 2rem;
  }
  p span {
    color: ${royalBlue};
  }
`;

export const SocialContainer = styled.div`
  text-align: left;
  img {
    margin: 1.5rem 1.5rem;
    width: 45.5px;
    height: 45.5px;
    object-fit: contain;
  }
`;

export const AboutUsLink = styled.a.attrs(props => ({
  target: "_blank",
}))`
  color: ${royalBlue};
  display: inline-block;
`;
