import React from "react";

import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import {
  AnswerButton,
  AnswerCheckbox,
  StyledWizard,
  WizardContainer,
  WizardStep,
} from "../StepWizard";

const { typography } = theme;
const { white, black } = theme.colors;

const desktopBreakpoint = mq.tablet.narrow.minWidth;
const STEP_BUTTON_WIDTH = "55.6rem";

export const SCStyledWizard = styled(StyledWizard)`
  @media screen and (min-width: ${desktopBreakpoint}) {
    display: flex !important;
    justify-content: center !important;
    width: 100% !important;
  }
`;

export const SCWizardContainer = styled(WizardContainer)`
  margin: 4rem 0 0 0;

  @media screen and (min-width: ${desktopBreakpoint}) {
    margin: 10rem auto;
  }
`;

export const SCWizardStep = styled(WizardStep)`
  display: flex;
  flex-direction: column;
  margin: 0 auto -2rem auto;

  @media screen and (min-width: ${desktopBreakpoint}) {
    display: flex;
    justify-content: center;
    width: ${({ width }) => width?.dkt ?? "100%"};
    margin: 0 auto 0 auto;
  }
`;

export const SCTitle = styled.h2`
  align-self: flex-start;
  font-weight: bold;
  font-size: 2.6rem;
  margin: 1rem 0 0 0;

  @media screen and (min-width: ${desktopBreakpoint}) {
    align-self: center;
    text-align: center;
    font-size: 3.6rem;
    width: 91.4rem;
  }
`;

export const SCWelcomeTitle = styled(SCTitle)`
  font-size: 1.6rem;
`;

export const SCInstructions = styled.div`
  width: 100%;
  margin: 1rem 0 1rem 0;
  font-weight: 400;
  font-size: 1.4rem;

  ul {
    list-style-type: none;
    margin-block-start: 0rem;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 0rem;
  }

  li::before {
    content: "•";
    padding-right: 1rem;
  }

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: flex;
    justify-content: center;
    font-weight: regular;
    font-size: 1.8rem;
    margin: 3rem 0 3rem 0;
  }
`;

export const SCWelcomeInstructions = styled(SCInstructions)`
  font-size: 1.4rem;
  margin: 2rem 0 0 0;
  font-weight: 500;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    justify-content: flex-start;
    max-width: 60rem;
    font-size: 2.2rem;
    font-weight: 500;
    margin: 3rem 0 3rem 0;
  }
`;

export const SCSubtitle = styled.h4`
  font-weight: 300;
  font-size: ${(props) => props.fontSize?.mb ?? "1.4rem"};
  margin: 0;
  width: 100%;
  text-align: left;

  @media screen and (min-width: ${desktopBreakpoint}) {
    text-align: center;
    font-size: ${(props) => props.fontSize?.dkt ?? "1.8rem"};
  }
`;

export const SCButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 2.5rem 0;
  @media screen and (min-width: ${desktopBreakpoint}) {
    margin: 4rem auto 2rem auto;
  }
`;

export const SCButtonContent = styled.span`
  width: inherit;
  margin: 0 3.2rem;
  font-weight: regular;
  font-size: 1.6rem;

  strong {
    display: inline-block;
  }

  @media screen and (min-width: ${desktopBreakpoint}) {
    width: 55.6rem;
    margin: 0 4.3rem;
    font-size: 2.2rem;
  }
`;

export const SCAnswerCheckbox = styled(AnswerCheckbox)`
  margin: 0 0 2rem 0;

  @media screen and (min-width: ${desktopBreakpoint}) {
    margin: 0 0 1.7rem 0;
    width: ${STEP_BUTTON_WIDTH};
  }
`;

export const SCAnswerButton = styled(({ children, ...props }) => (
  <AnswerButton {...props}>
    <SCButtonContent>{children}</SCButtonContent>
  </AnswerButton>
))`
  display: flex;
  align-items: center;
  background-color: ${white};
  color: ${black};
  font-family: ${typography.font.family.display}, sans-serif;
  font-size: 1.6rem;
  border: 0.1rem solid ${theme.colors.royalBlue};
  border-radius: 0.8rem;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  margin: 0;
  min-height: 5rem;
  margin: 0 0 2rem 0;
  padding: 1.3rem 0;
  &:hover {
    background-color: ${theme.colors.royalBlue};
    color: ${white};
  }

  @media screen and (min-width: ${desktopBreakpoint}) {
    min-height: 8.5rem;
    font-size: 2.2rem;
    padding: 0;
    margin: 0 0 1.7rem 0;
    width: ${STEP_BUTTON_WIDTH};
  }
`;
