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
    font-size: 2rem;
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
      width: 60%;
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
        width: 90%;
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
  width:88.1rem;
  height: 20rem;
  h2 {
    font-size: 3.8rem;
    line-height: 1.23;
    margin-top: 4rem;
  }
  p {
    font-size: 2.2rem;
    line-height: 1.36;
  }
`;

export const HowDoesThisWorkContainer = styled.div`
  margin-top: 18rem;
  img {
    margin-left:7.2rem;
    margin-right:6rem;
    object-fit: contain;
  }
  h3 {
    font-size: 2.4rem;
    font-weight: 600;
    margin-left: 10.7rem;
    margin-right: 9.1rem;
  }
  p {
    width: 29rem;
    margin-left: 10.9rem;
    margin-right: 9.4rem;
  }
`;
export const ConnectContainer = styled.div`
  margin: 0 auto;
  margin-top: 8rem;
  margin-left: 12.5rem;
  margin-right: 8rem;
  img {
    width: 26.6;
    height: 46.7rem;
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
  h3 {
    color: ${royalBlue};
    margin-top: 3.75rem;
    margin-bottom: 2rem;
    font-weight: 600;
  }
  p {
    margin: 0 auto;
    width: 88.1rem;
    color: ${darkerGray};
    line-height: 1.5;
  }
  p span {
    color: ${royalBlue};
    font-weight: 500;
  }
  img {
    width: 103.1rem;
    height: 35.4rem;
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
  margin-bottom: 16rem;
  h1 {
    margin-top: 5rem;
  }
  h2 {
    margin-top: 1rem;
  }
  p {
    width: 53rem;
    height: 9.5rem;
    display: inline-block;
    line-height: 1.5;
    margin-top: 1.25rem;
    margin-bottom: 2.5rem;
    margin-left: 15rem;
    margin-right: 15.1rem;
  }
`;

export const SupporterContainer = styled.div`
  background-color: ${gray};
  padding-bottom: 3.75rem;
  padding-top: 3.75rem;
  h3 {
    padding-top: 3.75rem;
    margin-bottom: 3.75rem;
    font-size: 2.4rem;
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
  margin-bottom: 2rem;
  margin-left: 11rem;
  h3 {
    width: 30rem;
    font-size: 2.2rem;
    font-weight: 500;
    font-style: italic;
    line-height: 1.21;
  }
  p {
    font-size: 1.4rem;
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
    width: 4.55rem;
    height: 4.55rem;
    object-fit: contain;
  }
`;

export const AboutUsLink = styled.a.attrs(props => ({
  target: "_blank",
}))`
  color: ${royalBlue};
  display: inline-block;
`;
