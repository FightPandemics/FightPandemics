import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import InputError from "components/Input/InputError";
import {
  AnswerButton,
  StyledWizard,
  WizardContainer,
  WizardStep,
  WizardNav,
  StepTitle,
  StyledTextInput,
  WizardProgress,
  WizardFormWrapper,
  WizardFormGroup,
  WizardSubmit,
  SkipLink
} from "components/StepWizard";
import { asyncGetGeoLocation } from "utils/geolocation";
import { validateEmail } from "utils/validators";

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
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const validated = !email || validateEmail(email);
    setValid(validated);
  }, [email]);

  const onChange = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <WizardStep className="wizard-step">
      <WizardProgress className="text-primary">
        Question {props.currentStep}/{props.totalSteps}
      </WizardProgress>
      <StepTitle>What is your email address?</StepTitle>
      <WizardFormWrapper>
        <WizardFormGroup controlId="userEmailGroup">
          <StyledTextInput
            type="email"
            name="email"
            label="Email"
            className={!valid && "has-error"}
            placeholder="Enter your email address..."
            onChange={onChange}
            value={email}
            required
          />
          {!valid && <InputError>Email is invalid</InputError>}
        </WizardFormGroup>
        <WizardSubmit
          disabled={email === "" || !valid}
          primary="true"
          onClick={onSubmit}
        >
          Submit
        </WizardSubmit>
        <SkipLink>
          <Link to="/feed">
            {/* By clicking on “skip”, users can skip the landing questions to see the information directly */}
            Skip
          </Link>
        </SkipLink>
      </WizardFormWrapper>
    </WizardStep>
  );
};

const NeedHelp = withRouter((props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const updateAnswers = (key, value) => {
    const { answers } = state;
    const updatedAnswers = { ...answers, [key]: value };
    setState({ ...state, updatedAnswers });
    if (key === "email") {
      localStorage.setItem("needHelpAnswers", JSON.stringify(updatedAnswers));
      props.history.push({
        pathname: "/feed",
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

export default NeedHelp;
