import React from "react";
import styled from "styled-components";
import { theme, mq } from "constants/theme";
import BaseButton from "components/Button/BaseButton";

const { tablet } = mq;

// ICONS
const { colors, typography } = theme;

export const ProfileCompletedWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background-color: ${colors.offWhite};
  height: 100%;
`;

export const ProfileCompletedHeader = styled.div`
  height: 40vh;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  background-color: ${colors.royalBlue};
  border-bottom-right-radius: 1.5rem;

  @media screen and (min-width: ${tablet.wide.minWidth}) {
    background: 0 0;
  }
`;

export const ProfileCompletedButtonsWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  position: relative;
  top: -3rem;
  width: 100%;
  padding: 0 1rem;

  @media screen and (min-width: ${tablet.narrow.minWidth}) {
    top: -6rem;
  }

  @media screen and (min-width: ${tablet.wide.minWidth}) {
    width: 40%;
  }
`;

export const StyledButton = styled(BaseButton)`
  padding: 1rem 0;
  height: auto;
  width: 100%;
  border-radius: 1rem;
  border: none;
  box-shadow: 0px 0px 2px 2px ${colors.lightGray};
  margin-bottom: 1rem;

  @media screen and (min-width: ${tablet.narrow.minWidth}) {
    padding: 3rem 0;
  }
`;
export const ProfileCompletedHeadingWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export const ProfileCompletedHeading = styled.p`
  font-family: ${typography.heading.font};
  color: ${colors.white};
  margin-top: 1rem;

  @media screen and (min-width: ${tablet.narrow.minWidth}) {
    font-size: ${typography.heading.two};
  }

  @media screen and (min-width: ${tablet.wide.minWidth}) {
    font-size: ${typography.heading.three};
    color: ${colors.black};
  }
`;

export const StyledHeadingIcon = styled.svg`
  fill: white;

  @media screen and (min-width: ${tablet.wide.minWidth}) {
    fill: ${colors.royalBlue};
  }
`;

export const HeadingIcon = () => (
  <StyledHeadingIcon
    width="78"
    height="78"
    viewBox="0 0 78 78"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M57.1289 33.5156C55.4461 33.5156 54.082 32.1515 54.082 30.4688C54.082 29.6287 53.3986 28.9453 52.5586 28.9453C51.7186 28.9453 51.0352 29.6287 51.0352 30.4688C51.0352 32.1515 49.6711 33.5156 47.9883 33.5156C46.3055 33.5156 44.9414 32.1515 44.9414 30.4688C44.9414 26.2686 48.3585 22.8516 52.5586 22.8516C56.7587 22.8516 60.1758 26.2686 60.1758 30.4688C60.1758 32.1515 58.8117 33.5156 57.1289 33.5156ZM33.2109 30.4688C33.2109 26.2686 29.7939 22.8516 25.5938 22.8516C21.3936 22.8516 17.9766 26.2686 17.9766 30.4688C17.9766 32.1515 19.3406 33.5156 21.0234 33.5156C22.7062 33.5156 24.0703 32.1515 24.0703 30.4688C24.0703 29.6287 24.7537 28.9453 25.5938 28.9453C26.4338 28.9453 27.1172 29.6287 27.1172 30.4688C27.1172 32.1515 28.4813 33.5156 30.1641 33.5156C31.8469 33.5156 33.2109 32.1515 33.2109 30.4688ZM59.1796 72.3796C60.6189 71.5077 61.0789 69.6342 60.2072 68.195C59.3353 66.7557 57.4616 66.2956 56.0226 67.1674C50.9046 70.2676 45.0183 71.9062 39 71.9062C20.8554 71.9062 6.09375 57.1446 6.09375 39C6.09375 20.8554 20.8554 6.09375 39 6.09375C57.1446 6.09375 71.9062 20.8554 71.9062 39C71.9062 45.4882 69.9768 51.8036 66.3265 57.2637C65.3913 58.6627 65.7671 60.5548 67.1661 61.4901C68.565 62.4254 70.4573 62.0493 71.3924 60.6505C75.715 54.1847 78 46.6981 78 39C78 28.5827 73.9432 18.789 66.5773 11.4227C59.211 4.05676 49.4173 0 39 0C28.5827 0 18.789 4.05676 11.4227 11.4227C4.05676 18.789 0 28.5827 0 39C0 49.4173 4.05676 59.211 11.4227 66.5773C18.789 73.9432 28.5827 78 39 78C46.1317 78 53.1096 76.0565 59.1796 72.3796ZM52.1016 44.332C51.1095 44.332 50.2308 44.8084 49.6744 45.5424C49.6744 45.5424 45.7107 49.8164 39 49.8164C32.2893 49.8164 28.3256 45.5424 28.3256 45.5424C27.7692 44.8084 26.8905 44.332 25.8984 44.332C24.2156 44.332 22.8516 45.6961 22.8516 47.3789C22.8516 48.2459 23.2154 49.0264 23.7967 49.5812C24.3477 50.1924 29.7532 55.9102 39 55.9102C48.2468 55.9102 53.6523 50.1924 54.2033 49.5812C54.7846 49.0264 55.1484 48.2459 55.1484 47.3789C55.1484 45.6961 53.7844 44.332 52.1016 44.332Z" />
  </StyledHeadingIcon>
);
