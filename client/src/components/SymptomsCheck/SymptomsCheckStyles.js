import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import {
  AnswerButton,
  //   AnswerCheckbox,
  //   getAnswersMap,
  //   getCheckedAnswers,
  StyledWizard,
  WizardContainer,
    WizardStep,
  //   WizardNav,
} from "../StepWizard";

const { typography } = theme;

export const SCStyledWizard = styled(StyledWizard)`
  display: flex;
  flex-direction: column-reverse;
  align-self: flex-start;
  width: 100%;
`;

export const SCWizardContainer = styled(WizardContainer)`
  font-family: ${theme.typography.font.family.display};
  display: flex;
  margin: 4rem 0 0 0;
  width: 100%;
  justify-content: center;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: flex;
    justify-content: center;
    margin: 10rem auto;
    max-width: 850px;
  }
`;

export const SCWizardStep = styled(WizardStep)`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SCTitle = styled.h2`
  font-weight: bold;
  font-size: ${(props) => props.fontSize?.mb ?? "1.6rem"};
  margin: 1rem 0 0 0;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    text-align: center;
    font-size: ${(props) => props.fontSize?.mb ?? "3.6rem"};
  }
`;

export const SCSubtitle = styled.h4`
  font-weight: 300;
  font-size: ${(props) => props.fontSize?.mb ?? "1.4rem"};
  margin: 0;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    text-align: center;
    font-size: ${(props) => props.fontSize?.dkt ?? "1.8rem"};
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

export const SCButtonsContainer = styled.div`
  margin: 2.5rem 0;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    margin: 4rem auto 0 auto;
  }
`;

export const SCAnswerButton = styled(AnswerButton)`
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
  width: ${(props) => props.width?.mb ?? "100%"};
  margin: ${(props) => props.margin?.mb ?? "1.5rem 0"};
  height: ${(props) => props.height?.mb ?? "8rem"};
  padding: 0;
  &:hover {
    background-color: ${theme.colors.royalBlue};
    color: #fff;
  }

  strong {
    display: block;
  }

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    height: ${(props) => props.height?.dkt ?? "8.5rem"};
    font-size: 2.2rem;
    padding: 0;
    width: ${(props) => props.width?.dkt ?? "55.6rem"};
    margin: ${(props) => props.margin?.dkt ?? "1.5rem 0"};
  }
`;

export const SCButtonContent = styled.div`
  width: ${(props) => props.width?.dkt ?? "inherit"};
  margin: ${(props) => props.margin?.dkt ?? "0 3.2rem"};
  font-weight: regular;
  font-size: 1.6rem;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    width: ${(props) => props.width?.dkt ?? "55.6rem"};
    margin: ${(props) => props.margin?.dkt ?? "0 4.3rem"};
    font-size: 2.2rem;
  }
`;
