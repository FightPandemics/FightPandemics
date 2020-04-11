import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
// import { Button } from "grommet";
import styled from "styled-components";

import Title from "../components/Typography/Title";
import { asyncGetGeoLocation } from "../utils/geolocation";
import {
  AnswerButton,
  StyledWizard,
  WizardContainer,
  WizardStep,
  WizardNav,
} from "../components/StepWizard";
import { theme, mq } from "../constants/theme";
import TextInput from "../components/Input/TextInput";
import SubmitButton from "../components/Button/SubmitButton";

const INITIAL_STATE = {
  answers: [],
};

const FormGroup = styled.div`
  display: flex;
  flex: 1;
  color: ${theme.colors.primary};
  flex-flow: column wrap;

  label {
    ${theme.form.label}

    p {
      margin-bottom: 0.5rem;
    }
  }
`;

const FormLabel = styled.label``;

const UserEmailField = styled(TextInput)`
  ${theme.form.input}
  border-color: ${theme.colors.primary};
  border-width: 0 0 0.1rem 0;
  color: ${theme.colors.darkGray};
  padding: 0.5rem 0;
  margin: 0.5rem 0;
`;

const ButtonGroup = styled.div`
  flex: 0;
`;

const StyledSubmitButton = styled(SubmitButton)`
  ${theme.form.button}
`;

const WizardProgress = styled.h5`
  flex: 0;
  font-size: ${theme.typography.size.large};
  font-weight: normal;
`;

const StepTitle = styled.h2`
  flex: 0;
  font-family: ${theme.typography.heading.font};
  font-weight: bold;
  font-size: ${theme.typography.heading.two};
  line-height: 4.3rem;
  margin-bottom: 5rem;
`;

const Skip = styled.p`
  ${theme.typography.paragraph.skip}
`;

const FormWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  flex: 1;
  margin: 0;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    margin: 0 5rem 2rem 0;
  }
`;
const Step1 = (props) => {
  const selectLocationDetection = async () => {
    try {
      const location = await asyncGetGeoLocation();
      props.update("location", location);
    } catch {
      props.update("location", "unknown");
    } finally {
      props.nextStep();
    }
  };
  const rejectLocationDetection = () => {
    props.update("location", "unknown");
    props.nextStep();
  };
  return (
    <WizardStep>
      <WizardProgress className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </WizardProgress>
      <StepTitle className="mb-5">Where are you located?</StepTitle>
      <FormWrapper>
        <AnswerButton onSelect={selectLocationDetection}>
          Detect my location
        </AnswerButton>
        <AnswerButton onSelect={rejectLocationDetection}>
          Doesn't matter
        </AnswerButton>
      </FormWrapper>
    </WizardStep>
  );
};

const Step2 = (props) => {
  const onSelectAnswer = () => {
    props.update("noMedicalProviderUnderstood", true);
    props.nextStep();
  };
  return (
    <WizardStep>
      <WizardProgress className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </WizardProgress>
      <StepTitle
        style={{
          fontSize: "2.6rem",
          lineHeight: "3.5rem",
          marginBottom: "1rem",
        }}
      >
        We are not a provider of healthcare services.
      </StepTitle>
      <FormWrapper>
        <p>
          This service is provided in good faith as a last resort for those who
          are otherwise unable to obtain help and resource during the
          unprecedented public health emergency.
        </p>
        <h4>
          <strong>Please consult a medical professional for advice.</strong>
        </h4>
        <AnswerButton onSelect={() => onSelectAnswer()}>
          I Understand.
        </AnswerButton>
      </FormWrapper>
    </WizardStep>
  );
};

const Step3 = (props) => {
  const onSelectAnswer = (answer) => {
    props.update("helpTypeOffered", answer);
    props.nextStep();
  };
  return (
    <WizardStep>
      <WizardProgress className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </WizardProgress>
      <StepTitle style={{ marginBottom: "0" }}>
        How do you want to contribute?
      </StepTitle>
      <FormWrapper>
        <AnswerButton onSelect={() => onSelectAnswer("volunteer")}>
          As a volunteer
        </AnswerButton>
        <AnswerButton onSelect={() => onSelectAnswer("doctor investor")}>
          As a Doctor / Investor
        </AnswerButton>
        <AnswerButton onSelect={() => onSelectAnswer("organisation")}>
          As a Organisation
        </AnswerButton>
      </FormWrapper>
    </WizardStep>
  );
};

const Step4 = (props) => {
  const [email, setEmail] = useState("");
  const onChange = (evt) => setEmail(evt.target.value);
  const onSubmit = () => {
    props.update("email", email);
  };
  return (
    <WizardStep className="wizard-step">
      <WizardProgress className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </WizardProgress>
      <StepTitle>What is your email address?</StepTitle>
      <FormWrapper>
        <FormGroup controlId="userEmailGroup">
          <UserEmailField
            type="email"
            name="userEmail"
            label="Email"
            placeholder="Type your email"
            onChange={onChange}
            value={email}
          />
        </FormGroup>
        <ButtonGroup>
          <StyledSubmitButton fill primary title="Submit" onClick={onSubmit} />
          <Skip>
            <Link to="/AirTableCOVID">
              {/* By clicking on “skip”, users can skip the landing questions to see the information directly */}
              Skip
            </Link>
          </Skip>
        </ButtonGroup>
      </FormWrapper>
    </WizardStep>
  );
};

export const OfferHelp = withRouter((props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const updateAnswers = (key, value) => {
    const { answers } = state;
    const updatedAnswers = { ...answers, [key]: value };
    setState({ ...state, updatedAnswers });
    if (key === "email") {
      localStorage.setItem("offerHelpAnswers", JSON.stringify(updatedAnswers));
      props.history.push({
        pathname: "/medical",
      });
    }
  };
  return (
    <WizardContainer className="wizard-container">
      <StyledWizard isHashEnabled nav={<WizardNav />}>
        <Step1 hashKey={"Step1"} update={updateAnswers} />
        <Step2 hashKey={"Step2"} update={updateAnswers} />
        <Step3 hashKey={"Step3"} update={updateAnswers} />
        <Step4 hashKey={"Step3"} update={updateAnswers} />
      </StyledWizard>
    </WizardContainer>
  );
});
