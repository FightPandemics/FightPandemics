import styled from "styled-components";
import { mq, theme } from "constants/theme";
const { royalBlue } = theme.colors;


export const AboutUsContainer = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  color:#282828;
  margin: 0 auto;
  
  background-color:white;
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
  .heading { 
  text-align: center;  
  height: 75.3px;
  margin-left: 489px;
  margin-right:493px;
  margin-top: 15.3px;
  font-family: Poppins;
  font-size: 38px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;  
  letter-spacing: normal;
  color: var(--color-primary-text);
  }
`;

export const SupportersLogosContainer = styled.div`
  max-width: 100%;
  display: grid;
  margin-left: 125px;
  margin-right: 125px;
  grid-template-columns: repeat(auto-fill, minmax(${(props) => props.wide}, 0.8fr));
  grid-gap: 2rem;
  grid-auto-rows: 0.8fr;
  
  > div {
    display: grid;
    place-items: center;
    &::before {
      // for apsect ratio
      display: block;
      padding-bottom: 100%;
      grid-area: 1 / 1 / 2 / 2 ;
    }
    img {
      width: 90%;
      max-height: 50%;
      grid-area: 1 / 1/ 2 / 2 ;
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
  width: 881px;
  height: 200.6px;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  h1{
    font-family: Poppins;
    font-size: 38px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.23;
    letter-spacing: normal;
    color: var(--color-primary-text);
    margin-top:48.6px;
  }
  p{
    font-family: Poppins;
    font-size: 22px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.36;
    letter-spacing: normal;
    color: var(--color-primary-text);
  }`;

export const OurStoryContainer = styled.div`
h1 {
width: 1031px;
height: 66px;
font-family: Poppins;
align-items: center;
justify-content: center;
text-align: center;
margin: 0 auto;
marginLeft: 124px;
marginRight: 126px;
font-size: 44px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: normal;
color: var(--color-primary-text);
}
h2 {
  align-items: center;
justify-content: center;
text-align: center;
margin: 0 auto;
padding-top: 45.2px;
padding-bottom: 13.2px;
marginLeft: 675.2px;
marginRight: 3382.2px;
  width: 12.4x;
  height: 16.6px;
  background-color: var(--color-primary-brand-color);
  color: #425af2;
}
h3 {
  align-items: center;
justify-content: center;
text-align: center;
margin: 0 auto;
padding-top: 60px;
margin-bottom: 50px;
  width: 1030px;
  height: 28px;
  font-family: Poppins;
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  color: var(--color-primary-text);
}
h4 {
  align-items: center;
justify-content: center;
text-align: center;
margin: 0 auto;
margin-bottom: 50px;
  width: 1031px;
  height: 20px;
  font-family: Poppins;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  color: var(--color-primary-text);
}
p{
  align-items: center;
  justify-content: center;
  text-align: center;
  display: inline-block;
  margin: 0 auto;
  padding-top: 40px;
  marginLeft: 199px;
  marginRight: 201px;
  width: 881px;
  height: 180px;
  font-family: Poppins;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: var(--color-primary-text);
}
p span.text-style-1 {
  color: #1e1e1e;
}
p span.text-style-2 {
  font-weight: 500;
  color: var(--color-primary-brand-color);
  color: #425af2;
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

export const OurIdeaImageContainer = styled.img`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export const OurCommunity = styled.img`
  width: 831.7px;
  height: 425px;
  display: inline-block;
  text-align: center;
`;

export const ImageContainer = styled.div`

   background-image: url(${(props) => props.img});
   width: ${(props) => props.width};
   height: ${(props) => props.height};
   display: inline-block;
   margin: 0 auto;
   margin-bottom: 160px;
   object-fit: contain;
   align-items: center;
   justify-content: center;
   text-align: center;
   h1 {
    width: 1031px;
    height: 66px;
    font-family: Poppins;
    font-size: 44px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    text-align: center;
    letter-spacing: normal;
    color: var(--color-primary-text);
    margin-top: 54px;
    padding-left: 122px;
    padding-right: 328px;
   }
   p {
    width: 530px;
    height: 95px;
    display: inline-block;  
    font-family: Poppins;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: var(--color-primary-text);
    margin-top: 20px;
    margin-bottom: 40px;
    margin-left: 150px;
    margin-right: 151.7px;
  }
`;

export const Grid = styled.div`
`;
export const Row = styled.div`
 display:flex;
`;

export const Col = styled.div`
 flex: ${(props) => props.size};
`;

export const SocialStyle = styled.div`
margin-top: 113px;
margin-bottom: 70px;

h3{
  width: 289px;
  height: 27px;
  margin-left: 200px;
  font-family: Poppins;
  font-size: 22px;
  font-weight: 500;
  font-stretch: normal;
  font-style: italic;
  line-height: 1.21;
  letter-spacing: normal;
  color: var(--color-primary-text);
}
p span.text-style-2 {
  color: #425af2;
}
p{ 
  height: 20px;
  font-family: Poppins;
  font-size: 14px;
  text-align: right;
  margin-right: 127px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: var(--color-primary-text);
}
`;
export const SocialContainer = styled.div`
  text-align: left;
  margin-left: 200px;
  img {
    margin: 1.5rem 1.5rem;
    width: 45.5px;
    height: 45.5px;
    object-fit: contain;
  }
`;

export const AboutUsLink = styled.a`
  color: ${royalBlue};
  display: inline-block;
`;
