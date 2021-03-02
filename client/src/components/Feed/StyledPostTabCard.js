import styled from "styled-components";
import { theme } from "constants/theme";

const { colors, typography } = theme;
const { xxsmall, xsmall, medium } = typography.size;

export const StyledPostTabCard = styled.div`
  display: flex;
  background-color: white;
  width: 100%;
`;

export const StyledCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const StyledCardBody = styled.div`
  border-top: unset;
  padding: 0 1.8rem;
  margin-top: 0.7rem;
  font-family: "Work Sans";
  white-space: pre-line;
  font-weight: 400;
  width: 100%;
`;

export const StyledUpdateAt = styled.p`
  font-size: ${xxsmall};
  line-height: 1.4rem;
  color: #939393;
  margin: 0.8rem 0 0 0;
`;

export const StyledTitlePostCard = styled.h5`
  font-weight: 700;
  line-height: 1.72rem;
  font-size: ${medium};
  margin: 0.4rem 0 0.6rem 0;
`;

export const StyledDescription = styled.p`
  font-size: ${xsmall};
  line-height: 1.68rem;
  letter-spacing: -0.03rem;
  margin-top: 0;
`;

export const LineBreak = styled.div`
  border-bottom: 0.1rem solid ${colors.lightGray};
  margin-bottom: 0.9rem;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0rem 0.8rem 2.4rem rgba(149, 157, 165, 0.2);
  border-radius: 1.2rem;
  overflow: hidden;

  div.am-tabs-default-bar-tab-active[aria-selected] {
    color: #282828;
    font-weight: 700;
  }

  div.am-tabs-default-bar-tab {
    color: #939393;
    font-weight: 400;
  }

  div.am-tabs-default-bar-underline {
    border: 0.1rem #282828 solid;
  }
`;

export const StyledCardFooter = styled.a`
  font-size: ${medium};
  line-height: 2.1rem;
  background-color: white;
  align-self: stretch;
  text-align: center;
  padding: 0.2rem 0 0 0.9rem;
  margin: 0;
`;

export const StyledDropDown = styled.div`
  .card-submenu {
    flex: 0 0 auto;
    margin-left: 3rem;
    cursor: pointer;
  }

  svg {
    circle {
      fill: ${theme.colors.mediumGray};
    }
    transform: scale(0.5);
  }
`;
