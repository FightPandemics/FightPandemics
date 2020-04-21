import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import SubmitButton from "../components/Button/SubmitButton";
import { asyncGetGeoLocation } from "../utils/geolocation";
import {
  AnswerButton,
  StyledWizard,
  WizardContainer,
  WizardStep,
  WizardNav,
  WizardButtonGroup,
  StepTitle,
  StyledTextInput,
  WizardProgress,
  WizardFormWrapper,
  WizardFormGroup,
} from "../components/StepWizard";

const INITIAL_STATE = {
  answers: [],
};

const Step1 = (props) => {
  const onSelectAnswer = (answer) => {
    props.update("helpTypeNeeded", answer);
    props.nextStep();
  };
  return (
    <WizardStep>
      <WizardProgress className="text-primary">
        Question {props.currentStep}/{props.totalSteps}
      </WizardProgress>
      <StepTitle>What type of help do you need?</StepTitle>
      <AnswerButton onSelect={() => onSelectAnswer("medical")}>
        <strong>Medical:</strong> I have symptoms of COVID-19.
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("other, non medical")}>
        <strong>Other Help:</strong> I need assistance getting
        groceries/medicine/etc.
      </AnswerButton>
    </WizardStep>
  );
};

const Step2 = (props) => {
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
        Question {props.currentStep}/{props.totalSteps}
      </WizardProgress>
      <StepTitle>Where are you located?</StepTitle>
      <AnswerButton onSelect={selectLocationDetection}>
        Detect my location
      </AnswerButton>
      <AnswerButton onSelect={rejectLocationDetection}>
        Doesn't matter
      </AnswerButton>
    </WizardStep>
  );
};

const Step3 = (props) => {
  const [email, setEmail] = useState("");
  const onChange = (evt) => setEmail(evt);
  const onSubmit = () => {
    props.update("email", email);
  };
  return (
    <WizardStep>
      <WizardProgress className="text-primary">
        Question {props.currentStep}/{props.totalSteps}
      </WizardProgress>
      <StepTitle>What is your email address?</StepTitle>
      <WizardFormWrapper>
        <WizardFormGroup controlId="userEmailGroup">
          <StyledTextInput
            type="email"
            name="userEmail"
            label="Email"
            placeholder="Type your email"
            onChange={onChange}
            value={email && email}
          />
        </WizardFormGroup>
      </WizardFormWrapper>
      <WizardButtonGroup>
        <SubmitButton fill type="primary" title="Submit" onClick={onSubmit} />
      </WizardButtonGroup>
    </WizardStep>
  );
};

export const NeedHelp = withRouter((props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const updateAnswers = (key, value) => {
    const { answers } = state;
    const updatedAnswers = { ...answers, [key]: value };
    setState({ ...state, updatedAnswers });
    if (key === "email") {
      localStorage.setItem("needHelpAnswers", JSON.stringify(updatedAnswers));
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
      </StyledWizard>
    </WizardContainer>
  );
});
