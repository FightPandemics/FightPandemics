import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Input } from "antd";
import { theme } from "constants/theme";
import styled from "styled-components";
import SubmitButton from "components/Button/SubmitButton";
import { asyncGetGeoLocation } from "utils/geolocation";
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
} from "components/StepWizard";
const { white, lightGray } = theme.colors;

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
  const [values, setValues] = useState({ email: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const StyledTextInput = styled(Input)`
    background-color: ${white};
    border: 0.1rem solid ${lightGray};
    border-radius: 4rem;
    height: 5rem;
  `

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) { }
  }, [errors]);

  const onChange = (event) => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  const onSubmit = (event) => {
    if (event.preventDefault());
    setErrors(validate(values));
    setIsSubmitting(true);
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
            autoComplete="off"
            className="none"
            name="email"
            label="Email"
            placeholder="Enter your email address..."
            onChange={
              onChange
            }
            value={values.email}
            required />
          {
            errors.email && (<p className="help is-danger">{errors.email}</p>
            )
          }
        </WizardFormGroup>
      </WizardFormWrapper>
      <WizardButtonGroup>
        <Link to="/feed">
          <SubmitButton primary="true" onClick={onSubmit}>
            Submit
          </SubmitButton>
        </Link>
      </WizardButtonGroup>
    </WizardStep>
  );
};
function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  return errors;
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

export default NeedHelp;
