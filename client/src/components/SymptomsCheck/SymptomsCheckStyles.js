import React from "react";

import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import {
  AnswerButton,
  AnswerCheckbox,
  //   getAnswersMap,
  //   getCheckedAnswers,
  StyledWizard,
  WizardContainer,
  WizardStep,
  //   WizardNav,
} from "../StepWizard";

const { typography } = theme;

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
  min-height: 100%;
  display: flex;
  flex-direction: column;

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
  font-size: 1.6rem;
  margin: 1rem 0 0 0;

  @media screen and (min-width: ${desktopBreakpoint}) {
    align-self: center;
    text-align: center;
    font-size: 3.6rem;
    width: 91.4rem;
  }
`;

export const SCContentContainer = styled.div`
  width: 100%;
  margin: 3rem 0 0 0;
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
    max-width: 65rem;
    font-size: 2.2rem;
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
    margin: 4rem auto 0 auto;
  }
`;

export const SCButtonContent = styled.div`
  width: inherit;
  margin: 0 3.2rem;
  font-weight: regular;
  font-size: 1.6rem;

  @media screen and (min-width: ${desktopBreakpoint}) {
    width: 55.6rem;
    margin: 0 4.3rem;
    font-size: 2.2rem;
  }
`;

export const SCAnswerCheckbox = styled(AnswerCheckbox)`
  @media screen and (min-width: ${desktopBreakpoint}) {
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
  background-color: #fff;
  color: #000;
  font-family: ${typography.font.family.display}, sans-serif;
  font-size: ${typography.size.large};
  border: 0.1rem solid ${theme.colors.royalBlue};
  border-radius: 0.8rem;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  margin: 1.5rem 0;
  height: 8rem;
  padding: 0;
  &:hover {
    background-color: ${theme.colors.royalBlue};
    color: #fff;
  }

  strong {
    display: block;
  }

  @media screen and (min-width: ${desktopBreakpoint}) {
    min-height: 8.5rem;
    font-size: 2.2rem;
    padding: 0;
    margin: ${(props) => props.margin?.dkt ?? "1.5rem 0"};
    width: ${STEP_BUTTON_WIDTH};
  }
`;
