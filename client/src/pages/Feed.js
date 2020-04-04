import React from "react";
import styled, { ThemeProvider } from "styled-components";
import * as COLORS from "../constants/colors";

const FeedTheme = {
  colors: {
    PRIMARY: COLORS.PRIMARY,
    ROYAL_BLUE: COLORS.ROYAL_BLUE,
    TROPICAL_BLUE: COLORS.TROPICAL_BLUE,
    SELAGO: COLORS.SELAGO,
    ORANGE_RED: COLORS.ORANGE_RED,
    MINT_GREEN: COLORS.MINT_GREEN,
    LIGHT_GRAY: COLORS.LIGHT_GRAY,
    MEDIUM_GRAY: COLORS.MEDIUM_GRAY,
    DARK_GRAY: COLORS.DARK_GRAY,
  },
};

const FeedContainer = styled.div`
  width: 100%;
`;

const Feed = () => {
  return (
    <ThemeProvider theme={FeedTheme}>
      <FeedContainer>Feed</FeedContainer>
    </ThemeProvider>
  );
};

export default Feed;
