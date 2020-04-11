import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";

import { asyncGetGeoLocation } from "../utils/geolocation";
import {
  AnswerButton,
  StyledWizard,
  WizardContainer,
  WizardStep,
  WizardNav,
  WizardButtonGroup,
  StepTitle,
  SkipLink,
  StyledTextInput,
  WizardProgress,
  WizardFormWrapper,
  WizardFormGroup,
} from "../components/StepWizard";
import SubmitButton from "../components/Button/SubmitButton";

const INITIAL_STATE = {
  answers: [],
};

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
      <WizardFormWrapper>
        <AnswerButton onSelect={selectLocationDetection}>
          Detect my location
        </AnswerButton>
        <AnswerButton onSelect={rejectLocationDetection}>
          Doesn't matter
        </AnswerButton>
      </WizardFormWrapper>
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
      <WizardFormWrapper>
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
      </WizardFormWrapper>
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
      <WizardFormWrapper>
        <AnswerButton onSelect={() => onSelectAnswer("volunteer")}>
          As a volunteer
        </AnswerButton>
        <AnswerButton onSelect={() => onSelectAnswer("doctor investor")}>
          As a Doctor / Investor
        </AnswerButton>
        <AnswerButton onSelect={() => onSelectAnswer("organisation")}>
          As a Organisation
        </AnswerButton>
      </WizardFormWrapper>
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
      <WizardFormWrapper>
        <WizardFormGroup controlId="userEmailGroup">
          <StyledTextInput
            type="email"
            name="userEmail"
            label="Email"
            placeholder="Type your email"
            onChange={onChange}
            value={email}
          />
        </WizardFormGroup>
        <WizardButtonGroup>
          <SubmitButton fill type="primary" title="Submit" onClick={onSubmit} />
          <SkipLink>
            <Link to="/AirTableCOVID">
              {/* By clicking on “skip”, users can skip the landing questions to see the information directly */}
              Skip
            </Link>
          </SkipLink>
        </WizardButtonGroup>
      </WizardFormWrapper>
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
